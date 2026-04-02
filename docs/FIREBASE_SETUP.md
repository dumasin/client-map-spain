# Firebase Setup Guide 🔥

Complete step-by-step guide to set up Firebase Firestore for your Client Map application.

## Table of Contents
1. [Create Firebase Project](#create-firebase-project)
2. [Set Up Firestore Database](#set-up-firestore-database)
3. [Get Firebase Credentials](#get-firebase-credentials)
4. [Configure Your App](#configure-your-app)
5. [Set Security Rules](#set-security-rules)

---

## Step 1: Create Firebase Project

1. Go to **[Firebase Console](https://console.firebase.google.com/)**
2. Click **"Create a project"** or **"Add project"**
3. Fill in project details:
   - **Project name**: `client-map-spain` (or your preference)
   - **Analytics**: Optional (disable for simplicity)
4. Click **"Create project"**
5. Wait for project creation (2-3 minutes)
6. Click **"Continue"** when ready

---

## Step 2: Set Up Firestore Database

1. In Firebase console, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Choose settings:
   - **Location**: `europe-west1 (Belgium)` or closest to your region
   - **Start in test mode** (for development - we'll add security later)
4. Click **"Create"**
5. Wait for initialization (1-2 minutes)

---

## Step 3: Get Firebase Credentials

### Method A: Quick Copy (Recommended)

1. In Firebase console: **Project Settings** (gear icon, top right)
2. Go to **"Your apps"** section
3. Find or create a Web app:
   - If no apps, click **"</>‎"** (Web icon)
   - Give it a nickname: `Client Map`
   - Uncheck "Also set up Firebase Hosting" (optional)
   - Click **"Register app"**
4. You'll see a config code block:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyD...",
     authDomain: "client-map-spain.firebaseapp.com",
     projectId: "client-map-spain",
     storageBucket: "client-map-spain.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123def456"
   };
   ```
5. **Copy this entire config object**

---

## Step 4: Configure Your App

### Update index.html

In `index.html`, find the Firebase config section (around line 384):

```javascript
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_PROJECT.firebaseapp.com",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_PROJECT.appspot.com",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
};
```

**Replace** `REPLACE_WITH_...` values with your copied config.

### Example:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD7mzHFJHT9XyZ4aBcDefghijk123456",
  authDomain: "client-map-spain.firebaseapp.com",
  projectId: "client-map-spain",
  storageBucket: "client-map-spain.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:abc123def456ghi"
};
```

### Save and Test

1. Save the file
2. Open `index.html` in your browser
3. Open **Developer Console** (F12 → Console tab)
4. You should see: `✅ Firebase initialized successfully`
5. Add a client and check if it syncs

---

## Step 5: Set Security Rules (Production)

### Development Mode (Test Mode)
- Allows all read/write access
- Perfect for testing and development
- ⚠️ **NOT SAFE FOR PRODUCTION**

### Production Mode
When you're ready to go live, secure your database:

1. In Firebase: **Build** → **Firestore Database** → **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow authenticated users to read/write
    match /clients/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /groups/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

---

## Troubleshooting

### ❌ "Firebase not initialized" in console

**Problem**: Firebase credentials not set correctly

**Solution**:
1. Check if all `REPLACE_WITH_...` values are replaced
2. Verify you copied the entire config
3. Check for typos (especially in projectId)
4. Refresh the page

### ❌ Data not syncing to Firebase

**Problem**: Changes aren't being saved

**Solution**:
1. Open DevTools (F12)
2. Check **Console** tab for error messages
3. Verify Firestore database is running
4. Check security rules are correct
5. Ensure you're using test mode or authenticated

### ❌ "Permission denied" errors

**Problem**: Security rules blocking access

**Solution**:
- In Firebase: Switch back to **test mode** temporarily
- Or add proper authentication
- Check that your rules allow read/write

### ✅ Data appears but isn't persisting

**Problem**: Data loads from Firebase but changes don't save

**Solution**:
- Check browser console for errors
- Wait a few seconds (auto-save has 1s delay)
- Try adding a new client and watching console
- Verify Firebase connection is stable

---

## Database Structure

Your Firestore will have two collections:

### `clients` Collection
```javascript
{
  id: 1712137200000,
  name: "Barcelona",
  lat: 41.39,
  lng: 2.17,
  projects: ["ALPR", "CCTV"],
  groupId: "general"
}
```

### `groups` Collection
```javascript
{
  id: "general",
  name: "General",
  parent: null,
  children: []
}
```

---

## Cost Information

🎉 **Firebase Free Tier Includes**:
- 1GB storage
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day

This is **more than enough** for a small to medium business!

---

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Create Firestore database
3. ✅ Copy credentials to `index.html`
4. ✅ Test locally
5. Push to GitHub
6. Deploy to Netlify
7. Add custom domain

---

## Support

- **Firebase Docs**: https://firebase.google.com/docs
- **Firestore Docs**: https://firebase.google.com/docs/firestore
- **Console Issues**: Check browser console (F12)

Good luck! 🚀
