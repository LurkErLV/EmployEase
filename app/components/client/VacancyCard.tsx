"use client"
import Image from "next/image";
import Link from "next/link";

type Vacancy = {
    id: number,
    title: string,
    company: string,
    companyLogo: string,
    workSchedule: string,
    minSalary: number,
    maxSalary: number,
    location: string,
    education: string,
    jobLevel: string,
    experience: string,
    description: string,
    authorId: number,
    createdAt: string,
    updatedAt: string
}


type Props = {
    item: Vacancy,
}

export default function VacancyCard(props: Props) {
    function formatWorkSchedule(workSchedule: string) {
        switch (workSchedule) {
            case "FULLTIME":
                return "Full-Time";
            case "PARTTIME":
                return "Part-Time";
            case "INTERNSHIP":
                return "Internship";
            default:
                return "Error";
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
            <Link href={"/vacancies/" + props.item.id}
                className="max-w-[372px] min-w-[300px] w-full border-2 border-[#E4E5E8] rounded-md bg-white flex flex-col p-6 hover:scale-110 transition">
                <h1 className="text-gray-900 text-lg font-medium mb-1.5">{props.item.title}</h1>
                <div className="flex gap-2 mb-5 max-sm:flex-col">
                    <p className="text-[#0BA02C] text-xs font-bold uppercase bg-[#E7F6EA] px-[8px] py-[4px] w-fit">{formatWorkSchedule(props.item.workSchedule)}</p>
                    <p className="text-gray-500 text-sm">Salary: {formatMoney(props.item.minSalary)} - {formatMoney(props.item.maxSalary)}</p>
                </div>
                <div className="flex gap-3">
                    <div className="w-12 h-12 rounded bg-[#EDEFF5] flex justify-center items-center">
                        <Image
                            src={props.item.companyLogo.startsWith('http') || props.item.companyLogo.startsWith('https') ? props.item.companyLogo : "https://placehold.co/48"}
                            alt=""
                            width={24} height={24}/>
                    </div>
                    <div className="h-full flex flex-col justify-between">
                        <h2 className="text-gray-900 text-base font-medium">{props.item.company}</h2>
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
                                 fill="none">
                                <path
                                    d="M9 9.5625C10.2426 9.5625 11.25 8.55514 11.25 7.3125C11.25 6.06986 10.2426 5.0625 9 5.0625C7.75736 5.0625 6.75 6.06986 6.75 7.3125C6.75 8.55514 7.75736 9.5625 9 9.5625Z"
                                    stroke="#767F8C" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path
                                    d="M14.625 7.3125C14.625 12.375 9 16.3125 9 16.3125C9 16.3125 3.375 12.375 3.375 7.3125C3.375 5.82066 3.96763 4.38992 5.02252 3.33502C6.07742 2.28013 7.50816 1.6875 9 1.6875C10.4918 1.6875 11.9226 2.28013 12.9775 3.33502C14.0324 4.38992 14.625 5.82066 14.625 7.3125V7.3125Z"
                                    stroke="#767F8C" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                            <p className="text-gray-500 text-sm">{props.item.location}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}