# Backend API Documentation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with required variables (see `.env.example`)

3. Start development server:
```bash
npm run dev
```

## API Documentation

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Models

### Service
- title (String, required)
- slug (String, required, unique)
- description (String, required)
- imageURL (String)
- seoTitle (String)
- seoDescription (String)
- keywords (Array of Strings)
- createdAt (Date)
- updatedAt (Date)

### Publication
- title (String, required)
- slug (String, required, unique)
- description (String, required)
- fileURL (String, required)
- keywords (Array of Strings)
- createdAt (Date)
- updatedAt (Date)

### HomepageFile
- title (String, required)
- description (String)
- fileURL (String, required)
- fileName (String, required)
- createdAt (Date)
- updatedAt (Date)

### Admin
- username (String, required, unique)
- email (String, required, unique)
- password (String, required, hashed)
- createdAt (Date)

## Import Services from PDF

```bash
node scripts/importServices.js path/to/services.pdf
```

This will:
1. Extract services from PDF
2. Generate slugs
3. Extract keywords
4. Import to MongoDB (skip duplicates)
