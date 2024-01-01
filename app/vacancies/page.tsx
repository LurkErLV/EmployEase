'use client';

import AllVacancies from '@/app/components/server/AllVacancies';

export default function page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-5">
        <div className="w-full max-w-[1140px] flex gap-6 flex-wrap justify-center items-center">
          <AllVacancies filter={true} />
        </div>
      </div>
    </>
  );
}
