"use client"

import VacancyCard from "@/app/components/server/VacancyCard";
import {Vacancy} from "@/types/vacancy";
import {useState} from "react";

type Props = {
    vacancies: Vacancy[]
}

export default function VacancyFilter(props: Props) {
    let vacancies: Vacancy[] = props.vacancies;

    const [filterOpen, setFilterOpen] = useState(false);
    const [titleFilter, setTitleFilter] = useState("");
    const [minSalaryFilter, setMinSalaryFilter] = useState(0);
    const [maxSalaryFilter, setMaxSalaryFilter] = useState(0);
    const [companyFilter, setCompanyFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [workScheduleFilter, setWorkScheduleFilter] = useState("")


    if (titleFilter) {
        vacancies = vacancies.filter((item) => {
            return item.title.toLowerCase().includes(titleFilter.toLowerCase());
        });
    }
    if (minSalaryFilter) {
        vacancies = vacancies.filter((item) => {
            return item.maxSalary >= minSalaryFilter;
        });
    }
    if (maxSalaryFilter) {
        vacancies = vacancies.filter((item) => {
            return item.minSalary <= maxSalaryFilter;

        });
    }
    if (companyFilter) {
        vacancies = vacancies.filter((item) => {
            return item.company.toLowerCase().includes(companyFilter.toLowerCase());
        });
    }
    if (locationFilter) {
        vacancies = vacancies.filter((item) => {
            return item.location.toLowerCase().includes(locationFilter.toLowerCase());
        });
    }
    if (workScheduleFilter) {
        vacancies = vacancies.filter((item) => {
            return item.workSchedule.toLowerCase() === workScheduleFilter.toLowerCase();
        });
    }

    return (
        <>
            <input value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)}
                   placeholder="Position search"
                   className="w-full h-10 rounded mt-5 px-3" type="text"/>
            <button className="text-white py-3 px-5 bg-blue-800 rounded" onClick={() => setFilterOpen(true)}>Filter
            </button>
            <div className="w-full flex justify-center flex-wrap gap-3 ">
                {vacancies && vacancies.map((item: Vacancy) => (
                    <VacancyCard key={item.id} item={item}/>
                ))}
            </div>

            <div
                className={`fixed h-[100vh] w-[100vw] bg-black bg-opacity-40 z-30 overflow-y-hidden ${filterOpen ? "" : "hidden"}`}>
                <div
                    className="fixed max-w-[350px] min-w-[300px] w-full min-h-[calc(100vh-64px)] top-[64px] left-0 bg-black/80 p-3">
                    <button className="text-white py-3 px-5 bg-blue-800 rounded"
                            onClick={() => setFilterOpen(false)}>Close
                    </button>
                    <div className="flex flex-col gap-3 mt-5 w-10/12 mx-auto">
                        <div className="flex flex-col gap-3">
                            <p className="text-white text-md font-medium">Min. Salary</p>
                            <input value={minSalaryFilter}
                                   onChange={(e) => e.target.value ? setMinSalaryFilter(parseInt(e.target.value)) : setMinSalaryFilter(0)}
                                   min="0" type="number"
                                   className="rounded p-1"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-white text-md font-medium">Max. Salary</p>
                            <input value={maxSalaryFilter}
                                   onChange={(e) => e.target.value ? setMaxSalaryFilter(parseInt(e.target.value)) : setMaxSalaryFilter(0)}
                                   min="0" type="number" className="rounded p-1"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-white text-md font-medium">Company</p>
                            <input value={companyFilter}
                                   onChange={(e) => setCompanyFilter(e.target.value)}
                                   type="text" className="rounded p-1"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-white text-md font-medium">Location</p>
                            <input value={locationFilter}
                                   onChange={(e) => setLocationFilter(e.target.value)}
                                   type="text" className="rounded p-1"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-white text-md font-medium">Work schedule</p>
                            <select className="rounded p-1" onChange={(e) => setWorkScheduleFilter(e.target.value)}>
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