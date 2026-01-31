# Deploying to GoForHost (cPanel)

This guide walks you through deploying your MERN stack application to the GoForHost platform.

## Prerequisites

1.  **GoForHost Account**: Access to your cPanel.
2.  **Deployment Zip**: Run `sh deploy_prep.sh` locally to generate `project_deploy.zip`.

## Step 1: Upload Files

1.  Log in to your **cPanel**.
2.  Open **File Manager**.
3.  Navigate to your **Home** directory (one level above `public_html`).
4.  Create a new folder named `ca-web-app`.
5.  Click **Upload** and select your `project_deploy.zip` into this `ca-web-app` folder.
6.  After upload, **Extract** the zip file.

## Step 2: Create Node.js Application

1.  Go back to the cPanel main dashboard.
2.  Search for **Setup Node.js App** (in the Software section) and click it.
3.  Click **Create Application**.
4.  **Node.js Version**: Select 18.x or higher as shown in your screenshot.
5.  **Application Mode**: Select **Production**.
6.  **Application Root**: Enter `ca-web-app` (or whatever you named your folder in Step 1). **Do NOT use `public_html` here.**
7.  **Application URL**: Select your domain.
8.  **Application Startup File**: Enter `backend/server.js`.
9.  Click **Create**.

## Step 3: Install Dependencies

1.  Once the app is created, you will see a button/section to **Run NPM Install**.
2.  Click **Run NPM Install**. This installs the backend dependencies.

## Step 4: Environment Variables (Important!)

1.  Your `.env` file might not be uploaded for security, or might need different values for production.
2.  In the File Manager, ensure your `.env` file exists in the root of your application folder.
3.  Right-click it and **Edit**.
4.  Ensure `NODE_ENV=production`.
5.  Ensure `MONGODB_URI` connects to your live database (or Atlas).
6.  Ensure `FRONTEND_URL` is set to your frontend domain **without trailing slash**:
   ```
   FRONTEND_URL=https://dasguptamaitiassociates.com
   ```
   **Important:** Do NOT include a trailing slash (`/`) in the URL.

## Step 5: Start the App

1.  Go back to the **Setup Node.js App** screen.
2.  Click **Restart** (or Start) to launch your application.

## Troubleshooting

-   **500/503 Errors**: Check the `stderr.log` in your File Manager (created automatically in the app root) to see error messages.
-   **Static Files Not Loading**: Ensure the `frontend/build` folder exists on the server.
-   **Database Access**: If using MongoDB Atlas, remember to **whitelist the hosting server's IP address** in MongoDB Network Access.
-   **CORS Errors**: 
  - Ensure `FRONTEND_URL` in `.env` is set to `https://dasguptamaitiassociates.com` (no trailing slash)
  - Backend URL should be `https://back.dasguptamaitiassociates.com`
  - Frontend URL should be `https://dasguptamaitiassociates.com`
  - Check server logs for CORS-related messages

## Updating Your App (Re-deploying)

If you make changes to your code locally:
1.  Run `sh deploy_prep.sh` on your computer again to create a fresh `project_deploy.zip`.
2.  In cPanel File Manager, delete the old files (except `.env` if you want to keep your secrets).
3.  Upload the new `project_deploy.zip` and extract it.
4.  Go to **Setup Node.js App** and click **Restart**.

## Deleting/Resetting

To completely remove the app:
1.  Go to **Setup Node.js App** in cPanel and click the **Trash** icon (Delete) next to your app.
2.  Go to **File Manager**, select your app folder (e.g., `public_html`), and **Delete** all files.

