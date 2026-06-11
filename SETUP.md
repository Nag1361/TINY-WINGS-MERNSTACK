# Environment Setup Guide

## 🔑 Required Accounts & API Keys

### MongoDB Atlas
1. Visit [mongodb.com](https://www.mongodb.com)
2. Create free account
3. Create new project
4. Create cluster (choose Free Tier)
5. Create database user
6. Get connection string
7. Copy URI to MONGODB_URI in .env

```
mongodb+srv://username:password@cluster.mongodb.net/tiny-wings
```

### Cloudinary
1. Visit [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Dashboard shows:
   - Cloud Name
   - API Key
   - API Secret
4. Copy these to .env file

```
CLOUDINARY_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
```

### JWT Secret
Generate a strong random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy output to JWT_SECRET in .env

## 📝 .env File Template

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tiny-wings
JWT_SECRET=your_long_random_secret_string_here_at_least_32_chars
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Quick Start

### Start Backend
```bash
cd server
npm install
npm run dev
```

Backend runs on: `http://localhost:5000`

### Start Frontend
```bash
cd client
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## ✅ Verify Setup

### Backend Check
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Frontend Check
- Open http://localhost:5173
- Should see Tiny Wings homepage
- Navigation should work

## 🔧 Troubleshooting

### Can't connect to MongoDB
- Check internet connection
- Verify connection string
- Check MongoDB Atlas IP whitelist
- Ensure database user password is correct

### Cloudinary not working
- Verify API credentials
- Check folder permissions in Cloudinary
- Try uploading via Cloudinary dashboard first

### Port already in use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

## 📚 Additional Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
