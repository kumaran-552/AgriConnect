from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from config.firebase_config import initialize_firebase, get_firestore_client

# Load environment variables
load_dotenv()

# Initialize Firebase
try:
    initialize_firebase()
    print("✅ Firebase initialized successfully!")
except Exception as e:
    print(f"❌ Firebase initialization error: {e}")

# Initialize FastAPI app
app = FastAPI(
    title="Smart Agri Support API",
    description="Backend API for Smart Agri Support Web Application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Smart Agri Support API"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test Firestore connection
        db = get_firestore_client()
        return {
            "status": "healthy", 
            "service": "Smart Agri Support API",
            "firebase": "connected"
        }
    except Exception as e:
        return {
            "status": "healthy", 
            "service": "Smart Agri Support API",
            "firebase": f"error: {str(e)}"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
