'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AuthBtn from '@/app/components/client/AuthBtn';
import { Session } from 'next-auth';

type Props = {
  session: Session | null;
};

export default function Navbar(props: Props) {
  const [isTop, setIsTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const session = props.session;

  const AuthButtons = function () {
    if (!session) {
      return (
        <>
          <AuthBtn type="signin" />
          <AuthBtn type="signup" />
        </>
      );
    } else {
      return <AuthBtn type="signout" />;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsTop(window.scrollY <= 20);
    });
  }, []);
  return (
    <>
      <nav
        className={`fixed z-10 w-full h-[64px] flex justify-center items-center transition duration-500 ${
          isTop ? 'bg-black bg-opacity-80' : 'bg-[#1A1532]'
        }`}>
        <div className="relative max-md:flex-col max-md:my-5 w-full max-w-[1140px] mx-5 flex justify-between items-center transition">
          <div className="max-md:flex max-md:justify-between max-md:w-full">
            <Link className="text-2xl font-medium" href="/">
              EmployEase
            </Link>
            <button
              className="hidden max-md:block z-20"
              onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M4 18L20 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12L20 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 6L20 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isTop
                ? 'max-md:bg-black max-md:bg-opacity-80'
                : 'max-md:bg-[#1A1532]'
            } ${
              isOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-[-100%]'
            } max-md:w-[100vw] max-md:duration-500 max-md:top-7 max-md:py-5 max-md:absolute max-md:flex-col max-md:my-5 flex items-center gap-5 transition`}>
            <Link className="hover:opacity-60 transition" href="/">
              Home
            </Link>
            <Link className="hover:opacity-60 transition" href="/vacancies">
              Vacancies
            </Link>
            {session && (
              <Link className="hover:opacity-60 transition" href="/profile">
                Profile
              </Link>
            )}
            {session?.user.role === 'Employer' ||
            session?.user.role === 'Admin' ? (
              <>
                <Link
                  className="hover:opacity-60 transition"
                  href="/vacancies/create">
                  Create vacancy
                </Link>
              </>
            ) : (
              <></>
            )}
            <AuthButtons />
          </div>
        </div>
      </nav>
    </>
  );
}
