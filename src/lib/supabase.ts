import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our tables
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  created_at: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  step_number: number;
  created_at: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  summary: string;
  tech: string;
  image_url: string | null;
  project_url: string | null;
  github_url: string | null;
  is_featured: boolean;
  order: number;
  created_at: string;
}
