# Frontend React Application

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BASE_URL=http://localhost:3000
```

**For Production:**
```env
REACT_APP_API_URL=https://back.dasguptamaitiassociates.com/api
REACT_APP_BASE_URL=https://dasguptamaitiassociates.com
```

3. Start development server:
```bash
npm start
```

## Features

- **Pages:** Home, About, Services, Publications, Contact, Admin
- **Components:** Navbar with search, Footer
- **Features:** Print to PDF, Search, Contact form with Nodemailer/WhatsApp
- **SEO:** React Helmet, JSON-LD, Meta tags

## Build for Production

```bash
npm run build
```

Output will be in `build/` directory.
