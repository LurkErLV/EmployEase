import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role === 'Employee') {
    return redirect('/');
  }

  const res = await (
    await fetch('http://192.168.1.163:3000/api/profile/vacancies', {
      method: 'GET',
      headers: headers(),
    })
  ).json();

  console.log(res);

  return (
    <>
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="p-6">
              <h1 className="text-center text-2xl max-sm:text-xl font-semibold mb-5">
                Published vacancies
              </h1>

              <div className="flex flex-col gap-2">
                {res.vacancies.map((item: any, i: number) => {
                  return (
                    <Link
                      key={i}
                      href={'/profile/vacancies/' + item.id}
                      className="flex flex-col w-full gap-2 text-black hover:opacity-50">
                      <div className="flex justify-between items-center gap-2 border border-gray-700 p-1 rounded">
                        <div className="flex flex-col gap-2">
                          <h2>
                            {item.title} at {item.company}
                          </h2>
                          <p>{item.location}</p>
                        </div>
                        <p>Applications: {item.application.length}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
