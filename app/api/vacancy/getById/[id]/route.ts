import prisma from '@/utils/db';
import { NextResponse } from 'next/server';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export async function GET(req: Request, { params }: Params) {
  const vacancy = await prisma.vacancies.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!vacancy) {
    return NextResponse.json({}, { status: 400 });
  }
  return NextResponse.json({ vacancy }, { status: 200 });
}
