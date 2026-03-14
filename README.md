# Tuition Classes MERN Stack Web Application

A complete full-stack web application for advertising online Hindi and Tamil tuition classes built with MERN (MongoDB, Express, React, Node.js).

## Features

### For Users
- Browse available classes (Classes 1-9, DBHPS exams, Tamil classes)
- Filter classes by subject and view detailed information
- Submit contact form to inquire about classes
- Responsive and user-friendly interface

### For Admin
- Manage class listings (add, edit, delete classes)
- View and manage contact submissions from interested students
- Update personal information (phone, email, experience)
- Secure admin panel with token-based authentication
- RBAC (Role-Based Access Control) implementation

## Project Structure

```
Backend/
├── src/
│   ├── models/
│   │   ├── ClassDetail.js
│   │   ├── ContactSubmission.js
│   │   └── AdminInfo.js
│   ├── routes/
│   │   ├── classRoutes.js
│   │   ├── contactRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   └── index.js
├── package.json
└── .env.example

Frontend/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── ClassesSection.js
│   │   ├── ContactForm.js
│   │   ├── AdminPanel.js
│   │   ├── ManageClasses.js
│   │   └── ManageSubmissions.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   └── AdminDashboard.js
│   ├── api/
│   │   └── apiClient.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── .env
├── tailwind.config.js
└── postcss.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to Backend folder
```bash
cd Backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`)
```bash
cp .env.example .env
```

4. Update `.env` with your values:
```
MONGODB_URI=mongodb://localhost:27017/tuition_classes
PORT=5000
ADMIN_SECRET_TOKEN=your_secure_admin_token_here
NODE_ENV=development
```

5. Start MongoDB (if running locally)
```bash
mongod
```

6. Start the backend server
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Open another terminal and navigate to Frontend folder
```bash
cd Frontend
```

2. Install dependencies
```bash
npm install
```

3. Update `.env` if needed (default API URL is `http://localhost:5000/api`)

4. Start the development server
```bash
npm start
```

Frontend will open at `http://localhost:3000`

## API Endpoints

### Public Endpoints

**Get All Classes**
- `GET /api/classes/all`

**Submit Contact Form**
- `POST /api/contact/submit`
- Body: `{ name, email, phoneNumber, interestedClasses[], message }`

**Get Admin Info**
- `GET /api/admin/info`

### Admin-Only Endpoints (Require `x-admin-token` header)

**Classes Management**
- `POST /api/classes/create` - Create new class
- `PUT /api/classes/update/:id` - Update class
- `DELETE /api/classes/delete/:id` - Delete class

**Submissions Management**
- `GET /api/contact/submissions` - Get all submissions
- `PUT /api/contact/submissions/:id/read` - Mark submission as read
- `DELETE /api/contact/submissions/:id` - Delete submission

**Admin Settings**
- `PUT /api/admin/info/update` - Update phone, email, experience, etc.

## Admin Login

1. Click the ⚙️ button in the bottom-right corner of the website
2. Enter your admin token (from `.env` file)
3. Access the admin dashboard with three tabs:
   - **Settings** - Update your contact info and profile
   - **Manage Classes** - Add, edit, delete classes
   - **Submissions** - View and manage student inquiries

## Database Models

### ClassDetail
- className (enum)
- subjectType (Hindi/Tamil)
- level (L1/L2)
- monthlyFee (₹500-1000)
- description (optional)
- isActive (default: true)
- timestamps

### ContactSubmission
- name
- email
- phoneNumber
- interestedClasses (array)
- message (optional)
- isRead (default: false)
- timestamps

### AdminInfo
- phoneNumber (unique)
- emailAddress (unique)
- yearsOfExperience (default: 15)
- aboutText
- qualifications (array)
- isPublished (default: true)
- timestamps

## Technology Stack

### Backend
- **Express.js** - REST API framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Router** - Navigation

## Features Detailed

### User Features
- **Class Browsing**: View all available classes with filtering by subject
- **Contact Form**: Submit inquiries with class preferences
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Admin Features
- **Secure Login**: Token-based authentication
- **Class Management**: Full CRUD operations for classes
- **Student Inquiries**: View, mark as read, and delete submissions
- **Profile Management**: Update contact information displayed on public site

## Security

- Admin token stored in `.env` (not exposed to frontend source)
- Token validation on all admin endpoints
- RBAC implementation to distinguish admin and user roles
- CORS properly configured
- No user sessions needed (stateless design)

## Customization

### Change Admin Token
Edit `.env` file:
```
ADMIN_SECRET_TOKEN=your_new_secure_token
```

### Add/Modify Classes
Use the admin dashboard's "Manage Classes" tab

### Update Contact Information
Use the admin dashboard's "Settings" tab to update phone, email, and other details

## Deployment

### Backend (Heroku/Railway/Render)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify/GitHub Pages)
1. Build: `npm run build`
2. Deploy the `build` folder
3. Update API URL in `.env` for production

## License

This project is created for personal use and commercial purposes.

## Support

For issues or questions, please contact through the website inquiry form.
