# Supabase + Prisma Setup Guide

This guide will help you set up Supabase and Prisma for your portfolio admin panel.

## Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and sign up
2. Create a new project
3. Wait for the project to initialize (this takes a few minutes)
4. Go to **Settings > Database > Connection string**
5. Copy the URI connection string (for Node.js)
6. Keep it safe - you'll need it later

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (or edit it if it exists)
2. Add the following environment variables:

```bash
# Supabase Database URL (from Step 1)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres"

# Admin credentials (change these!)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

Replace:
- `YOUR_PASSWORD` - Your Supabase database password
- `YOUR_PROJECT_ID` - Your Supabase project ID

## Step 3: Initialize Prisma

Run the following command to generate Prisma Client:

```bash
npm run db:generate
```

## Step 4: Create Database Tables

Push your Prisma schema to Supabase:

```bash
npm run db:push
```

This will create all the necessary tables:
- `AdminUser` - Store admin credentials
- `Project` - Store projects
- `BlogArticle` - Store blog articles
- `Rating` - Store ratings for projects and articles

## Step 5: Seed Initial Data

Populate the database with sample data and an admin user:

```bash
npm run db:seed
```

This will:
- Create a default admin account with the email/password from your `.env.local`
- Add sample projects
- Add sample blog articles

## Step 6: Start Your Application

```bash
npm run dev
```

Then navigate to:
- `http://localhost:3000/admin` - Admin login
- Use your `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env.local`

## Step 7: Create Additional Admins (Optional)

To create more admin accounts, post to the setup endpoint:

```bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{"email": "newadmin@example.com", "password": "secure_password"}'
```

Or use the admin panel to manage your projects and blogs.

## Database Schema

### AdminUser
- `id` - Unique identifier
- `email` - Admin email (unique)
- `password` - Hashed password (bcrypt)
- `createdAt` - Account creation date
- `updatedAt` - Last update date

### Project
- `id` - Unique identifier
- `name` - Project name
- `role` - Your role in the project
- `summary` - Project description
- `tech` - Technologies used
- `ratings` - Associated ratings (one-to-many)
- `createdAt` - Creation date
- `updatedAt` - Last update date

### BlogArticle
- `id` - Unique identifier
- `title` - Article title
- `excerpt` - Article summary
- `content` - Full article content
- `date` - Publication date
- `category` - Article category
- `readTime` - Estimated read time
- `ratings` - Associated ratings (one-to-many)
- `createdAt` - Creation date
- `updatedAt` - Last update date

### Rating
- `id` - Unique identifier
- `score` - Rating (1-5)
- `userName` - Name of the rater
- `userEmail` - Email of the rater (optional)
- `comment` - Rating comment (optional)
- `projectId` - Associated project (if rating is for a project)
- `articleId` - Associated article (if rating is for an article)
- `createdAt` - Rating date
- `updatedAt` - Last update date

## API Endpoints

### Admin Authentication
- `POST /api/admin/auth` - Login
- `POST /api/admin/setup` - Create new admin
- `GET /api/admin/setup` - Get all admins

### Projects
- `GET /api/admin/projects` - Get all projects with ratings
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects` - Update project
- `DELETE /api/admin/projects?id=ID` - Delete project

### Blog Articles
- `GET /api/admin/blog` - Get all articles with ratings
- `POST /api/admin/blog` - Create article
- `PUT /api/admin/blog` - Update article
- `DELETE /api/admin/blog?id=ID` - Delete article

### Ratings
- `GET /api/admin/ratings?projectId=ID` - Get project ratings
- `GET /api/admin/ratings?articleId=ID` - Get article ratings
- `POST /api/admin/ratings` - Submit rating
- `DELETE /api/admin/ratings?id=ID` - Delete rating

## Troubleshooting

### "DATABASE_URL not found"
Make sure your `.env.local` file has the correct `DATABASE_URL` variable.

### "Connection refused"
Check that your Supabase project is active and the connection string is correct.

### "Relation does not exist"
Run `npm run db:push` again to ensure all tables are created.

### "Password not matching"
Make sure you're using the correct `ADMIN_PASSWORD` from `.env.local` on first login.

## Security Notes

⚠️ **Important for Production:**
1. Change the default admin password immediately
2. Use strong, unique passwords
3. Keep your `.env.local` file private and add it to `.gitignore`
4. Use environment variables for sensitive data
5. Enable Row Level Security (RLS) in Supabase for production
6. Consider implementing 2FA for admin accounts

## Next Steps

1. Add the rating widget to your projects and blog pages
2. Implement comment moderation
3. Add analytics for ratings and engagement
4. Set up automated backups in Supabase
