import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { articleId, score, userName, comment } = body;

    // Validate required fields
    if (!articleId || !score || score < 1 || score > 5) {
      return NextResponse.json(
        { error: "Article ID and valid score (1-5) are required" },
        { status: 400 }
      );
    }

    // Check if article exists
    const article = await prisma.blogArticle.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Create rating
    const rating = await prisma.rating.create({
      data: {
        score: score,
        userName: userName || "Anonymous",
        comment: comment || null,
        articleId: articleId,
      },
    });

    return NextResponse.json(
      { success: true, rating },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating rating:", error);
    return NextResponse.json(
      { error: "Failed to submit rating" },
      { status: 500 }
    );
  }
}
