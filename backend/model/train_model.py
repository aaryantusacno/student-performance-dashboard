import pandas as pd
# pyrefly: ignore [missing-import]
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os

# Generate a synthetic dataset for the mini-project
np.random.seed(42)
num_samples = 500

attendance = np.random.randint(50, 101, num_samples)
study_hours = np.random.randint(1, 15, num_samples)
previous_marks = np.random.randint(40, 101, num_samples)
assignment_marks = np.random.randint(40, 101, num_samples)
internal_marks = np.random.randint(10, 26, num_samples) * 4 # scaled to 40-100 approx

# Target variable (Final Marks) generated with some noise
final_marks = (
    0.3 * attendance +
    1.5 * study_hours +
    0.3 * previous_marks +
    0.2 * assignment_marks +
    0.1 * internal_marks +
    np.random.normal(0, 5, num_samples)
)

final_marks = np.clip(final_marks, 0, 100).astype(int)

data = pd.DataFrame({
    'Attendance': attendance,
    'Study_Hours': study_hours,
    'Previous_Marks': previous_marks,
    'Assignment_Marks': assignment_marks,
    'Internal_Marks': internal_marks,
    'Final_Marks': final_marks
})

# Save dataset
data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
os.makedirs(data_dir, exist_ok=True)
dataset_path = os.path.join(data_dir, 'dataset.csv')
data.to_csv(dataset_path, index=False)

# Features and Target
X = data[['Attendance', 'Study_Hours', 'Previous_Marks', 'Assignment_Marks', 'Internal_Marks']]
y = data['Final_Marks']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Linear Regression Model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"Model trained. MAE: {mae:.2f}, RMSE: {rmse:.2f}, R2: {r2:.2f}")

# Save Model
model_path = os.path.join(os.path.dirname(__file__), 'trained_model.joblib')
joblib.dump(model, model_path)

# Also save metrics
metrics = {
    'mae': float(mae),
    'mse': float(mse),
    'rmse': float(rmse),
    'r2': float(r2)
}
joblib.dump(metrics, os.path.join(os.path.dirname(__file__), 'metrics.joblib'))

print("Dataset and Model saved successfully.")
