"use client"

import {ReactNode} from "react";
import {signIn, signOut, useSession} from "next-auth/react";

type Props = {
    type: string,
    children: ReactNode,
}
export default function AuthBtn(props: Props) {
    if (!props) return;
    const session = useSession();

    return (
        <>
            <button onClick={() => signIn()}
                  className="text-white bg-blue-600 px-2 py-1.5 rounded transition hover:bg-opacity-40 hover:text-blue-600">
                {props.children}
            </button>
        </>
    );
}