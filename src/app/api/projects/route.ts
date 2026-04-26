import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        ratings: {
          select: {
            score: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate average rating for each project
    const projectsWithRatings = projects.map((project: any) => {
      const ratings = project.ratings || [];
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((sum: number, r: any) => sum + r.score, 0) / ratings.length
          : 0;

      return {
        id: project.id,
        name: project.name,
        role: project.role,
        summary: project.summary,
        tech: project.tech,
        // Use optional chaining for fields that may not exist in DB yet
        imageUrl: project.imageUrl || null,
        projectUrl: project.projectUrl || null,
        githubUrl: project.githubUrl || null,
        isFeatured: project.isFeatured || false,
        order: project.order || 0,
        averageRating: parseFloat(avgRating.toFixed(1)),
        totalRatings: ratings.length,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
      };
    });

    return NextResponse.json(projectsWithRatings);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
