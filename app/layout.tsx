import {Inter} from 'next/font/google'
import './globals.css'
import React from "react";
import {ToastContainer} from "react-toastify";
import Navbar from "@/app/components/Navbar";
import NextAuthProvider from "@/app/components/client/NextAuthProvider";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({subsets: ['latin']})

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
        <body className={inter.className}>
        <ToastContainer/>
        <div className="min-h-[100vh] flex flex-col justify-between">
            <NextAuthProvider>
                <Navbar session={session}/>
                {children}
            </NextAuthProvider>
        </div>
        </body>
        </html>
    )
}
