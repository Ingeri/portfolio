import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        ratings: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Calculate average rating
    const ratings = project.ratings;
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
        : 0;

    const projectWithRating = {
      id: project.id,
      name: project.name,
      role: project.role,
      summary: project.summary,
      tech: project.tech,
      content: "",
      imageUrl: (project as any).imageUrl || null,
      projectUrl: (project as any).projectUrl || null,
      githubUrl: (project as any).githubUrl || null,
      averageRating: parseFloat(avgRating.toFixed(1)),
      totalRatings: ratings.length,
      ratings: ratings.map((r) => ({
        id: r.id,
        score: r.score,
        userName: r.userName,
        comment: r.comment,
        createdAt: r.createdAt.toISOString(),
      })),
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    };

    return NextResponse.json(projectWithRating);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
