import type {AppProps} from 'next/app'
import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {ToastContainer} from 'react-toastify';
import Head from "next/head";
import {SessionProvider} from "next-auth/react";
import {Navbar} from "@/components/Navbar";
import React, {useEffect} from "react";

export default function MyApp({Component, pageProps}: AppProps) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return (
        <>
            <Head>
                <title>EmployEase</title>
            </Head>
            <SessionProvider session={pageProps.session}>
                <ToastContainer/>
                <div className="min-h-[100vh] flex flex-col justify-between">
                    <Navbar/>
                    <Component {...pageProps} />
                </div>
            </SessionProvider>
        </>
    )
}