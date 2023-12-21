import type {AppProps} from 'next/app'
import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import Head from "next/head";
import {SessionProvider} from "next-auth/react";

export default function MyApp({Component, pageProps}: AppProps) {
    return (<>
        <Head>
            <title>EmployEase</title>
        </Head>
        <SessionProvider session={pageProps.session}>
            <ToastContainer/>
            <div className="min-h-[100vh] flex flex-col justify-between">
                <Component {...pageProps} />
            </div>
        </SessionProvider>
    </>)
}