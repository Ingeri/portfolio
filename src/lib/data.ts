import prisma from "./prisma";

// Types matching Prisma models
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  order: number;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  summary: string;
  tech: string;
  imageUrl: string | null;
  projectUrl: string | null;
  githubUrl: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
}

export interface WorkProcess {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

// Fetch active features ordered by order field
export async function getFeatures(): Promise<Feature[]> {
  try {
    const features = await prisma.feature.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        icon: true,
        order: true,
      },
    });

    // If no features in database, return fallback
    if (features.length === 0) {
      return getFallbackFeatures();
    }

    return features;
  } catch (error) {
    console.error("Error fetching features from Prisma:", error);
    return getFallbackFeatures();
  }
}

// Fetch featured projects ordered by order field
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: 6,
      select: {
        id: true,
        name: true,
        role: true,
        summary: true,
        tech: true,
        imageUrl: true,
        projectUrl: true,
        githubUrl: true,
      },
    });

    // If no featured projects, return fallback
    if (projects.length === 0) {
      return getFallbackProjects();
    }

    return projects;
  } catch (error) {
    console.error("Error fetching projects from Prisma:", error);
    return getFallbackProjects();
  }
}

// Fetch work process steps
export async function getWorkProcess(): Promise<WorkProcess[]> {
  try {
    const steps = await prisma.workProcess.findMany({
      orderBy: { stepNumber: "asc" },
      select: {
        id: true,
        stepNumber: true,
        title: true,
        description: true,
      },
    });

    // If no steps in database, return fallback
    if (steps.length === 0) {
      return getFallbackWorkProcess();
    }

    return steps;
  } catch (error) {
    console.error("Error fetching work process from Prisma:", error);
    return getFallbackWorkProcess();
  }
}

// Fetch testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        name: true,
        role: true,
        content: true,
      },
    });

    // If no testimonials, return fallback
    if (testimonials.length === 0) {
      return getFallbackTestimonials();
    }

    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials from Prisma:", error);
    return getFallbackTestimonials();
  }
}

// Fallback data functions
function getFallbackFeatures(): Feature[] {
  return [
    {
      id: "1",
      title: "Design systems built for scale",
      description:
        "Reusable UI patterns, accessibility-first layouts, and component-driven workflows for fast delivery.",
      icon: "design",
      order: 1,
    },
    {
      id: "2",
      title: "Full-stack product delivery",
      description:
        "From frontend interfaces to backend APIs, I ship end-to-end solutions with reliability and speed.",
      icon: "code",
      order: 2,
    },
    {
      id: "3",
      title: "High-performance experiences",
      description:
        "I optimize loading, interactions, and visuals so products feel polished and responsive.",
      icon: "performance",
      order: 3,
    },
  ];
}

function getFallbackProjects(): Project[] {
  return [
    {
      id: "1",
      name: "Portfolio Dashboard",
      role: "UI + Interaction Design",
      summary:
        "A clean responsive developer dashboard with animated UI components and fast loading.",
      tech: "React,TypeScript,Tailwind",
      imageUrl: null,
      projectUrl: null,
      githubUrl: null,
    },
    {
      id: "2",
      name: "Task Management App",
      role: "Full-Stack Delivery",
      summary:
        "A productivity tool built for teams with intuitive workflow and task persistence.",
      tech: "Next.js,Prisma,PostgreSQL",
      imageUrl: null,
      projectUrl: null,
      githubUrl: null,
    },
    {
      id: "3",
      name: "API Sync Service",
      role: "Backend Architecture",
      summary:
        "A service connecting multiple APIs, normalizing data, and keeping systems in sync.",
      tech: "Node.js,Redis,Docker",
      imageUrl: null,
      projectUrl: null,
      githubUrl: null,
    },
  ];
}

function getFallbackTestimonials(): Testimonial[] {
  return [
    {
      id: "1",
      name: "Eric I.",
      role: "Product Manager",
      content:
        "Working with Ingeri was exceptional. The attention to detail and technical expertise delivered a product that exceeded our expectations.",
    },
    {
      id: "2",
      name: "Ronald M.",
      role: "Startup Founder",
      content:
        "Outstanding developer who truly understands both the technical and business sides. Our platform performance improved dramatically.",
    },
    {
      id: "3",
      name: "Sarah K.",
      role: "Design Lead",
      content:
        "The collaboration was seamless. Ingeri translated our designs into pixel-perfect, responsive interfaces with smooth animations.",
    },
  ];
}

function getFallbackWorkProcess(): WorkProcess[] {
  return [
    {
      id: "1",
      stepNumber: 1,
      title: "Planning",
      description: "Understanding requirements, defining project scope, and creating a roadmap aligned with business goals.",
    },
    {
      id: "2",
      stepNumber: 2,
      title: "Development",
      description: "Building scalable solutions with clean code, modern technologies, and best practices.",
    },
    {
      id: "3",
      stepNumber: 3,
      title: "Testing",
      description: "Rigorous quality assurance, performance optimization, and cross-browser compatibility checks.",
    },
    {
      id: "4",
      stepNumber: 4,
      title: "Deployment",
      description: "Smooth launch with CI/CD pipelines, monitoring setup, and post-launch support.",
    },
  ];
}
