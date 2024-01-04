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

  const vacancy = await prisma.vacancy
    .findFirst({
      where: {
        id: parseInt(params.id),
      },
    })
    .finally(() => {
      prisma.$disconnect();
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

  const foundApply = await prisma.application
    .findFirst({
      where: {
        userId: parseInt(session.user.id),
        vacancyId: vacancy.id,
      },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  if (foundApply) {
    return NextResponse.json(
      { ok: false, message: 'User already applied' },
      { status: 409 },
    );
  }

  const createdApply = await prisma.application
    .create({
      data: {
        vacancyId: parseInt(params.id),
        userId: parseInt(session.user.id),
      },
    })
    .finally(() => {
      prisma.$disconnect();
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
