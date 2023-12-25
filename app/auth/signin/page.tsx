"use client"

import {FormEvent, useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import Link from "next/link";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

export default function SignInPage() {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            void router.push("/");
        }
    }, [status]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        const res = await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/"
        });

        if (res && res.error) {
            return toast.error(res.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        console.log(res)
    }

    return (
        <>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-blue-600 underline">
                        Sign in
                    </h1>
                    <form onSubmit={(e) => handleSubmit(e)} className="mt-6">
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-opacity-40 hover:text-blue-600 focus:outline-none focus:bg-blue-600">
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/auth/register"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}