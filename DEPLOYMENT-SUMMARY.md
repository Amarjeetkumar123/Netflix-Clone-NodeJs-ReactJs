# Deployment Files Summary

This directory contains all the configuration files needed to deploy your Netflix Clone application.

## 📁 Files Added

### Configuration Files

1. **`frontend/vercel.json`**
   - Vercel configuration for SPA routing
   - Redirects all routes to index.html

2. **`backend/render.yaml`**
   - Render.com configuration (optional)
   - Defines build and start commands
   - Lists required environment variables

3. **`frontend/.env`**
   - Local development environment variables
   - Points to local backend by default

4. **`frontend/.env.example`**
   - Template for frontend environment variables
   - Shows what needs to be configured

5. **`backend/.env.example`**
   - Template for backend environment variables
   - Lists all required API keys and configurations

### Documentation

6. **`DEPLOYMENT.md`**
   - Complete deployment guide with detailed steps
   - Troubleshooting section
   - Environment variables reference

7. **`QUICK-DEPLOY.md`**
   - Quick reference guide (10 minutes)
   - Step-by-step checklist
   - Common issues and fixes

8. **`check-deployment.sh`**
   - Automated pre-deployment checker
   - Verifies dependencies and builds
   - Run before deploying

### Code Updates

9. **`frontend/vite.config.js`**
   - Updated proxy configuration
   - Supports VITE_API_URL environment variable

10. **`frontend/src/store/auth.store.js`**
    - Added axios baseURL configuration
    - Uses VITE_API_URL in production

11. **`backend/app.js`**
    - Enhanced CORS configuration
    - Supports multiple frontend origins
    - Better production handling

12. **`.gitignore`**
    - Updated to exclude .env files
    - Includes .env.example files
    - Excludes build directories

---

## 🚀 Deployment Workflow

### First-Time Setup

1. **Read Documentation:**
   ```bash
   cat QUICK-DEPLOY.md  # Quick 10-min guide
   cat DEPLOYMENT.md     # Detailed guide
   ```

2. **Setup Environment Variables:**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your values
   
   # Frontend (already created for local dev)
   # You'll set VITE_API_URL in Vercel dashboard
   ```

3. **Run Pre-deployment Check:**
   ```bash
   ./check-deployment.sh
   ```

4. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

5. **Deploy Backend (Render):**
   - Follow QUICK-DEPLOY.md → Section 2

6. **Deploy Frontend (Vercel):**
   - Follow QUICK-DEPLOY.md → Section 3

7. **Update Environment Variables:**
   - Add frontend URL to backend
   - Restart backend service

---

## 🔑 Required API Keys & Accounts

Before deploying, you'll need:

| Service | Purpose | Get It From |
|---------|---------|------------|
| MongoDB Atlas | Database | [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) |
| TMDB API | Movie/TV data | [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) |
| Gmail App Password | Email sending | Google Account → Security → 2-Step Verification |
| GitHub | Code hosting | [github.com](https://github.com) |
| Render | Backend hosting | [render.com](https://render.com) |
| Vercel | Frontend hosting | [vercel.com](https://vercel.com) |

---

## 🎯 Quick Commands

```bash
# Check if ready to deploy
./check-deployment.sh

# Test frontend build locally
cd frontend && npm run build && npm run preview

# Test backend locally
cd backend && npm start

# View deployment docs
cat QUICK-DEPLOY.md

# Redeploy (after pushing to GitHub)
git add .
git commit -m "Your changes"
git push origin main
# Vercel & Render will auto-deploy
```

---

## 📊 Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] TMDB API key obtained
- [ ] Gmail App Password generated
- [ ] GitHub repository created
- [ ] Backend .env configured
- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] Frontend deployed on Vercel
- [ ] VITE_API_URL set in Vercel
- [ ] Frontend URL copied
- [ ] CLIENT_URL updated in Render
- [ ] Tested signup/login flow
- [ ] Email verification working
- [ ] Content browsing working

---

## 🆘 Getting Help

**Check Logs:**
- Render: Dashboard → Your Service → Logs
- Vercel: Dashboard → Your Project → Deployments → Runtime Logs

**Common Solutions:**
1. CORS errors → Check CLIENT_URL matches exactly
2. Can't connect → Check VITE_API_URL is correct
3. Cold start slow → First Render request takes ~30s
4. Email not sending → Use App Password, not regular password

**Documentation:**
- [QUICK-DEPLOY.md](QUICK-DEPLOY.md) - Fast deployment guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Comprehensive guide

---

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Can visit frontend URL
- ✅ Can sign up for new account
- ✅ Receive verification email
- ✅ Can log in after verification
- ✅ Can browse movies and TV shows
- ✅ Search functionality works
- ✅ Can add to search history

---

## 💡 Tips

1. **Render Free Tier:** Services sleep after 15 min of inactivity. First request may take 30 seconds to wake up.

2. **Environment Variables:** Never commit `.env` files. Always use `.env.example` as templates.

3. **Auto-Deploy:** Both Vercel and Render automatically deploy when you push to the main branch.

4. **MongoDB:** Use connection string format: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/dbname`

5. **Testing:** Always test locally before deploying:
   ```bash
   npm run dev  # Test locally
   npm run build  # Test production build
   ```

---

Good luck with your deployment! 🚀
