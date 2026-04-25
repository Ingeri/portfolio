import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Default admin credentials
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      // Create admin user
      const admin = await prisma.adminUser.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
        },
      });

      console.log(`✅ Admin user created: ${admin.email}`);
    }

    // Seed sample projects
    const projects = await prisma.project.createMany({
      data: [
        {
          name: 'Portfolio Dashboard',
          role: 'Frontend Developer',
          summary:
            'A modern portfolio website built with Next.js, Tailwind, and TypeScript',
          tech: 'Next.js · Tailwind · TypeScript',
        },
        {
          name: 'Task Management App',
          role: 'Full Stack Developer',
          summary: 'A comprehensive task management system with real-time synchronization',
          tech: 'React · Node.js · PostgreSQL',
        },
        {
          name: 'API Sync Manager',
          role: 'Backend Developer',
          summary: 'Tool for syncing data across multiple APIs with transformations',
          tech: 'Express · TypeScript · Supabase',
        },
        {
          name: 'Design System',
          role: 'Design Systems Engineer',
          summary: 'Reusable component library with comprehensive documentation',
          tech: 'React · Tailwind · Storybook',
        },
      ],
      skipDuplicates: true,
    });

    console.log(`✅ ${projects.count} projects seeded`);

    // Seed sample blog articles
    const articles = await prisma.blogArticle.createMany({
      data: [
        {
          title: 'Building Modern Web Interfaces with React and Tailwind',
          excerpt:
            'Learn how to create beautiful, responsive user interfaces using React and Tailwind CSS with practical examples and best practices.',
          content:
            'Full article content here...',
          date: 'April 15, 2026',
          category: 'Frontend',
          readTime: '8 min read',
        },
        {
          title: 'Scaling Node.js APIs for Production',
          excerpt:
            'Deep dive into building scalable and performant REST APIs using Node.js, Express, and best practices for production environments.',
          content:
            'Full article content here...',
          date: 'April 10, 2026',
          category: 'Backend',
          readTime: '12 min read',
        },
        {
          title: 'Next.js 16 - What\'s New and Exciting',
          excerpt:
            'Explore the latest features in Next.js 16, including improved performance, new rendering options, and developer experience enhancements.',
          content:
            'Full article content here...',
          date: 'April 5, 2026',
          category: 'Framework',
          readTime: '10 min read',
        },
        {
          title: 'TypeScript Best Practices for Large Projects',
          excerpt:
            'Master TypeScript with advanced patterns, type safety strategies, and architectural approaches for maintaining large codebases.',
          content:
            'Full article content here...',
          date: 'March 28, 2026',
          category: 'TypeScript',
          readTime: '15 min read',
        },
      ],
      skipDuplicates: true,
    });

    console.log(`✅ ${articles.count} blog articles seeded`);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
