# Firebase Backend Setup Guide

## Frontend Configuration ✅ COMPLETE

Your frontend is now configured with Firebase! The `.env` file has been created with your Firebase credentials.

## Backend Configuration - Next Steps

To complete the backend Firebase Admin SDK setup, you need to download the service account key:

### Step 1: Download Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **agriconnect-2f418**
3. Click the gear icon ⚙️ next to "Project Overview" → **Project Settings**
4. Navigate to the **Service Accounts** tab
5. Click **Generate New Private Key**
6. Click **Generate Key** to download the JSON file

### Step 2: Update Backend .env File

Open the downloaded JSON file and copy the values to `backend/.env`:

```env
FIREBASE_PROJECT_ID=agriconnect-2f418
FIREBASE_STORAGE_BUCKET=agriconnect-2f418.firebasestorage.app
FIREBASE_PRIVATE_KEY_ID=<value from JSON: private_key_id>
FIREBASE_PRIVATE_KEY="<value from JSON: private_key>"
FIREBASE_CLIENT_EMAIL=<value from JSON: client_email>
FIREBASE_CLIENT_ID=<value from JSON: client_id>
FIREBASE_CLIENT_CERT_URL=<value from JSON: client_x509_cert_url>
```

### Step 3: Enable Firebase Services

In Firebase Console, enable these services:

1. **Authentication**
   - Go to Authentication → Sign-in method
   - Enable **Email/Password** provider
   - Click Save

2. **Firestore Database**
   - Go to Firestore Database
   - Click **Create Database**
   - Choose **Start in test mode** (for development)
   - Select a location (choose closest to your users)
   - Click Enable

3. **Storage**
   - Go to Storage
   - Click **Get Started**
   - Choose **Start in test mode** (for development)
   - Click Done

### Step 4: Set Up Firestore Security Rules

Go to Firestore Database → Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow all authenticated users to read public data
    match /{document=**} {
      allow read: if request.auth != null;
    }
    
    // Allow sellers/admins to create listings
    match /products/{productId} {
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.sellerId == request.auth.uid;
    }
    
    match /livestock/{listingId} {
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.sellerId == request.auth.uid;
    }
    
    match /plants/{listingId} {
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.sellerId == request.auth.uid;
    }
  }
}
```

### Step 5: Set Up Storage Security Rules

Go to Storage → Rules and replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.resource.size < 5 * 1024 * 1024 && // 5MB limit
        request.resource.contentType.matches('image/.*');
    }
  }
}
```

### Step 6: Test the Connection

1. **Frontend Test:**
   ```bash
   cd frontend
   npm start
   ```
   - Try to register a new user
   - Check if authentication works

2. **Backend Test:**
   ```bash
   cd backend
   python main.py
   ```
   - Visit http://localhost:8000/docs
   - Test the health check endpoint

## Current Status

✅ Frontend Firebase configuration complete
✅ Frontend .env file created
✅ Backend .env template created
⏳ Backend service account key needed (follow steps above)
⏳ Firebase services need to be enabled
⏳ Security rules need to be configured

## Next Steps After Setup

Once Firebase is fully configured, you can:
1. Start implementing authentication (Task 2 in tasks.md)
2. Test user registration and login
3. Begin building the core features

## Troubleshooting

**Issue: "Firebase not configured" warning**
- Make sure you restart the development server after creating .env file
- Verify all environment variables are set correctly

**Issue: Backend authentication fails**
- Ensure service account key is correctly copied to .env
- Check that private_key includes the full key with \n characters

**Issue: Permission denied errors**
- Update Firestore and Storage security rules as shown above
- Make sure user is authenticated before accessing protected resources
