'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import notify from '@/utils/toast';

interface Params {
  id: string;
}

export default function ApplyBtn(params: Params) {
  const router = useRouter();

  async function applyVacancy() {
    const res = await (
      await fetch('http://192.168.1.163:3000/api/vacancy/apply/' + params.id, {
        method: 'POST',
      })
    ).json();

    if (!res.ok) {
      notify('error', res.message);
    } else {
      notify('success', 'Successfully applied!');

      router.refresh();
    }
  }

  return (
    <>
      <button
        onClick={() => applyVacancy()}
        className="flex gap-2 text-white font-semibold bg-[#0A65CC] rounded py-4 px-8 hover:opacity-80 transition group">
        Apply now
        <svg
          className="group-hover:translate-x-2 transition duration-300"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M5 12H19"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 5L19 12L12 19"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
