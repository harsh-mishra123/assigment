# **Organization Announcements Platform**

A full-stack web application for managing organizational announcements with real-time updates, role-based access control, and rich text formatting support.

## Live Demo



---

## Features

- **Real-time Announcements**: Instant updates using Socket.IO
- **Rich Text Editor**: Format announcements with bold, italic, underline, and lists
- **Targeted Messaging**: Send announcements to specific users or broadcast to all
- **Role-Based Access**: Separate views and permissions for admins and users
- **User Management**: Admins can create, update, and delete users and other admins
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Rate Limiting**: Prevents brute force attacks (5 login attempts per 15 minutes)
- **Activity Logging**: Complete audit trail of all admin actions
- **Frontend Route Protection**: Next.js middleware for secure routing
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui

---

## Tech Stack

### Backend
- Node.js  
- Express  
- MongoDB with Mongoose  
- JWT (jsonwebtoken)  
- bcrypt  
- Socket.IO  
- express-rate-limit  

### Frontend
- Next.js (App Router)  
- Tailwind CSS  
- shadcn/ui  
- Socket.IO client  

---

## Project Structure

### Backend

```
backend/
├── src/
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── sockets
│   ├── config
│   ├── services
│   ├── app.js
│   └── server.js
└── package.json
```

### Frontend

```
frontend/
├── app/
│   ├── login
│   ├── dashboard
│   │   ├── admins
│   │   └── users
│   ├── layout.js
|   ├──  page.js
│   └── globals.css
├── components
├── hooks
├── lib
├── middleware.js
└── package.json
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=admin(use your own)
ADMIN_PASSWORD=Admin@123(make your own)
NODE_ENV=development

# CORS Configuration
# For local development:
CORS_ORIGIN=http://localhost:3000

# For production (comma-separated for multiple origins):
CORS_ORIGIN=https://assigment-psi-five.vercel.app,http://localhost:3000
```

### Frontend (`frontend/.env.local`)

```env
# For local development:
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/harsh-mishra123/assigment.git
cd assigment
```

### 2. Backend setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and CORS origin

# Start development server
npm start
```

The backend server will start on `http://localhost:4000`.

**Note**: An initial admin user is automatically created on first run using credentials from .env

### 3. Frontend setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The frontend application will start on `http://localhost:3000`.

---

## Default Admin Credentials

Initial Admin Setup

The system includes one seeded admin account used to bootstrap the platform.

- Username: admin
- Password: Admin@123

This account exists only for demo/testing purposes. 
In a production deployment, the credentials should be changed immediately.

---

## Application Flow

1. User logs in and receives a JWT.  
2. JWT is stored in localStorage and cookies.  
3. Dashboard loads announcements using REST APIs.  
4. Socket.IO establishes an authenticated connection.  
5. New announcements are delivered in real time.  
6. On page refresh, announcements are restored from the database.  

---

## Security Notes

- Passwords are stored using bcrypt hashing.  
- Password fields are excluded from queries by default (`select: false`).  
- Frontend middleware is used only for route redirection.  
- All authentication and authorization checks are enforced on the backend.  

---

## Deployment

- Backend can be deployed on platforms like Render or Railway.  
- Frontend can be deployed on Vercel.  
- Environment variables must be configured on the hosting platform.  

---
### Future goals:
pagination - Activity logs limited to 100
search/filter - Could add to user/admin tables 
tests - Unit/integration tests 


### Cold Start Notice

This application is deployed using a free-tier hosting service (Render).
Due to this, the backend may go to sleep after periods of inactivity.

The first request after inactivity may take 20–60 seconds while the server wakes up.
Subsequent requests will work normally.

In a production environment, this would be resolved by using an always-on instance.

## Author

Harsh mishra
