# Fix for 404 Error on Admin Login Route

## Problem
Getting 404 error when accessing `https://dasguptamaitiassociates.com/admin/login`

## Root Cause
The frontend domain (`dasguptamaitiassociates.com`) is separate from the backend domain (`back.dasguptamaitiassociates.com`). This means:
- Frontend is served directly by Apache/web server (not through Node.js)
- The `.htaccess` file is needed for client-side routing
- The `.htaccess` file must be in the document root where the frontend is served

## Solution

### Step 1: Verify .htaccess File Location

The `.htaccess` file must be in the **root directory** where your frontend is served. This is typically:
- `public_html/` (if frontend is in the main domain root)
- `public_html/dasguptamaitiassociates.com/` (if using a subdirectory)
- Or wherever your domain's document root points to

### Step 2: Upload Updated Build Folder

1. **Locally**, the `.htaccess` file is now in:
   - `frontend/public/.htaccess` (source)
   - `frontend/build/.htaccess` (copied to build)

2. **On Server**, upload the entire `frontend/build` folder contents to your document root:
   - Go to cPanel → File Manager
   - Navigate to your domain's document root (usually `public_html`)
   - Upload all files from `frontend/build/` including:
     - `index.html`
     - `.htaccess` (THIS IS CRITICAL!)
     - `static/` folder
     - All other files

### Step 3: Verify .htaccess is Present

After uploading, verify:
1. The `.htaccess` file exists in the document root
2. File permissions are correct (644 or 644)
3. The file is not hidden (some FTP clients hide dot-files)

### Step 4: Check Apache Configuration

Ensure your server has:
- `mod_rewrite` enabled
- `.htaccess` files allowed (usually enabled by default on cPanel)

### Step 5: Test

After uploading, test:
- `https://dasguptamaitiassociates.com/` (should work)
- `https://dasguptamaitiassociates.com/admin/login` (should now work!)

## Alternative: If .htaccess Doesn't Work

If `.htaccess` still doesn't work, you may need to:

1. **Check with your hosting provider** if `mod_rewrite` is enabled
2. **Use a different approach**: Configure routing in cPanel or contact support
3. **Use web.config** (if on Windows/IIS server instead of Apache)

## Updated .htaccess Content

The `.htaccess` file has been updated with:
- Better rewrite rules
- API route exclusions
- Fallback for servers without mod_rewrite

## Important Notes

- The `.htaccess` file MUST be in the same directory as `index.html`
- If your frontend is in a subdirectory, adjust `RewriteBase` accordingly
- After uploading, clear browser cache and test in incognito mode

