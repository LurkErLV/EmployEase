import { useRouter } from 'next/router';
import Link from 'next/link';
import React, {ReactNode} from "react";

interface ActiveLinkProps {
    href: string;
    children: ReactNode;
}


export default function ActiveLink({ href, children }: ActiveLinkProps): JSX.Element {
    const router = useRouter();
    const childElement = children as React.ReactElement<{ className?: string }>;

    let className = childElement.props.className || '';

    if (router.pathname === href) {
        className = `${className} text-[#0A65CC] border-b-2 border-[#0A65CC]`;
    }

    return (
        <Link href={href}>
            {React.cloneElement(childElement, { className })}
        </Link>
    );
}