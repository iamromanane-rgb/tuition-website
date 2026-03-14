# Quick Start Guide

## Step 1: Setup Backend

1. Open PowerShell and navigate to Backend folder:
```powershell
cd "c:\Users\iamro\Tuition Page\Backend"
```

2. Install dependencies:
```powershell
npm install
```

3. Create `.env` file with your settings:
```powershell
# Create a new .env file
@"
MONGODB_URI=mongodb://localhost:27017/tuition_classes
PORT=5000
ADMIN_SECRET_TOKEN=change_this_to_your_secure_token
NODE_ENV=development
"@ | Out-File .env
```

4. Make sure MongoDB is running (or skip if using MongoDB Atlas cloud)

5. Start the backend server:
```powershell
npm run dev
```

Expected output: `Server is running on port 5000`

## Step 2: Setup Frontend

1. Open another PowerShell and navigate to Frontend folder:
```powershell
cd "c:\Users\iamro\Tuition Page\Frontend"
```

2. Install dependencies:
```powershell
npm install
```

3. Start the frontend development server:
```powershell
npm start
```

This will automatically open `http://localhost:3000` in your browser.

## Step 3: Access the Application

### Public Site (All Users)
- **URL**: http://localhost:3000
- Features:
  - View all available classes
  - Filter by subject (Hindi/Tamil)
  - Submit contact inquiry form
  - See instructor information

### Admin Dashboard
- Click the **⚙️ (gear icon)** button in bottom-right corner
- Enter your admin token (the one you set in `.env`)
- Access admin features:
  - **Settings**: Update phone, email, years of experience
  - **Manage Classes**: Add, edit, or delete classes
  - **Submissions**: View student inquiries and manage them

## Sample Data Setup

### Add Sample Classes (via Admin Dashboard):

1. Go to "Manage Classes" tab
2. Add classes like:
   - Class 1-9 (Hindi, L1/L2, ₹500-600)
   - DBHPS Level 1-2 (Hindi, ₹800-1000)
   - Tamil Class 1-3 (Tamil, L1/L2, ₹600-800)

### Update Your Info (via Admin Dashboard):

1. Go to "Settings" tab
2. Enter your phone number and email
3. Update years of experience and other details
4. Click "Save Changes"

## Troubleshooting

### Port Already in Use
If port 5000 is already in use:
```powershell
# Change PORT in Backend\.env
PORT=5001
```

### MongoDB Connection Error
- Install MongoDB Community Edition locally
- Or use MongoDB Atlas (cloud): Replace MONGODB_URI with your connection string
- Example: `mongodb+srv://username:password@cluster.mongodb.net/tuition_classes`

### Frontend Can't Connect to Backend
- Make sure backend is running on http://localhost:5000
- Check Frontend\.env has correct API_URL
- Check CORS is enabled in backend

### npm install fails
```powershell
# Clear npm cache
npm cache clean --force
# Try install again
npm install
```

## File Changes

After making changes:
- **Backend**: Restart the `npm run dev` command
- **Frontend**: Changes auto-refresh (hot reload)

## Next Steps

1. **Customize**: Edit text, colors, and information as needed
2. **Deploy**: Follow deployment section in main README.md
3. **Go Live**: Add your domain name and share with students

## Support

All files are ready to use. Just ensure:
- ✅ Node.js installed
- ✅ MongoDB running or MongoDB Atlas account
- ✅ .env files configured
- ✅ npm install completed

Happy tutoring! 🎓
