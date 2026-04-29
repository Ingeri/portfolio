import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const adminUsers = await prisma.adminUser.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, createdAt: true, updatedAt: true } // don't return passwords
    });
    return NextResponse.json({ adminUsers });
  } catch (error) {
    console.error('Error fetching adminUsers:', error);
    return NextResponse.json({ error: 'Failed to fetch admin users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    const adminUser = await prisma.adminUser.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });
    
    const { password, ...userWithoutPassword } = adminUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating adminUser:', error);
    return NextResponse.json({ error: 'Failed to create admin user' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, email, password } = body;
    
    const updateData: any = { email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    const adminUser = await prisma.adminUser.update({
      where: { id },
      data: updateData,
    });
    
    const { password: _, ...userWithoutPassword } = adminUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating adminUser:', error);
    return NextResponse.json({ error: 'Failed to update admin user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    
    await prisma.adminUser.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting adminUser:', error);
    return NextResponse.json({ error: 'Failed to delete admin user' }, { status: 500 });
  }
}
