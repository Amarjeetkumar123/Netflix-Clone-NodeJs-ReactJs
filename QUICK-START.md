# 🎬 Netflix Clone - Quick Reference Card

## 🚀 Local Setup (First Time)

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/netflix-clone.git
cd netflix-clone

# 2. Install
npm run build

# 3. Configure .env (root directory)
cp backend/.env.example .env
# Edit .env with your API keys

# 4. Run
npm run dev

# 5. Open
# http://localhost:5173
```

---

## 🔑 Required API Keys

| Service | Get It From | Used For |
|---------|-------------|----------|
| MongoDB | [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas) | Database |
| TMDB | [themoviedb.org/settings/api](https://themoviedb.org/settings/api) | Movies/TV data |
| Gmail App Password | Google Account → Security → 2FA → App passwords | Emails |

---

## 📁 Environment Variables

**Location:** `.env` file in **root** directory

```bash
SERVER_PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=min-32-character-random-string
MONGO_URI=mongodb://localhost:27017/netflix
TMDB_API_KEY=your-tmdb-key
GOOGLE_APP_EMAIL=your@gmail.com
GOOGLE_APP_PASSWORD=16-char-app-password
```

**Frontend:** `frontend/.env`
```bash
VITE_API_URL=http://localhost:8000
```

---

## 🛠️ Common Commands

```bash
# Development (both frontend + backend)
npm run dev

# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev

# Install dependencies
npm run build

# Format code
npm run format

# Production build
npm run build --prefix frontend

# Production start
npm start
```

---

## 🌐 URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:8000 | 8000 |
| MongoDB (local) | mongodb://localhost:27017 | 27017 |

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port already in use | `lsof -ti:8000 \| xargs kill -9` (Mac/Linux) |
| Can't connect to MongoDB | Start MongoDB: `brew services start mongodb-community` |
| Backend won't start | Check `.env` is in **root** directory |
| Frontend can't reach backend | Check `VITE_API_URL` in `frontend/.env` |
| Email not sending | Use Gmail **App Password**, not regular password |

---

## 📖 Documentation Links

- **[LOCAL-SETUP.md](LOCAL-SETUP.md)** - Complete local setup guide
- **[QUICK-DEPLOY.md](QUICK-DEPLOY.md)** - Deploy in 10 minutes
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Full deployment guide
- **[README.md](README.md)** - Project overview

---

## 🔍 Project Structure

```
netflix-clone/
├── backend/        # Express.js API
├── frontend/       # React + Vite
├── .env            # Backend config (root)
└── frontend/.env   # Frontend config
```

---

## ✅ Verification Steps

1. Sign up → Check email → Verify code
2. Login → Browse movies/TV shows
3. Search → View trailers
4. Check search history

---

## 🚀 Deployment

**Frontend:** Vercel  
**Backend:** Render  
**Database:** MongoDB Atlas  

See [QUICK-DEPLOY.md](QUICK-DEPLOY.md) for instructions.

---

## 💡 Pro Tips

1. Generate JWT secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. Use MongoDB Compass for database GUI
3. Install VS Code extensions: ESLint, Prettier, Tailwind CSS IntelliSense
4. Check browser DevTools Console for frontend errors
5. Check terminal for backend errors

---

**Need help?** Check [LOCAL-SETUP.md](LOCAL-SETUP.md) for detailed instructions!
