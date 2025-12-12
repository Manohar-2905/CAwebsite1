# CA Consultancy Website - Full MERN Stack

A comprehensive MERN stack website for a Chartered Accountant consultancy firm with admin dashboard, dynamic content management, and SEO optimization.

## Features

- ✅ **Frontend (React)**
  - Home, About, Services, Publications, Contact pages
  - Dynamic service and publication pages
  - Global search functionality
  - Print/Download PDF for services and publications
  - Admin login and dashboard
  - Responsive Bootstrap design

- ✅ **Backend (Node.js + Express)**
  - RESTful API with MongoDB
  - JWT authentication for admin
  - Cloudinary integration for file uploads
  - EmailJS and WhatsApp integration
  - Global search endpoint
  - Dynamic sitemap generation

- ✅ **Admin Dashboard**
  - Services CRUD operations
  - Publications CRUD operations
  - Homepage downloadable files management
  - Image and PDF uploads via Cloudinary

- ✅ **SEO Features**
  - React Helmet for meta tags
  - JSON-LD structured data
  - Dynamic sitemap.xml
  - robots.txt
  - OpenGraph tags

## Project Structure

```
CA website/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── utils/           # Utilities (Cloudinary, PDF importer)
│   ├── scripts/         # Import scripts
│   └── server.js        # Express server
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utilities
│   │   └── config/      # Configuration
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- EmailJS account (optional)
- WhatsApp API credentials (optional)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
WHATSAPP_API_URL=your_whatsapp_api_url
WHATSAPP_API_TOKEN=your_whatsapp_api_token
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
ADMIN_EMAIL=admin@example.com
BASE_URL=https://yourdomain.com
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
REACT_APP_ADMIN_EMAIL=admin@example.com
REACT_APP_BASE_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm start
```

### Initial Admin Setup

1. Register the first admin (run once):
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "your_secure_password"
  }'
```

Or use Postman/Thunder Client to make the request.

### Import Services from PDF

1. Place your PDF file in the backend directory
2. Install pdf-parse (if not already installed):
```bash
cd backend
npm install pdf-parse
```

3. Run the import script:
```bash
node scripts/importServices.js path/to/your/services.pdf
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin (first time only)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin (protected)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get single service
- `POST /api/services` - Create service (protected)
- `PUT /api/services/:id` - Update service (protected)
- `DELETE /api/services/:id` - Delete service (protected)

### Publications
- `GET /api/publications` - Get all publications
- `GET /api/publications/:slug` - Get single publication
- `POST /api/publications` - Create publication (protected)
- `PUT /api/publications/:id` - Update publication (protected)
- `DELETE /api/publications/:id` - Delete publication (protected)

### Homepage Files
- `GET /api/homepage-files` - Get all files
- `POST /api/homepage-files` - Upload file (protected)
- `DELETE /api/homepage-files/:id` - Delete file (protected)

### Contact
- `POST /api/contact/send-email` - Send email via EmailJS
- `POST /api/contact/send-whatsapp` - Send WhatsApp message

### Search
- `GET /api/search?q=keyword` - Search services and publications

### SEO
- `GET /sitemap.xml` - Dynamic sitemap

## Deployment

### Frontend (Vercel/Netlify)

1. **Vercel:**
   - Push code to GitHub
   - Import project in Vercel
   - Set environment variables
   - Deploy

2. **Netlify:**
   - Push code to GitHub
   - Connect repository in Netlify
   - Build command: `npm run build`
   - Publish directory: `build`
   - Set environment variables
   - Deploy

### Backend (Render/Railway)

1. **Render:**
   - Create new Web Service
   - Connect GitHub repository
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Set environment variables
   - Deploy

2. **Railway:**
   - Create new project
   - Deploy from GitHub
   - Root directory: `backend`
   - Set environment variables
   - Deploy

### MongoDB Atlas

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Update `MONGODB_URI` in backend `.env`

### Environment Variables for Production

**Backend (.env):**
- Update `BASE_URL` with your production domain
- Update `MONGODB_URI` with Atlas connection string
- Set all Cloudinary credentials
- Set EmailJS and WhatsApp credentials

**Frontend (.env):**
- Update `REACT_APP_API_URL` with your backend URL
- Update `REACT_APP_BASE_URL` with your frontend URL
- Set EmailJS credentials

## Technologies Used

- **Frontend:** React, React Router, Bootstrap, React Helmet, jsPDF, html2canvas
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary, Multer
- **Deployment:** Vercel/Netlify (Frontend), Render/Railway (Backend), MongoDB Atlas

## License

This project is proprietary and confidential.
