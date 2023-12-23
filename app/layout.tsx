"use client"
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from "react";
import {ToastContainer} from "react-toastify";
import Navbar from "@/app/components/Navbar";
import {SessionProvider} from "next-auth/react";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ToastContainer/>
        <div className="min-h-[100vh] flex flex-col justify-between">
            <SessionProvider>
                <Navbar/>
                <div className="mt-[64px]">
                    {children}
                </div>
            </SessionProvider>
        </div>
        </body>
        </html>
    )
}
