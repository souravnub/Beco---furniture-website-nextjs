import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useNav } from "../contexts/navContext";
import { HiOutlineArrowRight } from "react-icons/hi";

const MobileMenu = ({ isOpen, navRef, links, ...props }) => {
    const { navHeight } = useNav();
    const menuRef = useRef();
    const animationTimelineRef = useRef();

    useEffect(() => {
        let timeline = gsap.timeline({
            defaults: { duration: 0.3, ease: "power" },
        });

        timeline.fromTo(
            menuRef.current,
            { opacity: 0, visibility: "hidden" },
            { opacity: 1, visibility: "visible" }
        );
        timeline.fromTo(
            menuRef.current.querySelectorAll(":scope a"),
            {
                opacity: 0,
                y: "100%",
            },
            { opacity: 1, y: 0 }
        );
        animationTimelineRef.current = timeline;
    }, []);

    useEffect(() => {
        if (isOpen) {
            animationTimelineRef.current.play();
        } else {
            animationTimelineRef.current.reverse();
        }
    }, [isOpen]);

    return (
        <ul
            id="mobile-navigation"
            {...props}
            ref={menuRef}
            style={{ paddingTop: navHeight + "px" }}
            className={`opacity-0 bg-dark bg-texture text-white z-10 fixed inset-0 md:hidden`}>
            {links.map(({ href, text }) => {
                return (
                    <div
                        key={href}
                        className="first:mt-1 relative isolate p-5 border-t border-dark group after:content-[''] after:absolute after:inset-0 after:scale-y-0 after:transition-transform after:-z-10 after:bg-white hover:after:scale-y-100 after:origin-top after:duration-300 focus-within:after:scale-y-100">
                        <div className="overflow-hidden">
                            <Link
                                href={href}
                                className=" block font-bold text-3xl mix-blend-difference">
                                {text}
                            </Link>
                        </div>
                    </div>
                );
            })}
            <Link
                href={"/contact"}
                className="group mt-5 ml-5 p-5 grid place-content-center grid-flow-col items-center gap-3 w-fit text-black bg-brand aspect-square rounded-full">
                <div className="relative w-4 aspect-square" aria-hidden="true">
                    <HiOutlineArrowRight className="absolute group-hover:translate-x-full group-focus:translate-x-full opacity-100 transition group-hover:opacity-0 group-focus:opacity-0 duration-700" />
                    <HiOutlineArrowRight className="absolute opacity-0 right-full group-hover:translate-x-full group-focus:translate-x-full transition group-hover:opacity-100 group-focus:opacity-100 duration-700" />
                </div>
                Have an Idea?
            </Link>
        </ul>
    );
};

export default MobileMenu;
