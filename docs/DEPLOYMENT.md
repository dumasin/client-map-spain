# GitHub & Netlify Deployment Guide 🚀

Complete guide to push your Client Map to GitHub and deploy it on Netlify with a free domain.

## Table of Contents
1. [Set Up Git Locally](#set-up-git-locally)
2. [Create GitHub Repository](#create-github-repository)
3. [Push Code to GitHub](#push-code-to-github)
4. [Deploy to Netlify](#deploy-to-netlify)
5. [Set Up Custom Domain](#set-up-custom-domain)

---

## Step 1: Set Up Git Locally

### Install Git (if not installed)
- **Mac**: `brew install git`
- **Windows**: Download from [git-scm.com](https://git-scm.com)
- **Linux**: `sudo apt install git`

### Configure Git
Open terminal and run:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Step 2: Create GitHub Repository

1. Go to **[GitHub](https://github.com)** and sign in
2. Click **"+"** (top right) → **"New repository"**
3. Configure:
   - **Repository name**: `client-map-spain` (or your choice)
   - **Description**: "Interactive client map for Spain with project tracking"
   - **Visibility**: Public (for Netlify deployment)
   - **Initialize repository**: 
     - ❌ Do NOT check "Add a README" (we'll use ours)
     - ❌ Do NOT check "Add .gitignore" (we have one)
     - ❌ Do NOT check "Choose a license" (unless you want)
4. Click **"Create repository"**

---

## Step 3: Push Code to GitHub

### Terminal Commands

```bash
# Navigate to your project folder
cd /Users/tomy/Desktop/Mapa\ directori

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Client Map with Firebase integration"

# Add remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/client-map-spain.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Example:
```bash
git remote add origin https://github.com/tomy-mutu/client-map-spain.git
git push -u origin main
```

### Verify Success
1. Go to your GitHub repository
2. You should see your files there

---

## Step 4: Deploy to Netlify

### Option A: Connect GitHub (Recommended)

1. Go to **[Netlify](https://netlify.com)** and sign up/sign in
2. Click **"Add a new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Authorize Netlify to access your GitHub account
5. Select your `client-map-spain` repository
6. Configure build settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `.` (root folder)
7. Click **"Deploy site"**
8. Wait for deployment (2-5 minutes)
9. Your site is live! 🎉

### Option B: Manual Upload

1. Go to Netlify: **Drag and drop deployment**
2. Select your project folder
3. Netlify auto-deploys

---

## Step 5: Set Up Custom Domain

### Option A: Use FREE Netlify Subdomain (Easiest!)

Your site is automatically deployed at:
```
https://your-site-name.netlify.app
```

You can customize the name:

1. In Netlify: **Site settings** → **Domain management**
2. Click **"Edit site name"**
3. Enter your desired name (e.g., `my-client-map`)
4. Save

Your new URL: `https://my-client-map.netlify.app` ✅

### Option B: Connect Custom Domain You Own

If you have a domain (e.g., `mycompany.com`):

1. In Netlify: **Domain management** → **Add custom domain**
2. Enter your domain
3. Netlify shows DNS settings
4. Go to your registrar (GoDaddy, Namecheap, etc.)
5. Update DNS to point to Netlify
6. Wait for DNS propagation (24-48 hours)

---

## Step 6: Update Firebase Configuration for Deployment

⚠️ **Important for Netlify deployment**:

1. Go to Firebase Console: **Project Settings**
2. Under **Authorized domains**, add:
   - `your-netlify-domain.netlify.app`
   - Any custom domain you set up

3. Update `index.html` Firebase config if needed:
   ```javascript
   const firebaseConfig = {
     // Your values here
   };
   ```

---

## Updating Your Site After Changes

Once deployed, making updates is easy:

```bash
# Make your changes in the editor

# Stage changes
git add .

# Commit with a message
git commit -m "Added new feature: X"

# Push to GitHub
git push

# Netlify auto-deploys! ✅
```

Netlify automatically redeploys when you push to GitHub!

---

## Environment Variables (Advanced)

If you want to keep Firebase config secret:

1. In Netlify: **Site settings** → **Build & deploy** → **Environment**
2. Add environment variables:
   - `FIREBASE_API_KEY`: Your API key
   - `FIREBASE_PROJECT_ID`: Your project ID
   - etc.

3. Update your app to use them (requires build setup)

---

## Monitoring Deployments

### Netlify Dashboard

- **Deployments** tab: See all deploy history
- **Analytics** tab: View traffic and performance
- **Functions** tab: For backend operations (if needed)
- **Form submissions** tab: Capture form data (optional)

### Check Deploy Status

```bash
# View live URL
netlify status

# Open site in browser
netlify open:site
```

---

## Troubleshooting

### ❌ Deploy fails with error

**Solution**:
1. Check Netlify deploy logs:
   - Go to **Deployments** tab
   - Click the failed deploy
   - Scroll down to see error details
2. Common issues:
   - Missing files
   - Path issues in links
   - Check `.gitignore` isn't hiding needed files

### ❌ Firebase data not syncing after deployment

**Problem**: Works locally but not on Netlify

**Solution**:
1. Verify Firebase credentials in code
2. Add domain to Firebase authorized domains list
3. Check browser console for CORS errors
4. Verify Firestore security rules

### ❌ Custom domain not working

**Problem**: Domain points to wrong place

**Solution**:
1. Clear browser cache (Ctrl+Shift+Del)
2. Wait for DNS propagation (up to 48 hours)
3. Verify DNS records in registrar settings
4. Use `nslookup` to check DNS:
   ```bash
   nslookup your-domain.com
   ```

### ✅ Site shows 404 after deploy

**Problem**: Wrong files deployed

**Solution**:
1. Check Netlify publish directory is `.` (root)
2. Verify files are in GitHub repo:
   - Go to GitHub: Check repository contents
   - If missing, push them: `git push`
3. Redeploy manually in Netlify

---

## CI/CD Pipeline (Optional)

Netlify automatically handles CI/CD:

- **On Push**: Netlify detects changes
- **Auto-Deploy**: Builds and deploys automatically
- **Preview**: Creates preview URLs for PRs (if configured)

No additional setup needed! 🎉

---

## Performance Tips

1. **Use CDN**: Netlify includes CDN automatically ✅
2. **Compress images**: Before adding to repo
3. **Minimize CSS/JS**: Optional, but good practice
4. **Enable gzip**: Netlify does this automatically ✅

---

## Security Checklist

- ✅ `.gitignore` includes Firebase config
- ✅ Added domain to Firebase authorized domains
- ✅ Set proper Firestore security rules
- ✅ No API keys in version control
- ✅ HTTPS enabled (Netlify automatic) ✅

---

## Next Steps

1. ✅ Set up Git locally
2. ✅ Create GitHub repository
3. ✅ Push code to GitHub
4. ✅ Deploy to Netlify
5. ✅ Set up domain
6. 📧 Share with your team!
7. 🔒 Consider adding authentication later
8. 📈 Monitor usage and analytics

---

## Sharing Your Site

Once deployed, you can share:
- **Netlify URL**: `https://your-site.netlify.app`
- **Custom domain**: `https://your-domain.com`
- **GitHub repo**: `https://github.com/your-username/client-map-spain`

---

## Support

- **Netlify Docs**: https://docs.netlify.com
- **GitHub Docs**: https://docs.github.com
- **Git Tutorial**: https://git-scm.com/doc

Good luck! 🚀
