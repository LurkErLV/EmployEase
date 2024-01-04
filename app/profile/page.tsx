import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import DeleteApplyBtn from '@/app/components/client/DeleteApply';

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/');

  const res = await (
    await fetch(
      'http://192.168.1.163:3000/api/vacancy/apply/getAll/' + session.user.id,
      {
        method: 'GET',
      },
    )
  ).json();

  return (
    <>
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2">
                  {session.user.name && session.user.surname
                    ? `${session.user.name} ${session.user.surname}`
                    : session.user.email}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 font-bold uppercase">
                  {session.user.role}
                </div>
                <div className="mb-2 mt-10">
                  <p>ID: {session.user.id}</p>
                  <p>Total application: {res.allApplication.length}</p>
                </div>
              </div>
              <div className="mt-10 py-10 border-t text-center">
                <div className="flex flex-col gap-2 justify-center">
                  <h1 className="text-xl font-semibold">All application</h1>
                  {res.allApplication.length > 0 ? (
                    <>
                      {res.vacancies.map((item: any, i: number) => {
                        return (
                          <div
                            key={i}
                            className="flex justify-between items-center bg-gray-300 rounded p-3">
                            <div className="flex flex-col gap-1">
                              <p className="text-left">
                                <strong>{item.title}</strong> at{' '}
                                <strong>{item.company}</strong>
                              </p>
                              <p className="text-left">
                                <strong>Status:</strong>{' '}
                                {res.allApplication[i].status}
                              </p>
                            </div>
                            <DeleteApplyBtn id={res.allApplication[i].id} />
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>You have not any applied vacancies!</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
