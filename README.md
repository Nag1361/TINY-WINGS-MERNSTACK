# 🎉 Tiny Wings - Complete MERN Stack Project Documentation

## 📋 Overview

Tiny Wings is a comprehensive baby growth, parenting, healthcare, and shopping platform built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Project Structure

```
tiny-wings-mern/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable Components
│   │   ├── pages/         # Page Components
│   │   ├── context/       # Auth Context
│   │   ├── services/      # API Services
│   │   ├── routes/        # Route Definitions
│   │   ├── App.jsx        # Main App Component
│   │   ├── main.jsx       # Entry Point
│   │   └── App.css        # Global Styles
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js/Express Backend
│   ├── config/            # Database & Cloudinary Config
│   ├── models/            # Mongoose Models
│   ├── controllers/       # Business Logic
│   ├── middleware/        # Auth & Error Middleware
│   ├── routes/            # API Routes
│   ├── utils/             # Utility Functions
│   ├── server.js          # Main Server File
│   ├── package.json
│   └── .env.example
└── docs/                  # Documentation

```

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI Library
- **Vite** - Build Tool
- **React Router DOM 6** - Client-side Routing
- **Axios** - HTTP Client
- **React Icons** - Icon Library
- **Chart.js** - Data Visualization
- **CSS3** - Styling with Gradients & Animations

### Backend
- **Node.js** - Runtime
- **Express.js 4** - Web Framework
- **MongoDB Atlas** - Cloud Database
- **Mongoose 8** - ODM
- **JWT** - Authentication
- **BcryptJS** - Password Hashing
- **Multer** - File Upload
- **Cloudinary** - Image Storage
- **CORS** - Cross-Origin Resource Sharing

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas Account
- Cloudinary Account
- Git

### Backend Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd tiny-wings-mern/server
```

2. **Install Dependencies**
```bash
npm install
```

3. **Create .env File**
```bash
cp .env.example .env
```

4. **Configure Environment Variables**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tiny-wings
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

5. **Start Development Server**
```bash
npm run dev
```

### Frontend Setup

1. **Navigate to Client Directory**
```bash
cd ../client
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Build for Production**
```bash
npm run build
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updateprofile` - Update profile

### Users (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `DELETE /api/users/:id` - Delete user
- `PUT /api/users/:id/role` - Update user role

### Children
- `POST /api/children` - Create child profile
- `GET /api/children` - Get user's children
- `GET /api/children/:id` - Get child by ID
- `PUT /api/children/:id` - Update child profile
- `DELETE /api/children/:id` - Delete child profile

### Growth Tracking
- `POST /api/growth/:childId` - Add growth record
- `GET /api/growth/:childId` - Get growth records
- `PUT /api/growth/:recordId` - Update growth record
- `DELETE /api/growth/:recordId` - Delete growth record

### Articles
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get article by ID
- `POST /api/articles` - Create article (Admin)
- `PUT /api/articles/:id` - Update article (Admin)
- `DELETE /api/articles/:id` - Delete article (Admin)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/review` - Add product review

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order (Admin)
- `GET /api/orders/admin/all` - Get all orders (Admin)

### Community
- `POST /api/community/posts` - Create post
- `GET /api/community/posts` - Get all posts
- `POST /api/community/posts/:id/like` - Like post
- `POST /api/community/posts/:id/comment` - Add comment
- `DELETE /api/community/posts/:id` - Delete post

### Notifications
- `POST /api/notifications/contact` - Create contact message
- `GET /api/notifications/contact` - Get contacts (Admin)
- `PUT /api/notifications/contact/:id` - Update contact status
- `POST /api/notifications` - Create notification (Admin)
- `GET /api/notifications` - Get user's notifications
- `PUT /api/notifications/:id` - Mark notification as read

## 🔐 Authentication

### JWT Implementation
- Tokens are generated on login/register
- Tokens are stored in localStorage on client
- Tokens are sent in Authorization header for protected routes
- Token expiry: 7 days

### Protected Routes
- User must be logged in to access protected routes
- Admin routes require admin role

## 🗄️ Database Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  role: String (enum: ['user', 'admin']),
  profilePicture: { url: String, publicId: String },
  children: [ObjectId],
  isActive: Boolean,
  timestamps
}
```

### Child Schema
```javascript
{
  childName: String (required),
  gender: String (enum: ['Male', 'Female', 'Other']),
  dateOfBirth: Date (required),
  height: Number,
  weight: Number,
  bloodGroup: String,
  skinTone: String,
  photo: { url: String, publicId: String },
  parentId: ObjectId (required),
  growthRecords: [ObjectId],
  timestamps
}
```

### GrowthRecord Schema
```javascript
{
  childId: ObjectId (required),
  height: Number (required),
  weight: Number (required),
  recordDate: Date,
  notes: String,
  timestamps
}
```

### Article Schema
```javascript
{
  title: String (required),
  description: String (required),
  content: String (required),
  category: String (enum: ['Healthcare', 'Parenting', 'Nutrition', 'Development', 'Safety']),
  author: ObjectId (required),
  image: { url: String, publicId: String },
  isPublished: Boolean,
  views: Number,
  timestamps
}
```

### Product Schema
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (enum: ['Baby Care', 'Clothing', 'Footwear', 'Toys', 'Feeding', 'Diapers', 'Healthcare', 'Books', 'Accessories']),
  image: { url: String, publicId: String },
  stock: Number (required),
  rating: Number,
  reviews: Array,
  featured: Boolean,
  timestamps
}
```

## 🎨 UI/UX Features

### Components
- **Navbar** - Responsive navigation with mobile menu
- **Footer** - Links and social media
- **HeroSection** - Full-width banner with CTA
- **ArticleCard** - Article display card
- **ProductCard** - Product display with rating
- **Loader** - Loading spinner
- **ProtectedRoute** - Route protection wrapper

### Design Features
- **Gradient Background** - Purple gradient (#667eea to #764ba2)
- **Responsive Grid** - Auto-fit layout
- **Smooth Animations** - Fade in, slide up, hover effects
- **Mobile Responsive** - Works on all devices
- **Dark Mode Ready** - Base styling supports dark mode
- **Accessibility** - Semantic HTML, proper ARIA labels

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create account at mongodb.com
2. Create new cluster
3. Add database user with password
4. Get connection string
5. Update MONGODB_URI in .env

### Cloudinary Setup
1. Create account at cloudinary.com
2. Copy Cloud Name, API Key, API Secret
3. Update these in .env file

### Backend Deployment (Render)

1. **Push Code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Create Render Account**
   - Visit render.com
   - Sign up with GitHub

3. **Deploy Backend**
   - Click "New +" > "Web Service"
   - Connect your GitHub repository
   - Select server directory
   - Set environment variables from .env
   - Deploy

4. **Environment Variables on Render**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=production
   ```

### Frontend Deployment (Vercel)

1. **Build Project**
```bash
npm run build
```

2. **Create Vercel Account**
   - Visit vercel.com
   - Sign up with GitHub

3. **Deploy Frontend**
   - Click "New Project"
   - Import GitHub repository
   - Select client directory
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend.onrender.com
     ```
   - Deploy

4. **Update API Base URL**
   - In `client/src/services/api.js`
   - Change `API_URL` to your Render backend URL

## 📦 Environment Variables Checklist

### Backend (.env)
- [ ] PORT
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] CLOUDINARY_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] NODE_ENV

### Frontend (.env.local) - Optional
- [ ] VITE_API_URL (if using environment-specific URLs)

## 🔧 Development Tips

### Adding New Features

1. **Create Backend Route**
   - Create controller function
   - Create route in routes folder
   - Import and use in server.js

2. **Create Frontend Page**
   - Create component in pages folder
   - Add route in AppRoutes.jsx
   - Create API service method

3. **Style Components**
   - Use global styles from App.css
   - Create component-specific CSS files
   - Follow BEM naming convention

### Common Commands

```bash
# Backend
npm run dev           # Start development server
npm start            # Start production server
npm install          # Install dependencies

# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm install          # Install dependencies
```

## 🐛 Troubleshooting

### CORS Issues
- Update CORS origins in server.js
- Add frontend URL to allowed origins

### Cloudinary Upload Issues
- Verify API keys in .env
- Check folder permissions
- Ensure image format is supported

### MongoDB Connection Issues
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Token Not Working
- Clear localStorage
- Check token expiry
- Verify JWT_SECRET matches

## 📱 Feature Checklist

### Authentication ✅
- [x] User Registration
- [x] User Login
- [x] JWT Token Generation
- [x] Protected Routes
- [x] Profile Update

### Child Management ✅
- [x] Add Child Profile
- [x] Edit Child Profile
- [x] View Child Details
- [x] Delete Child Profile
- [x] Multiple Children Support

### Growth Tracking ✅
- [x] Add Growth Record
- [x] View Growth History
- [x] Update Growth Record
- [x] Delete Growth Record
- [x] Growth Charts (Ready for implementation)

### Articles ✅
- [x] View Articles
- [x] Filter by Category
- [x] Search Articles
- [x] Create Articles (Admin)
- [x] Edit Articles (Admin)
- [x] Delete Articles (Admin)

### Products ✅
- [x] View Products
- [x] Filter by Category
- [x] Search Products
- [x] Add to Cart (Ready)
- [x] Product Reviews
- [x] Add Products (Admin)
- [x] Edit Products (Admin)
- [x] Delete Products (Admin)

### Community ✅
- [x] Create Posts
- [x] View Posts
- [x] Like Posts
- [x] Comment on Posts
- [x] Delete Own Posts

### Notifications ✅
- [x] Contact Form
- [x] Send Notifications (Admin)
- [x] View Notifications
- [x] Mark as Read

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Commit with clear messages
4. Push to GitHub
5. Create Pull Request

## 📄 License

MIT License - Feel free to use this project

## 📞 Support

For support, contact: support@tinywings.com

---

**Happy Coding! 🚀**
Built with ❤️ for baby care
>>>>>>> 17c7cc0 (initial commit)
