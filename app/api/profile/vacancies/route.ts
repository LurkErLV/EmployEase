import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { NextResponse } from 'next/server';
import prisma from '@/utils/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role === 'Employee') {
    return NextResponse.json(
      { ok: false, message: 'Access restricted!' },
      { status: 403 },
    );
  }

  const vacancies = await prisma.vacancy
    .findMany({
      where: {
        authorId: parseInt(session.user.id),
      },
      select: {
        id: true,
        title: true,
        company: true,
        location: true,
        application: true,
      },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return NextResponse.json({ ok: true, vacancies }, { status: 200 });
}
