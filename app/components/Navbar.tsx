"use client"

import {useEffect, useState} from "react";
import Link from "next/link";
import AuthButton from "@/app/components/client/AuthBtn";

export default async function Navbar() {
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setIsTop(window.scrollY <= 20);
        })
    }, []);

    return (
        <>
            <nav
                className={`fixed w-full h-[64px] flex justify-center items-center transition duration-500 ${isTop ? "bg-transparent" : "bg-[#1A1532]"}`}>
                <div className="w-full max-w-[1140px] mx-5 flex justify-between items-center">
                    <Link className="text-2xl font-medium" href="/">EmployEase</Link>
                    <div className="flex items-center gap-3">
                        <Link className="hover:opacity-60 transition" href="/">Home</Link>
                        <Link className="hover:opacity-60 transition" href="/">About us</Link>
                        <Link className="hover:opacity-60 transition" href="/">Vacancies</Link>
                        <Link className="hover:opacity-60 transition" href="/">Price</Link>

                        <div className="flex items-center gap-5">
                            <AuthButton type="signup">Sign up</AuthButton>
                            <AuthButton type="login">Login</AuthButton>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}