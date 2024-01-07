import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import SelectStatus from '@/app/components/client/SelectStatus';
import prisma from '@/utils/db';

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role === 'Employee') {
    return redirect('/');
  }

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

  return (
    <>
      <div className="w-full h-full flex justify-center mt-5 overflow-auto">
        <table className="table-auto border-collapse border border-slate-500 border-spacing-2 min-w-fit">
          <thead>
            <tr>
              <th className="border border-slate-500 p-2">Candidate email</th>
              <th className="border border-slate-500 p-2">Position</th>
              <th className="border border-slate-500 p-2">Company</th>
              <th className="border border-slate-500 p-2">Location</th>
              <th className="border border-slate-500 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((item: any, i: number) => {
              return (
                <tr key={i}>
                  <td className="border border-slate-500 p-2">
                    {item.User.email}
                  </td>
                  <td className="border border-slate-500 p-2">
                    {item.Vacancy.title}
                  </td>
                  <td className="border border-slate-500 p-2">Facebook</td>
                  <td className="border border-slate-500 p-2">Latvia, Riga</td>
                  <td className="border border-slate-500 p-2">
                    <SelectStatus id={item.id} status={item.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
