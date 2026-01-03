# Quick Deployment Guide

## 🎯 Quick Steps

### 1️⃣ Prepare Your Environment Variables

**MongoDB Atlas:**
- Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Get connection string
- Whitelist all IPs (0.0.0.0/0)

**TMDB API:**
- Sign up at [themoviedb.org](https://www.themoviedb.org/)
- Get API key from Account Settings → API

**Gmail (for emails):**
- Enable 2-Step Verification
- Generate App Password: Google Account → Security → 2-Step Verification → App passwords

---

### 2️⃣ Deploy Backend on Render (5 minutes)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com) → New → Web Service
   - Connect GitHub repo
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   
3. **Add Environment Variables:**
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix
   JWT_SECRET=your-random-secret-min-32-chars
   TMDB_API_KEY=your-tmdb-api-key
   CLIENT_URL=https://your-app.vercel.app (add after frontend deploy)
   GOOGLE_APP_EMAIL=your-email@gmail.com
   GOOGLE_APP_PASSWORD=your-16-char-app-password
   SERVER_PORT=8000
   ```

4. **Click Deploy** → Copy your backend URL (e.g., `https://netflix-clone-abc123.onrender.com`)

---

### 3️⃣ Deploy Frontend on Vercel (3 minutes)

1. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) → New Project
   - Import your GitHub repo
   - **Root Directory:** `frontend`
   - **Framework:** Vite (auto-detected)
   
2. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   (Use the URL from step 2.4)

3. **Click Deploy** → Copy your frontend URL

---

### 4️⃣ Update Backend with Frontend URL

1. Go back to Render dashboard
2. Edit `CLIENT_URL` environment variable:
   ```
   CLIENT_URL=https://your-app.vercel.app
   ```
3. Save (service will auto-restart)

---

## ✅ Verify Deployment

1. Visit your Vercel URL
2. Sign up for a new account
3. Check email for verification
4. Login and browse content

---

## 🐛 Common Issues

**"CORS Error"**
- Verify `CLIENT_URL` on Render matches your Vercel URL exactly
- No trailing slash in URLs

**"Cannot connect to backend"**
- Check `VITE_API_URL` in Vercel
- Verify backend is running on Render (check logs)
- First request may take 30s (Render cold start)

**"Email not sending"**
- Use Gmail App Password, not regular password
- Ensure 2FA is enabled on Gmail account

**"Database connection failed"**
- Whitelist all IPs in MongoDB Atlas (0.0.0.0/0)
- Verify connection string includes username & password
- Check database user has read/write permissions

**"TMDB content not loading"**
- Verify API key is active
- Check you haven't exceeded rate limits (1000/day)

---

## 📝 Environment Variables Template

### Backend (Render)
```bash
NODE_ENV=production
SERVER_PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/netflix?retryWrites=true&w=majority
JWT_SECRET=<minimum-32-character-random-string>
TMDB_API_KEY=<your-tmdb-api-key>
CLIENT_URL=https://<your-app>.vercel.app
GOOGLE_APP_EMAIL=<your-email>@gmail.com
GOOGLE_APP_PASSWORD=<16-char-app-password>
```

### Frontend (Vercel)
```bash
VITE_API_URL=https://<your-backend>.onrender.com
```

---

## 💰 Free Tier Limits

- **Vercel:** 100GB bandwidth/month
- **Render:** 750 hours/month (sleeps after 15min inactivity)
- **MongoDB Atlas:** 512MB storage
- **TMDB API:** 1,000 requests/day

---

## 🚀 Post-Deployment

**Auto-deploy on Git Push:**
- Both Vercel and Render auto-deploy when you push to `main` branch
- Just commit and push:
  ```bash
  git add .
  git commit -m "Update feature"
  git push origin main
  ```

**View Logs:**
- **Render:** Dashboard → Service → Logs tab
- **Vercel:** Dashboard → Project → Deployments → Runtime Logs

---

## 📚 Full Documentation

For detailed troubleshooting and advanced configuration, see [DEPLOYMENT.md](DEPLOYMENT.md)
