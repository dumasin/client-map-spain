# Client Map - España 🗺️

Interactive web application to manage and track your company's clients across Spain with project type assignments and hierarchical group organization.

## Features

- 🗺️ Interactive OpenStreetMap of Spain centered on Mataró
- 🔍 Dynamic town/municipality search using OpenStreetMap Nominatim API
- 📁 Hierarchical group organization (VSCode Explorer style)
- 🏷️ Project type tagging (ALPR, CCTV, CME, Residuos)
- 💾 Real-time data persistence with Firebase
- 📍 Visual markers with color-coding by project type
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Map**: Leaflet.js + OpenStreetMap
- **Database**: Firebase Firestore (Real-time)
- **Deployment**: Netlify
- **Geocoding**: OpenStreetMap Nominatim API

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/client-map-spain.git
cd client-map-spain
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (name: "client-map" or similar)
3. Enable Firestore Database:
   - Click "Create database"
   - Start in **test mode** (for development)
   - Choose a region (europe-west1 for Spain)
4. Copy your Firebase configuration:
   - Project Settings → Your apps → Web (</> icon)
   - Copy the config object

5. Update `firebase-config.js` with your credentials:
   ```javascript
   // firebase-config.js
   export const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_ID",
     appId: "YOUR_APP_ID"
   };
   ```

### 3. Local Testing

Simply open `index.html` in a web browser. The app works locally with Firebase syncing data in real-time.

### 4. Deploy to Netlify

#### Option A: Connect GitHub

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [Netlify](https://netlify.com/)
3. Click "New site from Git"
4. Connect GitHub → Select your repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
6. Click "Deploy"

#### Option B: Direct Upload

1. Go to [Netlify](https://netlify.com/)
2. Drag and drop your project folder
3. Done! 🎉

### 5. Configure Custom Domain

1. In Netlify dashboard: Domain management
2. Add custom domain or use the free `.netlify.app` subdomain
3. Update Firebase security rules if migrating domains

## Firebase Security Rules

For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clients/{document=**} {
      allow read, write: if true;  // For development only
    }
    match /groups/{document=**} {
      allow read, write: if true;  // For development only
    }
  }
}
```

⚠️ **Before going live**: Implement proper authentication and security!

## File Structure

```
client-map/
├── index.html              # Main application
├── firebase-config.js      # Firebase configuration (update with your keys)
├── README.md               # This file
├── .gitignore              # Git ignore rules
└── docs/
    ├── SETUP_GUIDE.md      # Detailed setup
    └── FIREBASE_SETUP.md   # Firebase guide
```

## Usage Guide

### Creating Groups
1. Click **"+ New"** button
2. Enter group name
3. (Optional) Select parent group
4. Click **Create**

### Adding Clients
1. Search for a town in the search box
2. Click on a result
3. Select project types (ALPR, CCTV, CME, Residuos)
4. Click **Add**

### Managing Data
- Expand/collapse groups by clicking the arrow
- Switch groups by clicking on them in the tree
- Edit project types with checkboxes
- Delete clients with the "Remove Client" button
- Delete groups with the **Delete** button

## Environment Setup

### Prerequisites
- Node.js (optional, for local development)
- Git
- GitHub account
- Netlify account (free)
-Firebase account (free)

### Install Dependencies (Optional)
For local development with a build tool:
```bash
npm install
```

## Troubleshooting

### Firebase Data Not Syncing
- Check Firebase config in `firebase-config.js`
- Verify Firestore is enabled in Firebase Console
- Check browser console for errors (F12 → Console)
- Ensure Firestore security rules allow access

### Markers Not Showing on Map
- Check if town name is recognized by OpenStreetMap Nominatim
- Try a different nearby town name
- Open browser console for API response details

### Search Results Empty
- Ensure you've typed at least 2 characters
- Wait 400ms for search debounce
- Try alternative spellings or nearby towns

## Live Demo

📍 **[Visit the live app](https://your-netlify-domain.netlify.app)**

Once deployed, share this link with your team!

## Support & Collaboration

- **Issues**: Report bugs via GitHub Issues
- **Contributions**: Pull requests welcome!
- **Questions**: Check the docs/ folder first

## License

MIT License - Feel free to use for your business!

## Next Steps

1. ✅ Set up Firebase
2. ✅ Configure `firebase-config.js`
3. ✅ Push to GitHub
4. ✅ Deploy to Netlify
5. 📧 Share with your team!

---

**Created**: April 2, 2026
**Last Updated**: April 2, 2026
