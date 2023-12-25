"use client"

import {useEffect, useState} from "react";
import Link from "next/link";
import AuthBtn from "@/app/components/client/AuthBtn";
import {Session} from "next-auth";

type Props = {
    session: Session | null;
}


export default function Navbar(props: Props) {
    const [isTop, setIsTop] = useState(true);
    const session = props.session;

    const AuthButtons = function () {
        if (!session) {
            return (
                <>
                    <AuthBtn type="signin" />
                    <AuthBtn type="register" />
                </>
            );
        } else {
            return <AuthBtn type="signout" />;
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setIsTop(window.scrollY <= 20);
        })
    }, []);
    return (
        <>
            <nav
                className={`fixed z-10 w-full h-[64px] flex justify-center items-center transition duration-500 ${isTop ? "bg-transparent" : "bg-[#1A1532]"}`}>
                <div className="w-full max-w-[1140px] mx-5 flex justify-between items-center transition">
                    <Link className="text-2xl font-medium" href="/">EmployEase</Link>
                    <div className="flex items-center gap-5 transition">
                        <Link className="hover:opacity-60 transition" href="/">Home</Link>
                        <Link className="hover:opacity-60 transition" href="/">About us</Link>
                        <Link className="hover:opacity-60 transition" href="/">Vacancies</Link>
                        <Link className="hover:opacity-60 transition" href="/">Price</Link>

                        <div className="flex items-center gap-3">
                            <AuthButtons/>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}