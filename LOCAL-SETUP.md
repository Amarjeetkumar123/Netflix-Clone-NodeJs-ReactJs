# 🚀 Local Development Setup Guide

Complete guide to set up and run this Netflix Clone project locally after cloning from GitHub.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** 20.12.0 or later ([Download](https://nodejs.org))
- ✅ **Git** installed ([Download](https://git-scm.com))
- ✅ **MongoDB** (local or Atlas account)
- ✅ **Code Editor** (VS Code recommended)

---

## 🔧 Step-by-Step Setup

### 1️⃣ Clone the Repository

```bash
# Clone the project
git clone https://github.com/YOUR_USERNAME/netflix-clone.git

# Navigate to project directory
cd netflix-clone
```

---

### 2️⃣ Install Dependencies

Install all dependencies for root, backend, and frontend:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

**Or use the build script to install everything at once:**
```bash
npm run build
```

---

### 3️⃣ Get Required API Keys

#### **A. MongoDB Database**

**Option 1: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

Example: `mongodb+srv://username:password@cluster.mongodb.net/netflix`

**Option 2: Local MongoDB**
1. Install MongoDB locally: [mongodb.com/docs/manual/installation](https://www.mongodb.com/docs/manual/installation/)
2. Start MongoDB service:
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```
3. Use connection string: `mongodb://localhost:27017/netflix`

#### **B. TMDB API Key**

1. Sign up at [themoviedb.org](https://www.themoviedb.org/)
2. Go to Settings → API
3. Request API key (choose "Developer" option)
4. Fill out the form and submit
5. Copy your API key

#### **C. Gmail App Password (for email features)**

1. Go to your Google Account settings
2. Enable **2-Step Verification**
3. Go to Security → 2-Step Verification → App passwords
4. Generate a new app password
5. Copy the 16-character password

---

### 4️⃣ Configure Environment Variables

#### **Create Backend .env File**

Create a `.env` file in the **root directory**:

```bash
# Create .env file from template
cp backend/.env.example .env

# Or manually create it
touch .env
```

Add the following content to `.env`:

```bash
# Server Configuration
SERVER_PORT=8000
NODE_ENV=development

# Client Configuration
CLIENT_HOST=localhost
CLIENT_PORT=5173
CLIENT_URL=http://localhost:5173

# JWT Secret (generate a random string, min 32 characters)
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long

# MongoDB Database
MONGO_URI=mongodb://localhost:27017/netflix
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix?retryWrites=true&w=majority

# TMDB API
TMDB_API_KEY=your_tmdb_api_key_here

# Gmail Configuration
GOOGLE_APP_EMAIL=your.email@gmail.com
GOOGLE_APP_PASSWORD=your_16_char_app_password
```

#### **Create Frontend .env File**

The frontend `.env` file is already created, but verify it:

```bash
# Check frontend/.env exists
cat frontend/.env
```

It should contain:
```bash
VITE_API_URL=http://localhost:8000
```

---

### 5️⃣ Generate JWT Secret

Generate a secure random string for JWT_SECRET:

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 32

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
```

Copy the generated string and paste it as `JWT_SECRET` in your `.env` file.

---

### 6️⃣ Verify Configuration

Check that all environment variables are set:

```bash
# View your .env file (be careful not to share this!)
cat .env

# Or use the deployment checker
./check-deployment.sh
```

---

### 7️⃣ Start the Application

#### **Option 1: Start Both Frontend & Backend Together (Recommended)**

```bash
# From root directory
npm run dev
```

This will start:
- 🎬 Backend server on `http://localhost:8000`
- ⚛️ Frontend dev server on `http://localhost:5173`

#### **Option 2: Start Separately**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

### 8️⃣ Open the Application

1. Open your browser
2. Go to: **http://localhost:5173**
3. You should see the Netflix Clone homepage!

---

## ✅ Verify Everything Works

### Test the Application:

1. **Sign Up**
   - Click "Sign Up"
   - Enter username, email, password
   - Click "Sign Up"

2. **Check Email**
   - Check your inbox for verification email
   - Copy the 6-digit code

3. **Verify Email**
   - Enter the verification code
   - Click "Verify"

4. **Login**
   - Enter your credentials
   - You should be redirected to the home page

5. **Browse Content**
   - Movies and TV shows should load
   - Try searching for content
   - Click on a movie/show to watch trailer

---

## 🐛 Troubleshooting

### Backend won't start

**Error: `MONGO_URI` not defined**
```bash
# Make sure .env file is in the ROOT directory, not in backend/
# Check: ls -la | grep .env
# Should show: .env in the root
```

**Error: Cannot connect to MongoDB**
```bash
# If using local MongoDB, ensure it's running:
# macOS: brew services list | grep mongodb
# Linux: sudo systemctl status mongod
# Windows: Check Services for MongoDB

# If using Atlas, check:
# 1. Connection string is correct
# 2. Password has no special characters (or properly encoded)
# 3. IP is whitelisted in Atlas (Network Access)
```

**Error: Port 8000 already in use**
```bash
# Find and kill the process using port 8000
# macOS/Linux:
lsof -ti:8000 | xargs kill -9

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Frontend won't start

**Error: Port 5173 already in use**
```bash
# Kill process on port 5173
# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Error: Cannot connect to backend**
- Check `VITE_API_URL` in `frontend/.env`
- Should be: `http://localhost:8000`
- Restart frontend dev server after changing

### Email not sending

**Gmail authentication error**
1. Make sure 2-Step Verification is enabled
2. Use App Password, not your regular Gmail password
3. App Password should be 16 characters (no spaces)
4. Remove spaces from the password in .env file

### TMDB content not loading

**Invalid API key**
1. Verify API key is correct in .env
2. Check API key is activated (may take a few minutes)
3. Check you haven't exceeded rate limits

**No content showing**
- Open browser DevTools (F12)
- Check Network tab for failed requests
- Check Console for errors

### Movies/TV shows not loading

1. Check backend logs for errors
2. Verify `TMDB_API_KEY` in .env
3. Check internet connection
4. TMDB might be experiencing downtime

---

## 📁 Project Structure

```
netflix-clone/
├── backend/              # Express.js backend
│   ├── config/          # Database & environment config
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Auth & validation
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # External services (TMDB, Email)
│   └── app.js           # Express app setup
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Zustand state management
│   │   ├── hooks/       # Custom hooks
│   │   └── utils/       # Helper functions
│   └── vite.config.js   # Vite configuration
│
├── .env                 # Backend environment variables (ROOT)
└── frontend/.env        # Frontend environment variables
```

---

## 🎯 Development Workflow

### Making Changes

```bash
# 1. Make your changes to the code

# 2. Changes auto-reload (Hot Module Replacement)
#    Frontend: Instant refresh
#    Backend: Auto-restart with nodemon

# 3. Format code before committing
npm run format

# 4. Commit your changes
git add .
git commit -m "Your message"
git push
```

### Running Production Build

```bash
# Build frontend for production
cd frontend
npm run build

# Preview production build
npm run preview

# Start backend in production mode
cd ../backend
npm start
```

---

## 🔍 Useful Commands

```bash
# Install all dependencies
npm run build

# Start development servers (both)
npm run dev

# Format code with Prettier
npm run format

# Start backend only
cd backend && npm run dev

# Start frontend only
cd frontend && npm run dev

# Build frontend for production
cd frontend && npm run build

# Preview production build
cd frontend && npm run preview

# Check for outdated packages
npm outdated

# Update dependencies
npm update
```

---

## 🌐 API Endpoints

Base URL: `http://localhost:8000/api/v1`

### Authentication
- `POST /account/signup` - Register new user
- `POST /account/login` - Login user
- `POST /account/logout` - Logout user
- `GET /account/auth` - Check auth status
- `POST /account/verify/email` - Verify email
- `POST /account/forgot/password` - Request password reset
- `POST /account/reset/password/:token` - Reset password

### Movies
- `GET /movie/trending` - Get trending movies
- `GET /movie/:id/trailers` - Get movie trailers
- `GET /movie/:id/details` - Get movie details
- `GET /movie/:id/similar` - Get similar movies

### TV Shows
- `GET /tv/trending` - Get trending TV shows
- `GET /tv/:id/trailers` - Get TV trailers
- `GET /tv/:id/details` - Get TV details
- `GET /tv/:id/similar` - Get similar TV shows

### Search
- `GET /search/person/:query` - Search people
- `GET /search/movie/:query` - Search movies
- `GET /search/tv/:query` - Search TV shows
- `GET /search/history` - Get search history
- `DELETE /search/history/:id` - Delete search item

---

## 📚 Resources

- **MongoDB**: [mongodb.com/docs](https://www.mongodb.com/docs/)
- **TMDB API**: [developers.themoviedb.org](https://developers.themoviedb.org/3)
- **React**: [react.dev](https://react.dev/)
- **Express**: [expressjs.com](https://expressjs.com/)
- **Vite**: [vitejs.dev](https://vitejs.dev/)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/)

---

## 💡 Tips

1. **Use VS Code Extensions**:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - MongoDB for VS Code

2. **Browser DevTools**:
   - Use Network tab to debug API calls
   - Use Console to see errors
   - Use React DevTools for component debugging

3. **Keep Dependencies Updated**:
   ```bash
   npm outdated
   npm update
   ```

4. **Test Email Locally**:
   - Use a temporary email service
   - Or create a test Gmail account

5. **Database GUI Tools**:
   - MongoDB Compass (official)
   - Studio 3T
   - Robo 3T

---

## 🎉 You're All Set!

Your Netflix Clone should now be running locally at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000

Happy coding! 🚀

---

## 📞 Need Help?

- Check existing issues on GitHub
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
- Check backend logs in terminal
- Check browser console for frontend errors

---

**Next Steps:**
- Explore the codebase
- Make changes and see them live reload
- Check [DEPLOYMENT.md](DEPLOYMENT.md) when ready to deploy
