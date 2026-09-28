# Student Performance Prediction Using Machine Learning

An academic mini-project for Third Year B.E. Information Technology Engineering (NEP 2020, Mumbai University) that estimates student final marks based on attendance, study hours, and assessment marks.

## Features
- **Frontend Dashboard:** React, Vite, and Tailwind CSS v4.
- **Backend API:** FastAPI for serving predictions and analytics.
- **Machine Learning:** Scikit-Learn Linear Regression model.
- **Dataset Generation:** Synthetic dataset generator to demonstrate workflow.

## Technology Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS v4
- **Backend:** Python, FastAPI, Uvicorn
- **Machine Learning:** Pandas, NumPy, Scikit-learn, Joblib

## Project Architecture
The project uses a client-server architecture:
- React frontend fetches data from the FastAPI backend via RESTful APIs.
- The Python backend loads the serialized ML model (`.joblib`) to make predictions and computes summary statistics using Pandas.

## Folder Structure
```
student-performance-prediction/
│
├── src/                # React Frontend code (App.tsx, index.css)
├── backend/            # Python FastAPI backend
│   ├── main.py         # FastAPI application and endpoints
│   ├── requirements.txt # Python dependencies
│   ├── model/
│   │   └── train_model.py # ML training script (generates dataset & model)
│   └── data/           # Dataset storage
├── package.json        # Frontend dependencies
├── vite.config.ts      # Vite configuration
└── README.md           # Project documentation
```

## Installation & Running Locally

### 1. Backend (Python/FastAPI)
You need Python installed.

1. Navigate to the project root directory.
2. Install Python dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Generate the dataset and train the model:
   ```bash
   python backend/model/train_model.py
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn backend.main:app --reload
   ```
   The API will run at `http://127.0.0.1:8000`.

### 2. Frontend (React/Vite)
You need Node.js installed.

1. Navigate to the project root directory.
2. Install dependencies:
   ```bash
   pnpm install
   ```
   *(or `npm install`)*
3. Start the Vite development server:
   ```bash
   pnpm run dev
   ```

## Limitations
- Predictions are based on a synthetic dataset and should not be considered real academic advice.
- Simple linear regression is used for explainability, which may not capture complex non-linear relationships.
- The dataset assumes positive correlation between study time/attendance and final marks.

## Future Scope
- **Advanced Modeling:** Try Decision Trees or Random Forest for better non-linear performance.
- **Actual Dataset:** Connect to an anonymized real-world student dataset.
- **Database Integration:** Store historical predictions using PostgreSQL or MongoDB.
