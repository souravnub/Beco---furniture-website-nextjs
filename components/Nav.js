import React from "react";
import Link from "next/link";
import { useNav } from "../utils/Nav";
import BorderBtn from "./buttons/BorderBtn";

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
    const { isNavThemeDark } = useNav();

    return (
        <nav
            className={`${
                isNavThemeDark ? "bg-black text-white" : "bg-white"
            }`}>
            <div className="container flex gap-4 items-center justify-between py-3 ">
                <Link href="/" className="uppercase font-bold">
                    Beco.go
                </Link>

                <ul role="list" className="flex gap-5">
                    {navLinks.map(({ text, href }) => {
                        return (
                            <li key={text}>
                                <Link
                                    href={href}
                                    className="font-medium capitalize text-sm">
                                    {text}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <Link href="/signup">
                    <BorderBtn
                        className={`uppercase px-4 border ${
                            isNavThemeDark
                                ? "hover:bg-gray-900"
                                : "hover:bg-gray-50"
                        }`}>
                        create account
                    </BorderBtn>
                </Link>
            </div>
        </nav>
    );
};

export default Nav;
