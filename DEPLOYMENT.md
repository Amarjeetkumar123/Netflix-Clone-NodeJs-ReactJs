# Deployment Guide

This guide will help you deploy the Netflix Clone application with:
- **Frontend**: Vercel
- **Backend**: Render

---

## Prerequisites

1. **MongoDB Atlas Account** - For cloud database
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster (free tier available)
   - Get your connection string

2. **TMDB API Key**
   - Sign up at [themoviedb.org](https://www.themoviedb.org/)
   - Get your API key from settings

3. **Gmail App Password** (for email features)
   - Enable 2FA on your Gmail account
   - Generate an app password

4. **Accounts**
   - GitHub account (to connect repositories)
   - Vercel account - [vercel.com](https://vercel.com)
   - Render account - [render.com](https://render.com)

---

## Part 1: Deploy Backend on Render

### Step 1: Push Code to GitHub
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin your-github-repo-url
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `netflix-clone-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGO_URI` = `your_mongodb_connection_string`
   - `JWT_SECRET` = `your_secure_random_string`
   - `TMDB_API_KEY` = `your_tmdb_api_key`
   - `CLIENT_URL` = `https://netflix-clone-frontend-woad.vercel.app` (use your exact Vercel URL, NO trailing slash)
   - `GOOGLE_APP_EMAIL` = `your_gmail@gmail.com`
   - `GOOGLE_APP_PASSWORD` = `your_gmail_app_password`
   - `SERVER_PORT` = `8000`

   > ⚠️ **Important**: Copy the `CLIENT_URL` exactly from Vercel. Make sure there's NO trailing slash!

6. Click **"Create Web Service"**

7. Wait for deployment to complete

8. Copy your backend URL (e.g., `https://netflix-clone-backend-xxxx.onrender.com`)

---

## Part 2: Deploy Frontend on Vercel

### Step 1: Update Frontend Environment

1. Create `.env` file in `frontend/` directory:
```bash
VITE_API_URL=https://your-backend-url.onrender.com
```

### Step 2: Deploy on Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

5. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com`

6. Click **"Deploy"**

7. Wait for deployment to complete

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to frontend directory
cd frontend

# Deploy
vercel --prod

# Follow the prompts
# When asked for environment variables, add:
# VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Part 3: Update Backend with Frontend URL

1. Go back to Render dashboard
2. Go to your backend service
3. Update the `CLIENT_URL` environment variable:
   - `CLIENT_URL` = `https://your-app-name.vercel.app`

4. Save and wait for the service to restart

---

## Part 4: Configure MongoDB Atlas

1. Go to MongoDB Atlas dashboard
2. Click **"Network Access"**
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Confirm

---

## Verification

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Try to sign up for a new account
3. Check your email for verification
4. Login and browse content

---

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend is running on Render
- Check CORS settings in backend
- **Make sure `CLIENT_URL` in Render has NO trailing slash**
- Check Render logs for "CORS Error" messages showing which origin was rejected

### Email not sending
- Verify Gmail app password is correct
- Check Gmail account has 2FA enabled
- Check environment variables on Render

### Database connection error
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check `MONGO_URI` connection string is correct
- Ensure database user has read/write permissions

### TMDB data not loading
- Verify `TMDB_API_KEY` is correct and active
- Check API key hasn't exceeded rate limits

---

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_random_secret
TMDB_API_KEY=your_tmdb_key
CLIENT_URL=https://your-app.vercel.app
GOOGLE_APP_EMAIL=your@gmail.com
GOOGLE_APP_PASSWORD=your_app_password
SERVER_PORT=8000
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## Useful Commands

### Redeploy Backend
```bash
git add .
git commit -m "Update backend"
git push origin main
# Render will auto-deploy
```

### Redeploy Frontend
```bash
cd frontend
vercel --prod
# Or push to GitHub and Vercel will auto-deploy
```

### Check Backend Logs
- Go to Render dashboard → Your service → Logs tab

### Check Frontend Logs
- Go to Vercel dashboard → Your project → Deployments → Click deployment → Runtime Logs

---

## Cost

- **MongoDB Atlas**: Free tier (512 MB storage)
- **Render**: Free tier (750 hours/month, sleeps after inactivity)
- **Vercel**: Free tier (100 GB bandwidth/month)
- **TMDB API**: Free (1000 requests/day)

**Note**: Render free tier services spin down after 15 minutes of inactivity and take ~30 seconds to wake up on first request.

---

## Production Optimizations (Optional)

1. **Enable Redis caching** for TMDB API responses
2. **Add CDN** for static assets
3. **Upgrade Render plan** to prevent cold starts
4. **Add monitoring** (Sentry for error tracking)
5. **Setup CI/CD** for automated testing before deployment
