# DASGUPTA MAITI & ASSOCIATES - CA Consultancy Platform

<div align="center">
  <img src="frontend/public/cawebsite_logo.png" alt="DMA Logo" width="200"/>
  <br/>

  [![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)
  [![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)](https://reactjs.org)
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
  [![Live Demo](https://img.shields.io/badge/Demo-Live_Site-FF5722?style=for-the-badge&logo=googlechrome)](https://dasguptamaitiassociates.com/)
  ![Project Type](https://img.shields.io/badge/Project%20Type-Commercial-blueviolet?style=for-the-badge)
</div>

---

## 🚀 Executive Summary
**Dasgupta Maiti & Associates (DMA)** is a high-performance, full-stack commercial web platform engineered to digitize the operations of a premier Chartered Accountancy firm.

This project delivers a **comprehensive digital office** featuring a custom-built Content Management System (CMS), secure role-based authentication, and an automated deployment pipeline. It serves as the central hub for client interactions, financial auditing services, and firm-wide resource management.

> **Key Achievement**: Implemented a scalable "Search-First" architecture ensuring 100% discoverability of financial regulations and firm services.

---

## 🏗️ System Architecture
The application follows a modern **Service-Oriented Architecture (SOA)**, separating concerns between a responsive frontend and a robust API-first backend.

```mermaid
graph TD
    User((User/Client))
    Admin((Firm Admin))
    
    subgraph Frontend [React.js Client]
        UI[Responsive UI]
        Router[React Router]
        State[Axios / Context API]
    end
    
    subgraph Backend [Node.js & Express API]
        Auth[Auth Middleware (JWT)]
        Controllers[Business Logic]
        Services[Email & File Services]
    end
    
    subgraph Data_Layer [Persistence & Storage]
        MongoDB[(MongoDB Atlas)]
        Cloudinary[Cloudinary Media]
    end

    User -->|HTTPS| UI
    Admin -->|Secure Login| UI
    UI -->|JSON API| Auth
    Auth -->|Validated Request| Controllers
    Controllers -->|CRUD| MongoDB
    Controllers -->|Aggregations| MongoDB
    Services -->|Uploads| Cloudinary
```

---

## ✨ Engineering Highlights

### 1. 🛡️ Enterprise-Grade Security
*   **RBAC (Role-Based Access Control)**: Custom middleware ensures only authorized partners can access sensitive admin panels.
*   **JWT Authentication**: Stateless authentication with `bcrypt` encryption for password hashing.
*   **Secure Headers**: Implemented `cors` and best-practice security headers to prevent XSS and injection attacks.

### 2. ⚡ Automated Deployment Pipeline
Designed a custom **DevOps script** (`deploy_prep.sh`) to streamline the build and deployment process:
*   **One-Click Build**: Automatically builds the React frontend and bundles it with the Node.js backend.
*   **Artifact Optimization**: Excludes dev-dependencies and generates a clean `project_deploy.zip` ready for cPanel deployment.

### 3. 🔍 Advanced SEO & Discovery
*   **Dynamic Metadata**: Utilized `react-helmet-async` to inject dynamic meta-tags for every service and news article.
*   **Unified Search Engine**: Integrated a multi-collection search utility for Services and Publications.
*   **Automated Sitemaps**: Dynamic XML generation for search engine crawlers.

### 4. 📧 Resilient Communication Infrastructure
*   **Nodemailer Integration**: Implemented a reliable email delivery system for contact forms and user interactions.
*   **Input Validation**: Integrated `express-validator` to ensure data integrity for all form submissions.

---

## 📸 Application Gallery
| **Production Home** | **Expert Insights** |
|:---:|:---:|
| <img src="frontend/public/home_bg_new.png" width="400" alt="Home Hero"/> | <img src="frontend/public/newsroom.jpg" width="400" alt="Newsroom"/> |
| *Unified Commercial Platform* | *Real-time Regulatory Updates* |

---

## 🛠️ Technical Stack
| Component | Technology | Role |
|-----------|------------|-------------|
| **Frontend** | **React.js 18** | Functional architecture with Hooks for state management. |
| **Styling** | **React Bootstrap** | Responsive design with custom glassmorphism components. |
| **Backend** | **Node.js + Express** | Scalable RESTful API with automated static serving. |
| **Database** | **MongoDB (Mongoose)** | Complex NoSQL schemas with Slug-based routing. |
| **File Systems** | **Cloudinary + Multer** | Cloud-based media management. |
| **Emailing** | **Nodemailer** | Transactional email delivery system. |

---

## 📂 Project Structure
```bash
├── backend/            # Express.js Server
│   ├── models/         # Database Schemas
│   ├── middleware/     # Auth & Error Handlers
│   ├── routes/         # API Endpoints
│   └── utils/          # Reusable Helpers
├── frontend/           # React.js Application
│   ├── public/         # Static Assets
│   └── src/
│       ├── pages/      # Page Views
│       └── components/ # UI Components
├── deploy_prep.sh      # ⚡ Custom Build Script
└── README.md           # Documentation
```

---

## 🔧 Setup & Installation
**Prerequisites:** Node.js v16+, MongoDB URI.

1.  **Install Dependencies**
    ```bash
    npm install              # Backend dependencies
    cd frontend && npm install # Frontend dependencies
    ```

2.  **Environment Setup**
    Create a `.env` file in the root with:
    - `MONGO_URI`
    - `JWT_SECRET`
    - `CLOUDINARY_URL`
    - `EMAIL_USER` / `EMAIL_PASS`

3.  **Run Development Server**
    ```bash
    # Runs both React & Node simultaneously
    npm run dev
    ```

---

## 📬 Contact
For inquiries or support regarding this platform, please contact the development team.
