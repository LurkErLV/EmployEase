import VacancyCard from '@/app/components/client/VacancyCard';
import VacancyFilter from '@/app/components/client/VacancyFilter';

type Vacancy = {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  workSchedule: string;
  minSalary: number;
  maxSalary: number;
  location: string;
  education: string;
  jobLevel: string;
  experience: string;
  description: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  filter: boolean;
};

export default async function AllVacancies({ filter }: Props) {
  const basePath = process.env.BASE_PATH;
  const res = await fetch('http://192.168.1.163:3000/api/vacancy/getAll');
  const data = (await res.json()).allVacancies;
  let block;
  if (filter) {
    block = (
      <>
        <VacancyFilter vacancies={data} />
      </>
    );
  } else {
    block = (
      <>
        {data &&
          data.map((item: Vacancy) => (
            <VacancyCard key={item.id} item={item} />
          ))}
      </>
    );
  }

  return (
    <>
      <div className="w-full flex justify-center flex-wrap gap-3 ">{block}</div>
    </>
  );
}
