import firebase_admin
from firebase_admin import credentials, firestore, storage, auth
import os
from pathlib import Path

# Get the path to the service account key file
SERVICE_ACCOUNT_KEY = Path(__file__).parent / "agriconnect-2f418-firebase-adminsdk-fbsvc-b0b04c02c0.json"

# Initialize Firebase Admin SDK
def initialize_firebase():
    """Initialize Firebase Admin SDK with credentials"""
    try:
        # Check if already initialized
        firebase_admin.get_app()
    except ValueError:
        # Initialize with service account key file
        cred = credentials.Certificate(str(SERVICE_ACCOUNT_KEY))
        firebase_admin.initialize_app(cred, {
            'storageBucket': 'agriconnect-2f418.firebasestorage.app'
        })

# Get Firestore client
def get_firestore_client():
    """Get Firestore database client"""
    initialize_firebase()
    return firestore.client()

# Get Storage bucket
def get_storage_bucket():
    """Get Firebase Storage bucket"""
    initialize_firebase()
    return storage.bucket()

# Get Auth client
def get_auth_client():
    """Get Firebase Auth client"""
    initialize_firebase()
    return auth
