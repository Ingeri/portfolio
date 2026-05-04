import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const process = await prisma.workProcess.findMany({
      orderBy: { stepNumber: 'asc' },
    });
    return NextResponse.json({ process });
  } catch (error) {
    console.error('Error fetching process:', error);
    return NextResponse.json({ error: 'Failed to fetch process' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const process = await prisma.workProcess.create({
      data: {
        title: body.title,
        description: body.description,
        stepNumber: body.stepNumber ? parseInt(body.stepNumber) : 0,
      },
    });
    return NextResponse.json(process, { status: 201 });
  } catch (error) {
    console.error('Error creating process step:', error);
    return NextResponse.json({ error: 'Failed to create process step' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;
    const process = await prisma.workProcess.update({
      where: { id },
      data: {
        title: rest.title,
        description: rest.description,
        stepNumber: rest.stepNumber ? parseInt(rest.stepNumber.toString()) : undefined,
      },
    });
    return NextResponse.json(process);
  } catch (error) {
    console.error('Error updating process step:', error);
    return NextResponse.json({ error: 'Failed to update process step' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    
    await prisma.workProcess.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting process step:', error);
    return NextResponse.json({ error: 'Failed to delete process step' }, { status: 500 });
  }
}
