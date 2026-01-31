# Deployment Checklist for GoForHost

## ✅ Code Changes (Already Done)
The following files have been updated and are ready:
- ✅ `backend/server.js` - CORS configuration updated
- ✅ `frontend/src/config/api.js` - API URL updated to `https://back.dasguptamaitiassociates.com/api`
- ✅ `frontend/src/utils/api.js` - Fallback API URL updated

## 📋 Files You Need to Update/Check

### 1. **Root `.env` File** (On Your Server - GoForHost cPanel)
**Location:** Root of your application folder (e.g., `ca-web-app/.env`)

**Required Variables:**
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://dasguptamaitiassociates.com
PORT=5000

# Email Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
ADMIN_EMAIL=your_admin_email

# Cloudinary (if using file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**⚠️ IMPORTANT:** 
- `FRONTEND_URL` must be `https://dasguptamaitiassociates.com` (NO trailing slash)
- Make sure this file exists on your server

### 2. **Frontend `.env` File** (Optional - for local development)
**Location:** `frontend/.env`

**For Production Build:**
If you want to set the API URL at build time, create this file:
```env
REACT_APP_API_URL=https://back.dasguptamaitiassociates.com/api
REACT_APP_BASE_URL=https://dasguptamaitiassociates.com
```

**Note:** This is optional because the code already has the correct fallback URL.

## 🚀 Deployment Steps

### Step 1: Rebuild Frontend
```bash
cd frontend
npm install
npm run build
```

### Step 2: Create Deployment Package
```bash
# From project root
sh deploy_prep.sh
```
This creates `project_deploy.zip` with all updated files.

### Step 3: Upload to GoForHost
1. Log in to cPanel
2. Go to File Manager
3. Navigate to your app folder (e.g., `ca-web-app`)
4. Upload `project_deploy.zip`
5. Extract it (this will overwrite old files)

### Step 4: Update `.env` File on Server
1. In File Manager, open the `.env` file in your app root
2. Ensure `FRONTEND_URL=https://dasguptamaitiassociates.com` (no trailing slash)
3. Save the file

### Step 5: Restart Application
1. Go to **Setup Node.js App** in cPanel
2. Click **Restart** on your application

## 🔍 Verification

After deployment, check:

1. **Backend Health Check:**
   - Visit: `https://back.dasguptamaitiassociates.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Frontend:**
   - Visit: `https://dasguptamaitiassociates.com`
   - Check browser console for CORS errors (should be none)
   - Test API calls (services, publications, etc.)

3. **Check Server Logs:**
   - In File Manager, check `stderr.log` for any errors
   - Look for CORS-related log messages

## 📝 Summary

**Files Already Updated (No Action Needed):**
- ✅ `backend/server.js`
- ✅ `frontend/src/config/api.js`
- ✅ `frontend/src/utils/api.js`

**Files You Need to Update:**
- ⚠️ **`.env` file on server** - Ensure `FRONTEND_URL=https://dasguptamaitiassociates.com` (no trailing slash)

**Actions Required:**
1. Rebuild frontend (`npm run build` in frontend folder)
2. Create deployment package (`sh deploy_prep.sh`)
3. Upload to server
4. Verify `.env` file on server
5. Restart Node.js app in cPanel

