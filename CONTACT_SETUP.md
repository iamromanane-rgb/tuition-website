# 📞 Setting Up Your Contact Information

## Important: Update These Details!

The website displays YOUR contact information that users can click to reach you.

### Step 1: Set Admin Token

Edit `Backend/.env`:
```env
ADMIN_SECRET_TOKEN=your_secure_password_123
MONGODB_URI=mongodb://localhost:27017/tuition_classes
PORT=5000
NODE_ENV=development
```

**Choose a strong admin token like:**
- ✅ `MyTuitionPass2024!@#`
- ✅ `Hindi2024Secure123`
- ✅ `SecureAdmin98765`

### Step 2: Add Your Contact Info (Two Ways)

#### Option A: Via Admin Dashboard (Recommended)

1. Start the application:
   ```powershell
   # Terminal 1: Backend
   cd Backend
   npm run dev
   
   # Terminal 2: Frontend
   cd Frontend
   npm start
   ```

2. Visit `http://localhost:3000`

3. Click the **⚙️ gear icon** (bottom-right corner)

4. Enter your admin token (from `.env`)

5. Go to **Settings** tab

6. Update:
   - **Phone Number**: `+91-XXXXXXXXXX` or `91XXXXXXXXXX`
   - **Email Address**: `your.email@example.com`
   - **Years of Experience**: `15` (or your value)
   - **About Text**: Write a short bio

7. Click **Save Changes** ✅

#### Option B: Using API (For Testing)

```bash
# Use Postman or curl to update admin info
POST http://localhost:5000/api/admin/info/update
Header: x-admin-token: your_secure_token_123

Body:
{
  "phoneNumber": "+91-9876543210",
  "emailAddress": "your.email@example.com",
  "yearsOfExperience": 15,
  "aboutText": "Experienced Hindi & Tamil tutor with 15+ years of teaching excellence",
  "qualifications": [
    "Masters in Hindi",
    "B.A. in Languages",
    "Teaching Certification"
  ]
}
```

---

## What Gets Displayed Where?

### Top Header Bar
```
📞 Quick Contact: +91-9876543210  [☎️] [💬] [✉️]
```
- Phone number shows here
- Contact icons link to: call, WhatsApp, email

### Main Header Section
```
🎓 Hindi & Tamil Tuition Classes

📱 Phone: +91-9876543210
📧 Email: your.email@example.com  
⭐ Experience: 15+ Years
```

### Contact Icons

When users click:

**☎️ Phone Icon**
- Opens: `tel:+919876543210`
- Action: Direct phone call

**💬 WhatsApp Icon**
- Opens: `https://wa.me/919876543210`
- Action: Chat on WhatsApp (no message sent yet)
- *Note: Format should be country code + number without spaces/dashes*

**✉️ Email Icon**
- Opens: `mailto:your.email@example.com`
- Action: Opens default email client

---

## Phone Number Format Guide

Different formats that work:

```
Input Format          | WhatsApp Works?
─────────────────────────────────────
+91-9876543210       | ✅ (auto-cleaned)
+919876543210        | ✅ (perfect)
9876543210           | ❌ (needs country code)
91-9876543210        | ✅ (auto-cleaned)
```

**Recommended:** `+91-9876543210` (with country code and dashes)

The system automatically removes dashes and spaces for WhatsApp.

---

## Email Format Guide

```
Good Examples:
- your.email@example.com
- yourname@company.com
- tuition.contact@gmail.com
- hindi.tamil.teacher@outlook.com

Should have: name@domain.com format
```

---

## Complete Setup Example

### Your Details
```
👤 Name: Rajesh Kumar
☎️ Phone: +91-9876543210
📧 Email: rajesh.hindi.classes@gmail.com
⭐ Experience: 15 years
📚 Languages: Hindi, Tamil
🏆 Classes: 1-9, DBHPS, Tamil
```

### In Admin Settings
```
Phone Number: +91-9876543210
Email Address: rajesh.hindi.classes@gmail.com
Years of Experience: 15
About Text: Experienced Hindi and Tamil tuition instructor with 15 years of teaching excellence. Specialized in Classes 1-9, DBHPS exam preparation, and Tamil language courses.
Qualifications: 
- Masters in Hindi Language
- B.A. in Comparative Languages
- Government Teaching Certification
```

### What Users See

**Top Bar:**
```
📞 Quick Contact: +91-9876543210  [☎️] [💬] [✉️]
```

**Header:**
```
🎓 Hindi & Tamil Tuition Classes
Learn from an Experienced Instructor with 15+ Years of Excellence

📱 Phone: +91-9876543210
📧 Email: rajesh.hindi.classes@gmail.com  
⭐ Experience: 15+ Years
```

**When they click WhatsApp:**
- Opens WhatsApp with your number ready to chat
- They can type a message before sending

**When they click Call:**
- Opens their phone dialer with your number

**When they click Email:**
- Opens their email client ready to compose

---

## Verification Checklist

After setup, verify:

- [ ] Admin token saved in `Backend/.env`
- [ ] Backend running: `http://localhost:5000/api/health` returns OK
- [ ] Frontend running: `http://localhost:3000` loads
- [ ] Can login to admin panel with your token
- [ ] Contact info displays in header correctly
- [ ] ☎️ icon calls your number
- [ ] 💬 icon opens WhatsApp with your number
- [ ] ✉️ icon opens email client
- [ ] Phone number appears in top header bar
- [ ] All classes display correctly

---

## Updating Information Later

You can update at any time:

1. Click ⚙️ gear icon
2. Enter admin token
3. Go to Settings tab
4. Change any field
5. Click Save

The website updates instantly! ✨

---

## Security Notes

⚠️ **Important:**
- Never share your admin token publicly
- Keep `.env` file confidential
- Use strong, unique admin tokens
- Don't commit `.env` to GitHub
- Your phone/email will be PUBLIC on website (intentional for contact)

---

## Troubleshooting

**WhatsApp not opening?**
- Check format: `+91-XXXXXXXXXX`
- Remove extra spaces or special characters
- WhatsApp needs 10-digit mobile number after country code

**Email not opening?**
- Verify format: `something@domain.com`
- Check for typos

**Can't reach admin settings?**
- Verify admin token is correct
- Check it matches your `.env` file exactly
- Token is case-sensitive

---

## Live on Web?

When deployed to web:

1. Update your domain in frontend `.env`
2. Update backend URL to your live server
3. Use MongoDB Atlas (cloud database)
4. Phone/email will be public (intended!)
5. Users can contact you directly from any device

---

Need help? Check:
- README.md - Full documentation
- RUN_INSTRUCTIONS.md - Setup guide
- FRONTEND_ENHANCEMENTS.md - UI changes
- VISUAL_CHANGES.md - Design improvements

Good luck! 🎓📱
