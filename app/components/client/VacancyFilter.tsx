'use client';

import VacancyCard from '@/app/components/client/VacancyCard';
import { Vacancy } from '@/types/vacancy';
import { ChangeEvent, useState } from 'react';

type Props = {
  vacancies: Vacancy[];
};

export default function VacancyFilter(props: Props) {
  let vacancies: Vacancy[] = props.vacancies;

  const [filter, setFilter] = useState({
    title: '',
    minSalary: 0,
    maxSalary: 0,
    company: '',
    location: '',
    workSchedule: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [filterOpen, setFilterOpen] = useState(false);

  const filterVacancies = () => {
    return vacancies.filter((item) => {
      const titleMatch =
        !filter.title ||
        item.title.toLowerCase().includes(filter.title.toLowerCase());
      const minSalaryMatch =
        !filter.minSalary || item.maxSalary >= filter.minSalary;
      const maxSalaryMatch =
        !filter.maxSalary || item.minSalary <= filter.maxSalary;
      const companyMatch =
        !filter.company ||
        item.company.toLowerCase().includes(filter.company.toLowerCase());
      const locationMatch =
        !filter.location ||
        item.location.toLowerCase().includes(filter.location.toLowerCase());
      const workScheduleMatch =
        !filter.workSchedule ||
        item.workSchedule.toLowerCase() === filter.workSchedule.toLowerCase();

      return (
        titleMatch &&
        minSalaryMatch &&
        maxSalaryMatch &&
        companyMatch &&
        locationMatch &&
        workScheduleMatch
      );
    });
  };

  const filteredVacancies = filterVacancies();

  return (
    <>
      <input
        value={filter.title}
        onChange={handleChange}
        name="title"
        placeholder="Position search"
        className="w-full h-10 rounded mt-5 px-3"
        type="text"
      />
      <button
        className="text-white py-3 px-5 bg-blue-800 rounded"
        onClick={() => setFilterOpen(true)}>
        Filter
      </button>
      <div className="w-full flex justify-center flex-wrap gap-3 ">
        {filteredVacancies &&
          filteredVacancies.map((item: Vacancy) => (
            <VacancyCard key={item.id} item={item} />
          ))}
      </div>

      <div
        className={`fixed h-[100vh] w-[100vw] bg-black bg-opacity-40 z-30 overflow-y-hidden ${
          filterOpen ? '' : 'hidden'
        }`}>
        <div className="fixed max-w-[350px] min-w-[300px] w-full min-h-[calc(100vh-64px)] top-[64px] left-0 bg-black/80 p-3">
          <button
            className="text-white py-3 px-5 bg-blue-800 rounded"
            onClick={() => setFilterOpen(false)}>
            Close
          </button>
          <div className="flex flex-col gap-3 mt-5 w-10/12 mx-auto">
            <div className="flex flex-col gap-3">
              <p className="text-white text-md font-medium">Min. Salary</p>
              <input
                value={filter.minSalary}
                onChange={handleChange}
                name="minSalary"
                min="0"
                type="number"
                className="rounded p-1"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white text-md font-medium">Max. Salary</p>
              <input
                value={filter.maxSalary}
                name="maxSalary"
                onChange={handleChange}
                min="0"
                type="number"
                className="rounded p-1"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white text-md font-medium">Company</p>
              <input
                value={filter.company}
                name="company"
                onChange={handleChange}
                type="text"
                className="rounded p-1"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white text-md font-medium">Location</p>
              <input
                value={filter.location}
                name="location"
                onChange={handleChange}
                type="text"
                className="rounded p-1"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white text-md font-medium">Work schedule</p>
              <select
                className="rounded p-1"
                name="workSchedule"
                onChange={handleChange}>
                <option value="">None</option>
                <option value="FULLTIME">Full-Time</option>
                <option value="PARTTIME">Part-Time</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
