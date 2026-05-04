import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const article = await prisma.blogArticle.findUnique({
      where: { id },
      include: {
        ratings: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Calculate average rating
    const ratings = article.ratings;
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
        : 0;

    const articleWithRating = {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      date: article.date,
      category: article.category,
      readTime: article.readTime,
      averageRating: parseFloat(avgRating.toFixed(1)),
      totalRatings: ratings.length,
      ratings: ratings.map((r) => ({
        id: r.id,
        score: r.score,
        userName: r.userName,
        comment: r.comment,
        createdAt: r.createdAt.toISOString(),
      })),
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
    };

    return NextResponse.json(articleWithRating);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}
