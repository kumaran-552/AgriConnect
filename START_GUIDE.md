# Smart Agri Support - Quick Start Guide

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Firebase account (see FIREBASE_SETUP.md)

## Setup Steps

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Or on Linux/Mac
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Copy .env.example to .env and fill in your Firebase credentials
copy .env.example .env  # Windows
# or
cp .env.example .env    # Linux/Mac

# Start the backend server
python main.py
```

Backend will run on: http://localhost:8000
API docs: http://localhost:8000/docs

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies (if not already done)
npm install

# Configure environment variables
# Copy .env.example to .env and fill in your Firebase config
copy .env.example .env  # Windows
# or
cp .env.example .env    # Linux/Mac

# Start the frontend development server
npm start
```

Frontend will run on: http://localhost:3000

## Quick Commands

### Backend
- Start server: `python main.py`
- Run tests: `pytest`
- Run with auto-reload: `uvicorn main:app --reload`

### Frontend
- Start dev server: `npm start`
- Build for production: `npm run build`
- Run tests: `npm test`
- Run linter: `npm run lint`

## Troubleshooting

### Backend Issues
- **Import errors**: Make sure virtual environment is activated
- **Firebase errors**: Check .env file has correct credentials
- **Port already in use**: Change API_PORT in .env

### Frontend Issues
- **Module not found**: Run `npm install`
- **Firebase errors**: Check .env file has correct Firebase config
- **Port 3000 in use**: Frontend will prompt to use another port

## Next Steps

1. Follow FIREBASE_SETUP.md to configure Firebase
2. Create a test user account
3. Explore the API documentation at http://localhost:8000/docs
4. Start implementing features from the tasks.md file
