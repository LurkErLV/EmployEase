import prisma from '@/utils/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export async function POST(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { ok: false, message: 'You are unauthorized' },
      { status: 401 },
    );

  const vacancy = await prisma.vacancies.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!vacancy) {
    return NextResponse.json(
      { ok: false, message: 'Vacancy not found' },
      { status: 404 },
    );
  }

  if (session.user.id.toString() === vacancy.authorId.toString()) {
    return NextResponse.json(
      { ok: false, message: 'User is author of vacancy' },
      { status: 405 },
    );
  }

  const createdApply = await prisma.applies.create({
    data: {
      vacancyId: parseInt(params.id),
      userId: parseInt(session.user.id),
    },
  });

  if (createdApply) {
    return NextResponse.json({ ok: true }, { status: 200 });
  } else {
    return NextResponse.json(
      { ok: false, message: 'Some error occurred' },
      { status: 400 },
    );
  }
}