# Quick Start Guide 🚀

Fast-track to getting your Client Map online!

## 5-Minute Setup

### 1. Firebase Setup (2 min)
```bash
1. Go to firebase.google.com
2. Create new project (name: "client-map-spain")
3. Add Firestore Database (test mode, europe-west1)
4. Get Web app credentials (Project Settings > Your Apps)
5. Copy the firebaseConfig object
```

### 2. Update Your App (30 sec)
Open `index.html` and find the Firebase config (around line 389):
```javascript
const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  projectId: "PASTE_HERE",
  // ... other fields
};
```

Paste your copied config. Done! ✅

### 3. Test Locally (1 min)
```bash
1. Open index.html in browser
2. Open DevTools (F12)
3. Should see: "✅ Firebase initialized successfully"
4. Try adding a client - it should sync!
```

### 4. Push to GitHub (1 min)
```bash
cd /Users/tomy/Desktop/Mapa\ directori
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/client-map-spain.git
git push -u origin main
```

### 5. Deploy to Netlify (1 min)
```bash
1. Go to netlify.com
2. "Add new site" > "Import from Git"
3. Select your GitHub repository
4. Build command: (leave empty)
5. Publish directory: . (dot)
6. Deploy!
```

Done! Your site is live! 🎉

---

## Your Live URLs

After deployment:
- **Netlify URL**: `https://your-site-name.netlify.app`
- **GitHub**: `https://github.com/YOUR_USERNAME/client-map-spain`

---

## Making Updates

```bash
# Make changes in code
# Then run in terminal:
git add .
git commit -m "Your message"
git push

# Netlify auto-deploys! ✅
```

---

## Full Documentation

- **Firebase Setup**: See `docs/FIREBASE_SETUP.md`
- **Deployment**: See `docs/DEPLOYMENT.md`
- **Main README**: See `README.md`

---

## Common Issues

| Issue | Solution |
|-------|----------|
| Firebase not initialized | Check config has your real credentials |
| Data not syncing | Open DevTools, check console for errors |
| Deploy fails | Check Netlify logs in Deployments tab |
| Domain not working | Wait 24h for DNS, clear browser cache |

---

## What's Included

✅ Interactive map of Spain
✅ Dynamic town search (Nominatim API)
✅ Hierarchical group management
✅ Project type tracking (ALPR, CCTV, CME, Residuos)
✅ Real-time Firebase sync
✅ VSCode-style folder tree UI
✅ Color-coded map markers
✅ Responsive design
✅ Ready for Netlify + GitHub

---

## What's Next

1. Share your site with your team
2. Start adding your clients and projects
3. Monitor data sync in Firebase console
4. Add custom domain when ready
5. Consider adding authentication (future)

---

## Need Help?

- Check the detailed guides in `/docs/` folder
- Read `README.md` for full features
- Check browser console (F12) for error messages
- Firebase docs: https://firebase.google.com/docs

---

## Pro Tips 💡

1. **Backup regularly**: Your data is in Firebase, very safe ✅
2. **Share the link**: Just send `https://your-site.netlify.app`
3. **Mobile friendly**: Works great on phones and tablets
4. **Real-time collab**: If you add auth, team can update together
5. **Custom domain**: Easy to add later (docs included)

---

**You're all set! Start mapping your clients!** 🗺️✨
