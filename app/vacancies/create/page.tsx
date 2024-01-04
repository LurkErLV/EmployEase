'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import notify from '@/utils/toast';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function page() {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      if (data?.user.role === 'Employee') {
        notify('error', 'Permission denied');
        return router.push('/');
      }
    } else if (status === 'unauthenticated') {
      notify('error', 'Permission denied');
      return router.push('/');
    }
  }, [status]);

  const [formValues, setFormValues] = useState({
    title: '',
    company: '',
    companyLogo: '',
    workSchedule: 'FULLTIME',
    minSalary: 0,
    maxSalary: 0,
    location: '',
    description: '',
  });

  const handleEditor = (text: string) =>
    setFormValues((prevState) => ({
      ...prevState,
      description: text,
    }));

  const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    if (name === 'minSalary' || name === 'maxSalary') {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !formValues.title ||
      !formValues.company ||
      !formValues.workSchedule ||
      !formValues.minSalary ||
      !formValues.maxSalary ||
      !formValues.location ||
      !formValues.description
    ) {
      return notify('error', 'Fill all required inputs');
    }
    await fetch('http://192.168.1.163:3000/api/vacancy/create', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        notify('success', `Created new vacancy with ${res.newVacancy.id} Id`);
        router.push('/vacancies/' + res.newVacancy.id);
      })
      .catch((_) => {
        notify('error', 'Something went wrong!');
      });
  }

  return (
    <>
      <main className="w-full mt-[64px] flex flex-col justify-center items-center gap-5 px-3">
        <h1 className="text-black text-4xl font-medium">Create vacancy</h1>
        <form
          className="w-1/2 max-md:w-full box-border flex flex-col gap-3"
          onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="p-2 rounded"
            name="title"
            placeholder="Position title"
            type="text"
          />
          <input
            onChange={handleChange}
            className="p-2 rounded"
            name="company"
            placeholder="Company name"
            type="text"
          />
          <input
            onChange={handleChange}
            className="p-2 rounded"
            name="companyLogo"
            placeholder="Company logo image url (PNG format)"
            type="text"
          />
          <select
            onChange={handleChange}
            value={formValues.workSchedule}
            className="p-2 rounded"
            name="workSchedule">
            <option value="FULLTIME">Full-Time</option>
            <option value="PARTTIME">Part-Time</option>
            <option value="INTERNSHIP">Internship</option>
          </select>
          <input
            onChange={handleChange}
            className="p-2 rounded"
            name="minSalary"
            placeholder="Minimal salary"
            type="number"
          />
          <input
            onChange={handleChange}
            className="p-2 rounded"
            name="maxSalary"
            placeholder="Maximal salary"
            type="number"
          />
          <input
            onChange={handleChange}
            className="p-2 rounded"
            name="location"
            placeholder="Example: Latvia, Riga"
            type="text"
          />
          <div className="w-full h-[550px] overflow-auto border border-black rounded">
            <ReactQuill
              className="w-full h-[510px]"
              value={formValues.description}
              onChange={handleEditor}
              theme="snow"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
