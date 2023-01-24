import React from "react";
import Link from "next/link";

const navLinks = [
    {
        text: "overview",
        href: "/overview",
    },
    {
        text: "features",
        href: "/features",
    },
    {
        text: "pricing",
        href: "/pricing",
    },
    {
        text: "about",
        href: "/about",
    },
];

const Nav = () => {
    return (
        <nav className="container flex gap-4 items-center justify-between py-3">
            <Link href="/" className="uppercase font-bold">
                Beco.go
            </Link>

            <ul role="list" className="flex gap-5">
                {navLinks.map(({ text, href }) => {
                    return (
                        <li>
                            <Link
                                href={href}
                                className="font-medium capitalize text-sm">
                                {text}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <Link
                href="/signup"
                className="font-mono text-xs font-medium p-2 uppercase border-2">
                create account
            </Link>
        </nav>
    );
};

export default Nav;
