# Organization Announcements Platform - Backend

Backend API for the Organization Announcements Platform built with Express.js, MongoDB, and Socket.IO.

## Features

- JWT-based authentication
- Role-based access control (Admin/User)
- Real-time announcements via Socket.IO
- Rich text announcement support
- Targeted and broadcast announcements
- Rate limiting (prevents brute force attacks)
- Activity logging for audit trail

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ikshantshukla123/Assignment.git
cd Assignment/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and update the values:

- **MONGO_URI**: Your MongoDB connection string
- **JWT_SECRET**: A strong random string for JWT signing
- **CORS_ORIGIN**: Frontend URL(s) - comma-separated for multiple origins

**Example for local development:**
```env
CORS_ORIGIN=http://localhost:3000
```

**Example for production:**
```env
CORS_ORIGIN=https://assignment-green-nine.vercel.app,http://localhost:3000
```

### 4. Run the server

**Development:**
```bash
npm start
```

**Production:**
```bash
NODE_ENV=production npm start
```

The server will run on `http://localhost:4000` by default.

### 5. Initial Admin Account

On first run, an admin account will be created automatically using:
- Username: from `INIT_ADMIN_USERNAME` (default: admin)
- Password: from `INIT_ADMIN_PASSWORD` (default: Admin@123)

** Change these credentials after first login!**

## API Endpoints

### Authentication
- `POST /auth/login` - Login with username and password

### Admins (Admin only)
- `GET /admins` - Get all admins
- `POST /admins` - Create new admin
- `PUT /admins/:id` - Update admin
- `DELETE /admins/:id` - Delete admin

### Users (Admin only)
- `GET /users` - Get all users
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Announcements
- `GET /announcements` - Get announcements (filtered by user)
- `POST /announcements` - Create announcement (Admin only)

## Tech Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Deployment

Configured for deployment on Render.com. Make sure to set all environment variables in your deployment platform.
