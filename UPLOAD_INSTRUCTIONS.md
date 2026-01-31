# 📤 What to Upload to GoForHost

## 🎯 Quick Answer

Since your frontend domain (`dasguptamaitiassociates.com`) is separate from your backend (`back.dasguptamaitiassociates.com`), you have **TWO options**:

---

## Option 1: Frontend Served by Apache (Most Likely)

If your frontend domain points to `public_html`, upload the **contents** of `frontend/build/` folder:

### 📁 What to Upload:
**Location on your computer:**
```
M:\CA project 2\frontend\build\
```

**Upload ALL files and folders inside `build/` folder:**
- ✅ `.htaccess` (CRITICAL - this fixes the routing!)
- ✅ `index.html`
- ✅ `static/` folder (with all subfolders: css, js, media)
- ✅ All image files (`.png`, `.jpg`, etc.)
- ✅ `manifest.json`
- ✅ `robots.txt`
- ✅ `sitemap.xml`
- ✅ `asset-manifest.json`
- ✅ `favicon.ico`
- ✅ All other files in the build folder

### 📍 Where to Upload on GoForHost:
1. Log in to **cPanel**
2. Open **File Manager**
3. Navigate to **`public_html/`** (this is your domain's document root)
4. **Upload all files** from `frontend/build/` folder here
5. Make sure `.htaccess` is uploaded (enable "Show Hidden Files" in File Manager)

### ⚠️ Important:
- Upload the **contents** of the `build` folder, not the `build` folder itself
- The `.htaccess` file MUST be in the same directory as `index.html`
- After uploading, verify `.htaccess` exists in `public_html/`

---

## Option 2: Frontend Served by Node.js Backend

If your frontend is served through the Node.js backend, upload to your app folder:

### 📁 What to Upload:
**Location on your computer:**
```
M:\CA project 2\frontend\build\
```

### 📍 Where to Upload on GoForHost:
1. Log in to **cPanel**
2. Open **File Manager**
3. Navigate to **`ca-web-app/frontend/`** (or your app folder name)
4. **Delete** the old `build` folder if it exists
5. **Upload** the entire `build` folder here
6. Structure should be: `ca-web-app/frontend/build/`

### ⚠️ Important:
- Upload the entire `build` folder (not just its contents)
- After uploading, restart your Node.js app in cPanel

---

## 🔍 How to Determine Which Option?

**Check where your domain points:**
1. In cPanel, go to **Domains** or **Subdomains**
2. Check where `dasguptamaitiassociates.com` points:
   - If it points to `public_html` → Use **Option 1**
   - If it points to your Node.js app → Use **Option 2**

**Or test:**
- If `https://dasguptamaitiassociates.com` shows your website → Likely **Option 1**
- If you get a Node.js error or it doesn't load → Likely **Option 2**

---

## ✅ After Uploading:

1. **Verify `.htaccess` is present:**
   - In File Manager, enable "Show Hidden Files"
   - Check that `.htaccess` exists in the same location as `index.html`

2. **Test the admin login:**
   - Visit: `https://dasguptamaitiassociates.com/admin/login`
   - Should now work instead of showing 404!

3. **Clear browser cache** if needed

---

## 📋 Checklist:

- [ ] Located `frontend/build/` folder on your computer
- [ ] Determined which option applies (Option 1 or 2)
- [ ] Uploaded all files to the correct location
- [ ] Verified `.htaccess` file is present
- [ ] Tested `https://dasguptamaitiassociates.com/admin/login`
- [ ] It works! ✅

