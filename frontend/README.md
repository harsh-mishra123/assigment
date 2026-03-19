# Organization Announcements Platform - Frontend

A modern Next.js application for managing organizational announcements with real-time updates.

## Features

- Role-based dashboards (Admin/User)
- Real-time announcement updates via Socket.IO
- Rich text editor for announcements
- Targeted and broadcast announcements
- User and admin management
- Responsive design with Tailwind CSS

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ikshantshukla123/Assignment.git
cd Assignment/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and update:

**For local development:**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

**For production:**
```env
NEXT_PUBLIC_API_BASE_URL=https://organization-announcements-backend.onrender.com
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Login

Use the admin credentials set in the backend:
- **Username**: admin (or from backend `INIT_ADMIN_USERNAME`)
- **Password**: admin123 (or from backend `INIT_ADMIN_PASSWORD`)

## Project Structure

```
frontend/
├── app/
│   ├── dashboard/       # Dashboard pages
│   ├── login/          # Login page
│   └── page.js         # Landing page
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   └── ...
├── lib/                # Utilities
│   ├── api.js          # API client
│   ├── auth.js         # Auth helpers
│   └── socket.js       # Socket.IO client
└── hooks/              # Custom React hooks
```

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React** - UI library
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Socket.IO Client** - Real-time updates
- **DOMPurify** - XSS protection
- **Lucide React** - Icons

## Pages

- `/` - Landing page
- `/login` - Authentication
- `/dashboard` - Main dashboard with announcements
- `/dashboard/admins` - Admin management (Admin only)
- `/dashboard/users` - User management (Admin only)

## Deployment

Configured for deployment on Vercel. Make sure to set the `NEXT_PUBLIC_API_BASE_URL` environment variable in your deployment settings.

## Development Tips

- Make sure backend is running before starting frontend
- Check browser console for Socket.IO connection status
- Use ErrorDialog component for consistent error handling
