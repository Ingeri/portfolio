import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, articleId, score, userName, userEmail, comment } = body;

    if (!score || score < 1 || score > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (!projectId && !articleId) {
      return NextResponse.json(
        { error: 'Either projectId or articleId is required' },
        { status: 400 }
      );
    }

    const rating = await prisma.rating.create({
      data: {
        score: parseInt(score),
        userName,
        userEmail,
        comment,
        projectId: projectId || null,
        articleId: articleId || null,
      },
    });

    return NextResponse.json(rating, { status: 201 });
  } catch (error) {
    console.error('Error creating rating:', error);
    return NextResponse.json(
      { error: 'Failed to create rating' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const articleId = searchParams.get('articleId');

    const where: any = {};
    if (projectId) where.projectId = projectId;
    if (articleId) where.articleId = articleId;

    const ratings = await prisma.rating.findMany({
      where: { ...where },
      orderBy: { createdAt: 'desc' },
      include: {
        project: { select: { name: true } },
        article: { select: { title: true } },
      },
    });

    return NextResponse.json(ratings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
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
        { error: 'Rating ID required' },
        { status: 400 }
      );
    }

    await prisma.rating.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting rating:', error);
    return NextResponse.json(
      { error: 'Failed to delete rating' },
      { status: 500 }
    );
  }
}
