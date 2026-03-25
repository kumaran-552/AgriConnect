# Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: "smart-agri-support" (or your preferred name)
4. Follow the setup wizard

## Step 2: Enable Firebase Services

### Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method

### Enable Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Start in "test mode" for development (update rules later)
4. Choose a location closest to your users

### Enable Storage
1. Go to "Storage"
2. Click "Get started"
3. Start in "test mode" for development (update rules later)

## Step 3: Get Frontend Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app with nickname "Smart Agri Web"
5. Copy the firebaseConfig object
6. Create `frontend/.env` file and add:
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_API_URL=http://localhost:8000
```

## Step 4: Get Backend Service Account

1. In Firebase Console, go to Project Settings
2. Go to "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Create `backend/.env` file and extract values:
```
FIREBASE_PROJECT_ID=value-from-json
FIREBASE_PRIVATE_KEY_ID=value-from-json
FIREBASE_PRIVATE_KEY="value-from-json"
FIREBASE_CLIENT_EMAIL=value-from-json
FIREBASE_CLIENT_ID=value-from-json
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=value-from-json
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
API_HOST=0.0.0.0
API_PORT=8000
```

## Step 5: Set Up Firestore Security Rules

1. Go to Firestore Database > Rules
2. Replace with the following rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isSeller() {
      return getUserRole() in ['Seller', 'Admin'];
    }
    
    function isExpert() {
      return getUserRole() in ['Expert', 'Admin'];
    }
    
    function isAdmin() {
      return getUserRole() == 'Admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && isOwner(userId);
      allow update: if isAuthenticated() && isOwner(userId);
      allow delete: if isAdmin();
    }
    
    // Diseases collection
    match /diseases/{diseaseId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Products collection
    match /products/{productId} {
      allow read: if true;
      allow create: if isAuthenticated() && isSeller();
      allow update: if isAuthenticated() && (isOwner(resource.data.sellerId) || isAdmin());
      allow delete: if isAuthenticated() && (isOwner(resource.data.sellerId) || isAdmin());
    }
    
    // Livestock collection
    match /livestock/{livestockId} {
      allow read: if true;
      allow create: if isAuthenticated() && isSeller();
      allow update: if isAuthenticated() && (isOwner(resource.data.sellerId) || isAdmin());
      allow delete: if isAuthenticated() && (isOwner(resource.data.sellerId) || isAdmin());
    }
    
    // Plants collection
    match /plants/{plantId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (isOwner(resource.data.sellerId) || isAdmin());
      allow delete: if isAuthenticated() && (isOwner(resource.data.sellerId) || isAdmin());
    }
    
    // Training resources
    match /training/{resourceId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Poultry guides
    match /poultry/{guideId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Consultation queries
    match /queries/{queryId} {
      allow read: if isAuthenticated() && (isOwner(resource.data.userId) || isExpert());
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (isOwner(resource.data.userId) || isExpert());
      allow delete: if isAdmin();
    }
    
    // Veterinary doctors
    match /doctors/{doctorId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

## Step 6: Set Up Storage Security Rules

1. Go to Storage > Rules
2. Replace with the following rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isValidImage() {
      return request.resource.contentType.matches('image/.*') &&
             request.resource.size < 5 * 1024 * 1024; // 5MB limit
    }
    
    // Disease images
    match /diseases/{diseaseId}/{imageId} {
      allow read: if true;
      allow write: if isAuthenticated() && isValidImage();
    }
    
    // Product images
    match /products/{productId}/{imageId} {
      allow read: if true;
      allow write: if isAuthenticated() && isValidImage();
    }
    
    // Livestock images
    match /livestock/{livestockId}/{imageId} {
      allow read: if true;
      allow write: if isAuthenticated() && isValidImage();
    }
    
    // Plant images
    match /plants/{plantId}/{imageId} {
      allow read: if true;
      allow write: if isAuthenticated() && isValidImage();
    }
    
    // Query images
    match /queries/{queryId}/{imageId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isValidImage();
    }
  }
}
```

## Step 7: Initialize Firestore Collections

Run this script in the Firebase Console (Firestore > Start collection) or use the backend API to create initial collections:

- users
- diseases
- products
- livestock
- plants
- training
- poultry
- queries
- doctors

## Step 8: Verify Setup

1. Start the backend: `cd backend && python main.py`
2. Start the frontend: `cd frontend && npm start`
3. Check that both services can connect to Firebase

## Security Notes

- The rules above are for development. Update them for production.
- Never commit `.env` files or service account keys to version control.
- Use Firebase App Check in production for additional security.
- Enable Firebase Authentication email verification in production.
