-- Supabase SQL Setup for Portfolio
-- Run this in the Supabase SQL Editor

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create process table
CREATE TABLE IF NOT EXISTS process (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  step_number INTEGER NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample testimonials
INSERT INTO testimonials (name, role, content) VALUES
  ('Eric I.', 'Product Manager', 'Working with Ingeri was exceptional. The attention to detail and technical expertise delivered a product that exceeded our expectations.'),
  ('Ronald M.', 'Startup Founder', 'Outstanding developer who truly understands both the technical and business sides. Our platform performance improved dramatically.'),
  ('Sarah K.', 'Design Lead', 'The collaboration was seamless. Ingeri translated our designs into pixel-perfect, responsive interfaces with smooth animations.')
ON CONFLICT DO NOTHING;

-- Insert process steps
INSERT INTO process (title, description, step_number) VALUES
  ('Planning', 'Understanding requirements, defining project scope, and creating a roadmap aligned with business goals.', 1),
  ('Development', 'Building scalable solutions with clean code, modern technologies, and best practices.', 2),
  ('Testing', 'Rigorous quality assurance, performance optimization, and cross-browser compatibility checks.', 3),
  ('Deployment', 'Smooth launch with CI/CD pipelines, monitoring setup, and post-launch support.', 4)
ON CONFLICT DO NOTHING;

-- Create features table (for homepage featured sections)
CREATE TABLE IF NOT EXISTS features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50), -- icon identifier (e.g., "design", "code", "performance")
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  tech TEXT NOT NULL, -- comma-separated tags
  image_url TEXT,
  project_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample features for homepage
INSERT INTO features (title, description, icon, "order") VALUES
  ('Design systems built for scale', 'Reusable UI patterns, accessibility-first layouts, and component-driven workflows for fast delivery.', 'design', 1),
  ('Full-stack product delivery', 'From frontend interfaces to backend APIs, I ship end-to-end solutions with reliability and speed.', 'code', 2),
  ('High-performance experiences', 'I optimize loading, interactions, and visuals so products feel polished and responsive.', 'performance', 3)
ON CONFLICT DO NOTHING;

-- Insert sample featured projects
INSERT INTO projects (name, role, summary, tech, is_featured, "order") VALUES
  ('Portfolio Dashboard', 'UI + Interaction Design', 'A clean responsive developer dashboard with animated UI components and fast loading.', 'React,TypeScript,Tailwind', true, 1),
  ('Task Management App', 'Full-Stack Delivery', 'A productivity tool built for teams with intuitive workflow and task persistence.', 'Next.js,Prisma,PostgreSQL', true, 2),
  ('API Sync Service', 'Backend Architecture', 'A service connecting multiple APIs, normalizing data, and keeping systems in sync.', 'Node.js,Redis,Docker', true, 3)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE process ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON process
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON features
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);
