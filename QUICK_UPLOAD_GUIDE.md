# Quick Upload Guide - After Updating server.js

Since you've already updated `server.js` on GoForHost, you now need to:

## ✅ What You Need to Upload

**Only the `frontend/build` folder** needs to be updated on your server.

The frontend code has changed (API URLs updated), so you need to rebuild and upload the new build.

## 🚀 Steps

### Option 1: Quick Method (Upload Only Frontend Build)

1. **Rebuild Frontend Locally:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload to GoForHost:**
   - Log in to cPanel → File Manager
   - Navigate to: `ca-web-app/frontend/` (or your app folder)
   - **Delete** the old `build` folder
   - **Upload** the new `frontend/build` folder from your local machine
   - Make sure the structure is: `ca-web-app/frontend/build/`

3. **Restart Node.js App:**
   - Go to **Setup Node.js App** in cPanel
   - Click **Restart**

### Option 2: Full Deployment (Recommended)

1. **Run Deployment Script:**
   ```bash
   sh deploy_prep.sh
   ```
   This will:
   - Rebuild the frontend
   - Create `project_deploy.zip` with everything

2. **Upload to GoForHost:**
   - In File Manager, go to your app folder (`ca-web-app`)
   - Upload `project_deploy.zip`
   - Extract it (this will update backend and frontend)
   - **Note:** This will overwrite your updated `server.js`, so you'll need to update it again OR make sure the zip has the latest server.js

3. **Restart Node.js App**

## 📁 Folder Structure on Server

Your server should have this structure:
```
ca-web-app/
├── backend/
│   ├── server.js (✅ already updated)
│   ├── routes/
│   └── ...
├── frontend/
│   └── build/ (⚠️ NEEDS TO BE UPDATED)
│       ├── index.html
│       ├── static/
│       └── ...
├── package.json
└── .env
```

## ⚠️ Important Notes

- The `frontend/build` folder contains the compiled React app with the new API URLs
- After uploading, **restart** the Node.js app in cPanel
- The backend serves files from `frontend/build` folder (see server.js line 113)

## 🔍 Verify After Upload

1. Visit: `https://dasguptamaitiassociates.com`
2. Open browser console (F12)
3. Check for CORS errors (should be none)
4. Test if services/publications load correctly

