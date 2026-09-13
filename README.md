# AI Talent Hunt — Full Stack Application

## Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

## Backend Setup

```bash
cd backend
npm install
```

### Option A: Local MongoDB (default)
Make sure MongoDB is running:
```bash
mongod
```
The app will auto-connect to `mongodb://127.0.0.1:27017/ai-talent-hunt`

### Option B: MongoDB Atlas (cloud)
Edit `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-talent-hunt
```

### Start Backend
```bash
npm start
# Server runs on http://localhost:5000
```

Admin auto-seeded on first run:
- **Username:** `admin`
- **Password:** `admin123`

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

The frontend proxies API calls to `localhost:5001` automatically.

---

## Deploy frontend on Vercel

1. Import this GitHub repo in [Vercel](https://vercel.com/new)
2. Framework: Create React App
3. Root Directory: leave default (repo uses root `vercel.json`)
4. Add environment variable:
   - `REACT_APP_API_URL` = `https://sofanext.co.uk`
     (your cPanel Node.js backend URL, no trailing slash)
5. Deploy

The site on Vercel will call the backend APIs on that URL.

---

## Features
- Fully responsive (mobile, tablet, desktop)
- Dynamic job listings from MongoDB
- Admin panel with JWT auth
- PDF CV upload (max 2MB)
- Application tracking dashboard
