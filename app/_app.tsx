import type {AppProps} from 'next/app'
import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import Head from "next/head";
import {Navbar} from "@/app/components/Navbar";
import React from "react";
import {SessionProvider} from "next-auth/react";

export default function MyApp({Component, pageProps}: AppProps) {
    console.log(true)
    return (
        <>
            <Head>
                <title>EmployEase222</title>
            </Head>
            <SessionProvider session={pageProps.session}>
                <ToastContainer/>
                <div className="min-h-[100vh] flex flex-col justify-between">
                    <Navbar/>
                    <div className="mt-[64px]">
                        <Component {...pageProps} />
                    </div>
                </div>
            </SessionProvider>
        </>
    )
}