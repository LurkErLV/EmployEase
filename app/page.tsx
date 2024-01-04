import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import AllVacancies from '@/app/components/server/AllVacancies';

export default async function page() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-5">
        <p className="my-5">
          Signed in as {session ? session.user.email : 'Guest'}
        </p>
        <div className="w-full max-w-[1140px] flex gap-6 flex-wrap justify-center items-center">
          <AllVacancies filter={false} />
        </div>
      </div>
    </>
  );
}
