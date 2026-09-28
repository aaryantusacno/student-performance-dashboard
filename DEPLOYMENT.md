# Deployment Guide

This guide explains how to deploy the Student Performance Prediction project for production.

## 1. Backend Deployment (Render or Railway)
FastAPI applications are easily deployed to platforms like Render, Railway, or Heroku.

### Prerequisites:
- A GitHub repository with your project code.

### Steps for Render:
1. Create a New Web Service on Render.
2. Connect your GitHub repository.
3. Configure the service:
   - **Environment:** Python
   - **Root Directory:** `backend` (or leave empty if you move main.py to root)
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Deploy the service.
5. Note the public URL (e.g., `https://my-backend.onrender.com`).

## 2. Frontend Deployment (Vercel or Netlify)
Vite + React apps are easily deployed as static sites.

### Configuration Update:
Before deploying, update the API URLs in `src/App.tsx` from `http://127.0.0.1:8000` to your new public Backend URL.
(Tip: Use `import.meta.env.VITE_API_URL` instead of hardcoding it in production).

### Steps for Vercel:
1. Create a New Project on Vercel.
2. Import your GitHub repository.
3. Vercel will auto-detect Vite. The Build Command will be `npm run build` and Output Directory will be `dist`.
4. Deploy the site.

## Security Considerations
- Never expose sensitive data (like real student PII) in the dataset.
- Configure CORS in `backend/main.py` properly (restrict `allow_origins` to your frontend's Vercel URL instead of `["*"]`).
