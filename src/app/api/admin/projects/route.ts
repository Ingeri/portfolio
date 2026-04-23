import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        ratings: {
          select: {
            score: true,
            userName: true,
            comment: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate average rating for each project
    const projectsWithRatings = projects.map((project) => {
      const ratings = project.ratings as any[];
      const avgRating =
        ratings.length > 0
          ? (ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length).toFixed(1)
          : 0;

      return {
        ...project,
        averageRating: parseFloat(avgRating as string),
        totalRatings: ratings.length,
        ratings: ratings,
      };
    });

    return NextResponse.json(projectsWithRatings);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const project = await prisma.project.create({
      data: {
        name: body.name,
        role: body.role,
        summary: body.summary,
        tech: body.tech,
      },
      include: {
        ratings: true,
      },
    });

    return NextResponse.json(
      { ...project, averageRating: 0, totalRatings: 0 },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        name: rest.name,
        role: rest.role,
        summary: rest.summary,
        tech: rest.tech,
      },
      include: {
        ratings: {
          select: {
            score: true,
            userName: true,
            comment: true,
            createdAt: true,
          },
        },
      },
    });

    const ratings = project.ratings as any[];
    const avgRating =
      ratings.length > 0
        ? (ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length).toFixed(1)
        : 0;

    return NextResponse.json({
      ...project,
      averageRating: parseFloat(avgRating as string),
      totalRatings: ratings.length,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID required' },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
