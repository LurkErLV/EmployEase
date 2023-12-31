"use client"

import {signIn, signOut} from "next-auth/react";
import Link from "next/link";

type Props = {
    type: string
}

export default function AuthBtn(props: Props) {
    let btn;

    switch (props.type) {
        case "signin": {
            return btn = (
                <button onClick={() => signIn()}
                        className="text-white bg-blue-600 px-2 py-1.5 rounded transition hover:bg-opacity-40 hover:text-blue-600">
                    Sign in
                </button>
            );
        }
        case "signout": {
            return btn = (
                <button onClick={() => signOut()}
                        className="text-white bg-blue-600 px-2 py-1.5 rounded transition hover:bg-opacity-40 hover:text-blue-600">
                    Sign Out
                </button>
            );
        }
        case "signup": {
            return btn = (
                <Link href="/auth/signup"
                        className="text-white bg-blue-600 px-2 py-1.5 rounded transition hover:bg-opacity-40 hover:text-blue-600">
                    Register
                </Link>
            );
        }
    }
}