import prisma from '@/utils/db';
import { NextResponse } from 'next/server';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export async function GET(req: Request, { params }: Params) {
  const applications = await prisma.application
    .findMany({
      where: {
        vacancyId: parseInt(params.id),
      },
      select: {
        id: true,
        status: true,
        User: true,
        Vacancy: true,
      },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return NextResponse.json({ ok: true, applications }, { status: 200 });
}
