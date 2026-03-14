# 🚀 Quick Deployment Steps (5 Minutes)

## Step 1: Push to GitHub (2 min)

```powershell
cd "C:\Users\iamro\Tuition Page"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/tuition-website.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend (2 min)

1. Go to **vercel.com** → Sign up/Login
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"** → Select your repo
4. **Root Directory**: `Backend`
5. **Add Environment Variables**:
   - `MONGODB_URI`: `mongodb://localhost:27017/tuition_classes`
   - `ADMIN_SECRET_TOKEN`: `SecurePassword123!`
6. Click **"Deploy"**
7. **Copy the URL** (e.g., `https://tuition-backend-xyz.vercel.app`)

---

## Step 3: Deploy Frontend (1 min)

1. Click **"Add New"** → **"Project"** again
2. Select **same repo** again
3. **Root Directory**: `Frontend`
4. **Add Environment Variable**:
   - `REACT_APP_API_URL`: `https://tuition-backend-xyz.vercel.app/api` ← Use backend URL from Step 2
5. Click **"Deploy"**
6. **Copy the frontend URL** (e.g., `https://tuition-frontend-xyz.vercel.app`)

---

## ✅ Done!

Your website is LIVE! 🎉

- **Website**: `https://tuition-frontend-xyz.vercel.app`
- **Admin Panel**: Click ⚙️ → Token: `SecurePassword123!`
- **Share**: Send website URL to students

---

## 🔄 Update Your Site Later

```powershell
# Make changes locally
git add .
git commit -m "Updated classes"
git push origin main
# Vercel auto-deploys! ✅
```

---

**That's it! You're online!** 🚀📚
