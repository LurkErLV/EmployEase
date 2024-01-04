import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import prisma from '@/utils/db';
import { $Enums } from '.prisma/client';
import Status = $Enums.Status;

export async function POST(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const statuses = ['Waiting', 'Approved', 'Rejected'];

  if (!session || session.user.role === 'Employee') {
    return NextResponse.json(
      { ok: false, message: 'Access restricted' },
      { status: 403 },
    );
  }

  const status: Status = <'Waiting' | 'Approved' | 'Rejected'>(
    searchParams.get('status')
  );

  if (!status) {
    return NextResponse.json(
      { ok: false, message: 'Status is required' },
      { status: 400 },
    );
  }

  if (!statuses.includes(status)) {
    return NextResponse.json(
      { ok: false, message: 'Invalid status' },
      { status: 400 },
    );
  }

  await prisma.application
    .update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        status: status,
      },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return NextResponse.json({ ok: true }, { status: 200 });
}
