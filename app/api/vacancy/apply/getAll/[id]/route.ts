import prisma from '@/utils/db';
import { NextResponse } from 'next/server';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export async function GET(req: Request, { params }: Params) {
  const allApplication = await prisma.application.findMany({
    where: {
      userId: parseInt(params.id),
    },
  });

  if (!allApplication) {
    return NextResponse.json({ message: 'Nothing was found' }, { status: 404 });
  }

  const ids = allApplication.map((item) => {
    return item.vacancyId;
  });

  const vacancies = await prisma.vacancy.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return NextResponse.json({ allApplication, vacancies }, { status: 200 });
}
