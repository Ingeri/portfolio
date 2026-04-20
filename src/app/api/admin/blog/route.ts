import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const articles = await prisma.blogArticle.findMany({
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

    // Calculate average rating for each article
    const articlesWithRatings = articles.map((article) => {
      const ratings = article.ratings as any[];
      const avgRating =
        ratings.length > 0
          ? (ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length).toFixed(1)
          : 0;

      return {
        ...article,
        averageRating: parseFloat(avgRating as string),
        totalRatings: ratings.length,
        ratings: ratings,
      };
    });

    return NextResponse.json(articlesWithRatings);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const article = await prisma.blogArticle.create({
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content || '',
        date: body.date,
        category: body.category,
        readTime: body.readTime,
      },
      include: {
        ratings: true,
      },
    });

    return NextResponse.json(
      { ...article, averageRating: 0, totalRatings: 0 },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;

    const article = await prisma.blogArticle.update({
      where: { id },
      data: {
        title: rest.title,
        excerpt: rest.excerpt,
        content: rest.content || '',
        date: rest.date,
        category: rest.category,
        readTime: rest.readTime,
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

    const ratings = article.ratings as any[];
    const avgRating =
      ratings.length > 0
        ? (ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length).toFixed(1)
        : 0;

    return NextResponse.json({
      ...article,
      averageRating: parseFloat(avgRating as string),
      totalRatings: ratings.length,
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
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
        { error: 'Article ID required' },
        { status: 400 }
      );
    }

    await prisma.blogArticle.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
