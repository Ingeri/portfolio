# 🚀 Supabase + Prisma Admin Panel - Quick Start

## What's New? 

Your admin panel has been upgraded with enterprise-grade features:

✅ **Database Backend** - PostgreSQL via Supabase  
✅ **Secure Authentication** - Bcrypt password hashing, email + password login  
✅ **Rating System** - 5-star ratings for projects and blog articles  
✅ **Type-Safe ORM** - Prisma for database operations  
✅ **Multi-Admin Support** - Create multiple admin accounts  

---

## Setup Instructions

### 1️⃣ Create a Supabase Project

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings → Database → Connection string** (Node.js)
4. Copy the connection string

### 2️⃣ Configure Environment Variables

Create `.env.local` in your project root:

```bash
# Copy from Supabase
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres"

# Your first admin account
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="securepassword123"
```

Replace `YOUR_PASSWORD` and `YOUR_PROJECT_ID` with actual values from Supabase.

### 3️⃣ Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Create database tables
npm run db:push

# Populate with sample data
npm run db:seed
```

### 4️⃣ Start Development Server

```bash
npm run dev
```

### 5️⃣ Login to Admin Panel

Visit: **http://localhost:3000/admin**

**Email:** `admin@example.com` (from your `.env.local`)  
**Password:** `securepassword123` (from your `.env.local`)

---

## Admin Panel Features

### Dashboard Tabs

#### 📊 Projects Tab
- ✅ Add new projects
- ✏️ Edit projects
- 🗑️ Delete projects
- ⭐ View average ratings
- 👁️ See rating count

#### 📝 Blog Articles Tab
- ✅ Add new articles
- ✏️ Edit articles
- 🗑️ Delete articles
- ⭐ View ratings
- 📊 Track user feedback

### Project Fields
- **Name** - Project title
- **Role** - Your role (e.g., "Lead Developer")
- **Summary** - Project description
- **Technologies** - Tech stack

### Article Fields
- **Title** - Article heading
- **Excerpt** - Short summary
- **Date** - Publication date
- **Category** - Topic (e.g., "Frontend", "Backend")
- **Read Time** - Estimated time (e.g., "8 min read")

---

## Rating System

### For Website Visitors

Visitors can rate your projects and blog articles:

1. Click **"Rate"** button on any project or article
2. Select 1-5 stars
3. Enter their name
4. Add optional comment
5. Submit rating

### For Admin

View all ratings in the admin dashboard:
- See average ratings
- View individual comments
- Delete inappropriate ratings
- Track engagement metrics

---

## API Endpoints

### Authentication
```
POST /api/admin/auth
Body: { email, password }
Returns: { id, email, authenticated }
```

### Create Admin Account
```
POST /api/admin/setup
Body: { email, password }
Returns: { id, email, message }
```

### Projects
```
GET    /api/admin/projects
POST   /api/admin/projects
PUT    /api/admin/projects
DELETE /api/admin/projects?id=ID
```

### Blog Articles
```
GET    /api/admin/blog
POST   /api/admin/blog
PUT    /api/admin/blog
DELETE /api/admin/blog?id=ID
```

### Ratings
```
GET    /api/admin/ratings?projectId=ID or articleId=ID
POST   /api/admin/ratings
DELETE /api/admin/ratings?id=ID
```

---

## Create Additional Admin Accounts

### Option 1: Using API

```bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{"email": "newadmin@example.com", "password": "secure_password"}'
```

### Option 2: Using Database

The `prisma/seed.ts` script shows how to create admins programmatically.

---

## Database Structure

```
AdminUser (Admin accounts)
├─ id
├─ email (unique)
├─ password (hashed)
└─ timestamps

Project (Your projects)
├─ id
├─ name
├─ role
├─ summary
├─ tech
└─ ratings (1-to-many)

BlogArticle (Your articles)
├─ id
├─ title
├─ excerpt
├─ content
├─ date
├─ category
├─ readTime
└─ ratings (1-to-many)

Rating (User ratings)
├─ id
├─ score (1-5)
├─ userName
├─ userEmail
├─ comment
├─ projectId or articleId
└─ timestamps
```

---

## Useful Commands

```bash
# View database in UI
npm run db:studio

# Regenerate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Seed database with sample data
npm run db:seed

# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

---

## 🔐 Security Tips

⚠️ **DO:**
- ✅ Change default admin password immediately
- ✅ Use strong, unique passwords
- ✅ Keep `.env.local` in `.gitignore`
- ✅ Enable RLS in Supabase for production
- ✅ Implement 2FA for admin accounts

⚠️ **DON'T:**
- ❌ Commit `.env.local` to git
- ❌ Share database credentials
- ❌ Use simple passwords
- ❌ Enable public access to admin APIs

---

## Troubleshooting

### "DATABASE_URL not found"
Check your `.env.local` file has the correct variable name.

### "Connection refused"
Verify Supabase project is active and connection string is correct.

### "Relation does not exist"
Run `npm run db:push` to create missing tables.

### "Invalid email or password"
Check your credentials in `.env.local` and try again. Remember: Email is now required!

### "bcryptjs module not found"
Run `npm install` to reinstall dependencies.

---

## Next Steps

1. 📱 Integrate RatingWidget into projects/blog pages
2. 📊 Add analytics dashboard for ratings
3. 🎯 Implement comment moderation workflow
4. 📧 Add email notifications for new ratings
5. 🔒 Enable Row Level Security (RLS) in Supabase
6. 💾 Set up automatic backups

---

## Need Help?

See `SETUP_DATABASE.md` for detailed configuration guide.

Reference the included documentation for:
- Full API documentation
- Database schema details
- Component structure
- Security best practices

Happy building! 🎉
