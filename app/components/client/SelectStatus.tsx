'use client';

type Props = {
  status: string;
  id: number;
};
export default function SelectStatus({ status, id }: Props) {
  async function changeStatus(newStatus: string, id: number) {
    await fetch(
      `http://192.168.1.163:3000/api/vacancy/application/changeStatus/${id}?status=${newStatus}`,
      {
        method: 'POST',
      },
    );
  }

  return (
    <>
      <select
        onChange={(e) => changeStatus(e.target.value, id)}
        defaultValue={status}>
        <option value="Waiting">Waiting</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </>
  );
}
