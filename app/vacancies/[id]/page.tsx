import Image from 'next/image';
import ApplyBtn from "@/app/components/client/ApplyBtn";

export default async function page({ params }: { params: { id: string } }) {
  const vacancy = (
    await (
      await fetch('http://192.168.1.163:3000/api/vacancy/getById/' + params.id)
    ).json()
  ).vacancy;

  function formatWorkSchedule(workSchedule: string) {
    switch (workSchedule) {
      case 'FULLTIME':
        return 'Full-Time';
      case 'PARTTIME':
        return 'Part-Time';
      case 'INTERNSHIP':
        return 'Internship';
      default:
        return 'Error';
    }
  }

  function formatMoney(money: number) {
    return money.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  }

  return (
    <>
      <div className="w-full flex justify-center bg-white">
        <main className="flex flex-col w-full max-w-[1140px] mx-5 my-8">
          <div className="flex items-center justify-between max-md:w-fit max-md:flex-col max-md:items-start max-md:gap-5">
            <div className="flex items-center gap-5">
              <Image
                className="rounded-full"
                src={
                  vacancy.companyLogo
                    ? vacancy.companyLogo
                    : 'https://placehold.co/48'
                }
                width={96}
                height={96}
                alt=""
              />
              <div className="flex flex-col gap-3">
                <h1 className="text-gray-900 text-2xl font-medium">
                  {vacancy.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-gray-700 text-lg">at {vacancy.company}</p>
                  <p className="text-white text-sm font-medium px-[8px] py-[4px] bg-[#0BA02C] rounded">
                    {formatWorkSchedule(vacancy.workSchedule)}
                  </p>
                </div>
              </div>
            </div>

          <ApplyBtn id={params.id}/>
          </div>

          <div className="flex justify-between mt-8 gap-12 max-xl:flex-col-reverse max-xl:items-center">
            <div
              className="max-w-[550px] w-full"
              dangerouslySetInnerHTML={{ __html: vacancy.description }}
            />
            <div className="flex gap-8 min-w-[416px] w-max h-fit max-sm:min-w-fit max-sm:justify-center">
              <div className="flex border-2 border-[#E7F0FA] p-8 gap-8 rounded max-sm:flex-col">
                <div className="flex items-center flex-col">
                  <h2 className="text-gray-900 font-medium text-center mb-3">
                    Salary (USD)
                  </h2>
                  <h1 className="text-[#0BA02C] text-xl text-center font-medium mb-1">
                    {formatMoney(vacancy.minSalary)} -{' '}
                    {formatMoney(vacancy.maxSalary)}
                  </h1>
                  <p className="text-gray-500 text-sm">Yearly salary</p>
                </div>
                <hr className="w-[2px] h-full bg-[#E7F0FA] rounded max-sm:h-[2px] max-sm:w-full" />
                <div className="flex flex-col items-center">
                  <svg
                    className="mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none">
                    <path
                      d="M14.25 27.3125L4.75 29.6875V8.3125L14.25 5.9375"
                      stroke="#0A65CC"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23.75 32.0625L14.25 27.3125V5.9375L23.75 10.6875V32.0625Z"
                      stroke="#0A65CC"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23.75 10.6875L33.25 8.3125V29.6875L23.75 32.0625"
                      stroke="#0A65CC"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-gray-900 text-center font-medium">
                    Job Location
                  </p>
                  <p className="text-gray-500 text-center">
                    {vacancy.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// <div className="product-des" dangerouslySetInnerHTML={{ __html: vacancy.description }}/>

// https://placehold.co/48
