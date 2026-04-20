# Ingeri Portfolio Website

A personal web portfolio built with Next.js, React, and Tailwind CSS. This site showcases Ingeri's skills, projects, and contact information with a clean responsive design, plus an enterprise-grade admin panel for managing content and ratings.

## ✨ Features

### Frontend
- 🎨 Modern portfolio landing page
- 📱 Responsive navigation bar with mobile menu
- 🎯 Clean hero section with call-to-action
- 🔗 Footer with site links and social sections
- 🌍 Multi-language support (5 languages)
- 🎭 Dark/light theme toggle
- ⚡ Built for performance and maintainability

### Admin Panel
- 🔐 Secure email + password authentication
- 📊 Dashboard for managing projects and blog articles
- ⭐ 5-star rating system with user feedback
- 💾 PostgreSQL database backend (Supabase)
- 🏗️ Type-safe ORM (Prisma)
- 👥 Multi-admin account support
- 🔒 Bcrypt password hashing

## 📚 Documentation

- **[ADMIN_QUICK_START.md](ADMIN_QUICK_START.md)** - Get started in 5 minutes
- **[SETUP_DATABASE.md](SETUP_DATABASE.md)** - Detailed Supabase configuration
- **[INTEGRATE_RATINGS.md](INTEGRATE_RATINGS.md)** - Add ratings to your pages
- **[ADMIN_SYSTEM_GUIDE.md](ADMIN_SYSTEM_GUIDE.md)** - Complete technical overview

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Setup (5 minutes)

```bash
# 1. Clone and install
npm install

# 2. Configure environment
# Create .env.local with Supabase connection string
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Initialize database
npm run db:generate
npm run db:push
npm run db:seed

# 4. Start development server
npm run dev

# 5. Visit http://localhost:3000/admin
# Login with credentials from .env.local
```

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, TypeScript
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Security:** Bcryptjs for password hashing
- **Development:** ESLint, TypeScript

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── admin/              # Admin panel
│   │   ├── api/admin/          # Admin API endpoints
│   │   ├── projects/           # Projects page
│   │   ├── blog/               # Blog page
│   │   └── ...
│   ├── components/
│   │   ├── AdminDashboard.tsx  # Admin UI
│   │   ├── RatingWidget.tsx    # Rating system
│   │   └── ...
│   ├── context/
│   │   ├── AdminContext.tsx    # Auth management
│   │   └── LanguageContext.tsx # Language support
│   └── lib/
│       ├── prisma.ts          # Database client
│       └── auth.ts            # Auth utilities
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Data seeding
└── docs/
    ├── ADMIN_QUICK_START.md
    ├── SETUP_DATABASE.md
    └── ...
```

## 🔑 Admin Panel Features

### Content Management
- ➕ Create, read, update, delete projects
- ➕ Create, read, update, delete blog articles
- 📝 Rich metadata for each item (role, category, tech stack, etc.)

### Rating System
- ⭐ Visitors can submit 5-star ratings
- 💬 Optional comments on ratings
- 📊 Automatic average calculation
- 🗑️ Admin moderation capabilities
- 👥 User name tracking

### Security
- 🔐 Email + password authentication
- 🔒 Bcrypt password hashing
- 👤 Multi-admin support
- 📋 Session management

## 🗄️ Database Schema

- **AdminUser** - Admin accounts and credentials
- **Project** - Portfolio projects
- **BlogArticle** - Blog posts
- **Rating** - User ratings and feedback

## 📊 API Endpoints

```
Authentication:
  POST   /api/admin/auth       - Login
  POST   /api/admin/setup      - Create admin account
  GET    /api/admin/setup      - List admins

Projects:
  GET    /api/admin/projects   - Get all
  POST   /api/admin/projects   - Create
  PUT    /api/admin/projects   - Update
  DELETE /api/admin/projects   - Delete

Blog:
  GET    /api/admin/blog       - Get all
  POST   /api/admin/blog       - Create
  PUT    /api/admin/blog       - Update
  DELETE /api/admin/blog       - Delete

Ratings:
  GET    /api/admin/ratings    - Get ratings
  POST   /api/admin/ratings    - Submit rating
  DELETE /api/admin/ratings    - Delete rating
```

## 🛠️ Available Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint

# Database management
npm run db:generate      # Generate Prisma client
npm run db:push          # Sync schema to database
npm run db:seed          # Populate with sample data
npm run db:studio        # Open visual database editor
```

## 🔐 Security

- ✅ Passwords hashed with bcryptjs
- ✅ Environment variables for sensitive data
- ✅ Ready for Row Level Security (RLS)
- ✅ No hardcoded credentials
- ⚠️ Remember to change default passwords before production

## 📱 Responsive Design

The site is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🌓 Theme Support

- 🌞 Light mode
- 🌙 Dark mode
- 🎨 Automatic based on system preferences

## 🌍 Multi-Language Support

Currently supports:
- 🇺🇸 English
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇩🇪 German
- 🇯🇵 Japanese

Language preference is saved to localStorage.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Add environment variables in Vercel dashboard
```

### Other Platforms
Ensure these environment variables are set:
- `DATABASE_URL` - Supabase PostgreSQL connection string
- `ADMIN_EMAIL` - Default admin email
- `ADMIN_PASSWORD` - Default admin password (change in DB after first login)

## 🐛 Troubleshooting

### Database connection issues
- Verify `DATABASE_URL` in `.env.local`
- Check Supabase project is active
- Run `npm run db:push` again

### Admin login fails
- Check email and password in `.env.local`
- Verify database was seeded with `npm run db:seed`
- Clear browser localStorage and try again

### Rating widget not appearing
- Ensure data includes rating fields
- Check API response format
- Verify component is imported correctly

See [ADMIN_SYSTEM_GUIDE.md](ADMIN_SYSTEM_GUIDE.md) for more troubleshooting.

## 📝 License

Private project - Ingeri's Portfolio

## 📞 Support

For setup questions, see the documentation files:
- Getting started: ADMIN_QUICK_START.md
- Database setup: SETUP_DATABASE.md
- Rating integration: INTEGRATE_RATINGS.md
- Full guide: ADMIN_SYSTEM_GUIDE.md

## Project Structure

- `src/app/page.tsx` — main homepage content
- `src/components/Navbar.tsx` — responsive navigation bar
- `src/components/Footer.tsx` — footer with navigation and social links
- `src/app/globals.css` — global styling

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the site.

## Build and Production

Build the app for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Customize

- Update the homepage text in `src/app/page.tsx`
- Adjust navigation links in `src/components/Navbar.tsx`
- Modify footer content in `src/components/Footer.tsx`
- Add new sections or project showcases directly in the app folder

## Deployment

This project is ready to deploy on platforms like Vercel, Netlify, or any platform that supports Next.js.

## License

This repository is private and intended for personal portfolio use.
