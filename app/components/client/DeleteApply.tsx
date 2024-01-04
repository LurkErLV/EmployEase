'use client';

import { useRouter } from 'next/navigation';
import notify from '@/utils/toast';

type Props = {
  id: number;
};

export default function DeleteApplyBtn(props: Props) {
  const router = useRouter();

  async function deleteApply() {
    const res = await (
      await fetch(
        'http://192.168.1.163:3000/api/vacancy/application/delete/' + props.id,
        {
          method: 'DELETE',
        },
      )
    ).json();

    if (!res.ok) {
      notify('error', res.message);
    } else {
      notify('success', res.message);
      router.refresh();
    }
  }

  return (
    <>
      <button
        onClick={deleteApply}
        className="p-5 border border-gray-600 border-1 rounded hover:bg-red-800 hover:text-white transition">
        X
      </button>
    </>
  );
}
