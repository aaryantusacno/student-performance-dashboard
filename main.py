from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os
import numpy as np

app = FastAPI(title="Student Performance Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictInput(BaseModel):
    attendance: float
    study_hours: float
    previous_marks: float
    assignment_marks: float
    internal_marks: float

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'trained_model.joblib')
MODEL_DT_PATH = os.path.join(os.path.dirname(__file__), 'model', 'trained_model_dt.joblib')
METRICS_PATH = os.path.join(os.path.dirname(__file__), 'model', 'metrics.joblib')
DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'dataset.csv')

try:
    model_lr = joblib.load(MODEL_PATH)
except:
    model_lr = None

try:
    model_dt = joblib.load(MODEL_DT_PATH)
except:
    model_dt = None

@app.get("/api/health")
def health_check():
    return {"status": "ok", "model_loaded": model_lr is not None}

@app.post("/api/predict")
def predict_performance(data: PredictInput):
    if model_lr is None:
        raise HTTPException(status_code=503, detail="Model not trained or available.")
    
    if not (0 <= data.attendance <= 100):
        raise HTTPException(status_code=400, detail="Attendance must be between 0 and 100")
    if data.study_hours < 0:
        raise HTTPException(status_code=400, detail="Study hours cannot be negative")
    
    features = pd.DataFrame([{
        'Attendance': data.attendance,
        'Study_Hours': data.study_hours,
        'Previous_Marks': data.previous_marks,
        'Assignment_Marks': data.assignment_marks,
        'Internal_Marks': data.internal_marks
    }])
    
    prediction_lr = model_lr.predict(features)[0]
    prediction_dt = model_dt.predict(features)[0] if model_dt else prediction_lr
    
    return {
        "predicted_marks": round(prediction_lr, 1),
        "predicted_marks_dt": round(prediction_dt, 1)
    }

@app.get("/api/dataset-summary")
def get_dataset_summary():
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    df = pd.read_csv(DATA_PATH)
    return {
        "total_students": len(df),
        "average_marks": round(df["Final_Marks"].mean(), 1),
        "average_attendance": round(df["Attendance"].mean(), 1)
    }

@app.get("/api/model-metrics")
def get_model_metrics():
    if not os.path.exists(METRICS_PATH):
        raise HTTPException(status_code=404, detail="Metrics not found")
    
    metrics = joblib.load(METRICS_PATH)
    return metrics

@app.get("/api/analytics")
def get_analytics():
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    df = pd.read_csv(DATA_PATH)
    
    # Marks distribution
    marks_hist, bins = np.histogram(df["Final_Marks"], bins=10, range=(0, 100))
    
    # Scatter data (limit to 100 points for frontend rendering)
    scatter_sample = df.sample(min(100, len(df)))
    
    return {
        "distribution": {
            "counts": [int(c) for c in marks_hist],
            "labels": [f"{int(bins[i])}-{int(bins[i+1])}" for i in range(len(bins)-1)]
        },
        "attendance_vs_marks": [{"x": float(row["Attendance"]), "y": float(row["Final_Marks"])} for _, row in scatter_sample.iterrows()],
        "study_vs_marks": [{"x": float(row["Study_Hours"]), "y": float(row["Final_Marks"])} for _, row in scatter_sample.iterrows()]
    }

@app.get("/api/students")
def get_students():
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    df = pd.read_csv(DATA_PATH)
    sample = df.head(50).to_dict(orient="records")
    return sample
