import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.blogArticle.findMany({
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

    // Calculate average rating for each article
    const articlesWithRatings = articles.map((article) => {
      const ratings = article.ratings;
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
          : 0;

      return {
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        date: article.date,
        category: article.category,
        readTime: article.readTime,
        averageRating: parseFloat(avgRating.toFixed(1)),
        totalRatings: ratings.length,
        createdAt: article.createdAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
      };
    });

    return NextResponse.json(articlesWithRatings);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
