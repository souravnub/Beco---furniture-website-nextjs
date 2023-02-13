import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useNav } from "../contexts/navContext";
import gsap from "gsap";
import resolveConfig from "tailwindcss/resolveConfig";
import { HiOutlineAtSymbol } from "react-icons/hi";
import myConfig from "../tailwind.config";
import MobileMenu from "./MobileMenu";
import { HiOutlineArrowRight } from "react-icons/hi";
import CursorHover from "./CursorHover";
import { useCursor } from "../contexts/cursorContext";
import getTaliwind from "../utils/getTaliwind";

const navLinks = [
    {
        text: "About us",
        href: "/about",
    },
    {
        text: "Services",
        href: "/services",
    },
];

const Nav = () => {
    const {
        setNavHeight,
        navType,
        setNavType,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        menuBtnTheme,
        setMenuBtnTheme,
        setInitialNavHeight,
        navCursorBorderColor,
    } = useNav();
    const { setBorderColor } = useCursor();
    const navRef = useRef();
    const navPaddingAni = useRef();
    const menuBtnRef = useRef();
    const navAniRef = useRef();

    const [isMenuBtnDisabled, setIsMenuBtnDisabled] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        setNavHeight(navRef.current.offsetHeight);
        setInitialNavHeight(navRef.current.offsetHeight);
        // newNavPadding should be small than what is in the className of nav
        const newNavPadding = getTaliwind.theme.spacing[3];

        navPaddingAni.current = gsap.to(navRef.current, {
            paddingTop: newNavPadding,
            paddingBottom: newNavPadding,
            paused: true,
            ease: "expo.inOut",
            duration: 0.4,
            onStart: () => {
                setNavType("nav-white");
                setMenuBtnTheme("dark");
                navRef.current.classList.add("border-b");
            },
            onComplete: () => {
                setNavHeight(navRef.current.offsetHeight);
            },
            onReverseComplete: () => {
                setNavHeight(navRef.current.offsetHeight);
            },
        });

        window.addEventListener("scroll", handleWindowScroll);

        return () => {
            window.removeEventListener("scroll", handleWindowScroll);

            // revert will kill the animation & will remove the inline styles that we added because of gsap
            // kill will only kill the animation & will NOT remove the inline styles
            navPaddingAni.current?.revert();
        };
    }, []);

    useEffect(() => {
        //setting border color of cursor when nav is hovered
        function setCursorBorderOnHover() {
            setBorderColor(navCursorBorderColor);
        }
        function setCursorBorderToDefault() {
            setBorderColor(getTaliwind.theme.borderColor.brand[500]);
        }
        navRef.current.addEventListener("mouseover", setCursorBorderOnHover);
        navRef.current.addEventListener("mouseleave", setCursorBorderToDefault);

        return () => {
            navRef.current.removeEventListener(
                "mouseover",
                setCursorBorderOnHover
            );
            navRef.current.removeEventListener(
                "mouseleave",
                setCursorBorderToDefault
            );
        };
    }, [navCursorBorderColor]);

    useEffect(() => {
        const classList = navRef.current.classList;
        const currentNavType = Array.from(classList).find((ele) =>
            ele.includes("nav-")
        );
        classList.replace(currentNavType, navType || "nav-transparent");
    }, [navType]);

    function handleWindowScroll() {
        if (window.scrollY > 1) {
            // if set nav-white here, then whenever event triggers it will set navClass to navwhite ... therefore set navClass to navWhite only when animation starts
            navPaddingAni.current.play();
        } else {
            navPaddingAni.current.reverse();
            setNavType("nav-transparent");
            setMenuBtnTheme("light");
            navRef.current.classList.remove("border-b");
        }
    }

    function animateNav({ toBg }) {
        let timeline = gsap.timeline({
            defaults: { duration: 0.3, ease: "power.inOut" },
        });
        timeline.to(navRef.current, {
            backgroundColor: toBg,
            color: "white",
            borderBottom: "none",
        });
        timeline.add(menuBtnAnimation(), "<");
        return timeline;
    }

    function menuBtnAnimation() {
        const lines = Array.from(
            menuBtnRef.current.querySelectorAll(":scope > div")
        );

        return gsap
            .timeline({ defaults: { duration: 0.35, ease: "power3.inOut" } })
            .addLabel("parallel")
            .to(
                menuBtnRef.current,
                {
                    backgroundColor: "white",
                },
                "parallel"
            )
            .to(
                lines,
                {
                    backgroundColor: "black",
                },
                "parallel"
            )
            .to(lines[0], { rotate: 45, top: "50%" }, "parallel")
            .to(lines[1], { rotate: -45, top: "50%" }, "parallel");
    }

    function handleNavAnimation() {
        if (isMobileMenuOpen) {
            setIsMenuBtnDisabled(true);
            navAniRef.current
                .reverse()
                .eventCallback("onReverseComplete", () => {
                    setIsMenuBtnDisabled(false);
                    navAniRef.current.revert();
                });
        } else {
            navAniRef.current = animateNav({
                toBg: getTaliwind.theme.backgroundColor.dark.DEFAULT,
            })
                .play()
                .eventCallback("onStart", () => {
                    setIsMenuBtnDisabled(true);
                })
                .eventCallback("onComplete", () => {
                    setIsMenuBtnDisabled(false);
                });
        }
    }

    return (
        <nav>
            <div
                ref={navRef}
                className="nav-transparent fixed top-0 z-20 flex w-full items-center justify-between bg-texture p-6 text-sm font-semibold transition">
                <CursorHover scale={4}>
                    <Link href="/" className="flex items-center gap-1">
                        <HiOutlineAtSymbol className="text-xl text-brand" />
                        <span className="text-xl font-semibold">Beco</span>
                    </Link>
                </CursorHover>

                <ul className="md:items-cneter hidden md:flex md:gap-10">
                    {navLinks.map(({ href, text }) => {
                        return (
                            <CursorHover scale={4} key={href}>
                                <Link
                                    href={href}
                                    className="transition hover:text-brand">
                                    {text}
                                </Link>
                            </CursorHover>
                        );
                    })}
                </ul>

                <CursorHover scale={4}>
                    <Link
                        href="/contact"
                        className="group hidden md:flex md:items-center md:gap-3">
                        <div
                            className={`menu-contact-btn ${menuBtnTheme} relative flex aspect-square w-4 items-center justify-center overflow-hidden rounded-full p-4`}
                            aria-hidden="true">
                            <HiOutlineArrowRight className="absolute -translate-x-full opacity-0 transition duration-700 group-hover:translate-x-0 group-hover:opacity-100" />
                            <HiOutlineArrowRight className="absolute  opacity-100 transition duration-700 group-hover:translate-x-full group-hover:opacity-0" />
                        </div>
                        Get in touch
                    </Link>
                </CursorHover>

                <button
                    disabled={isMenuBtnDisabled}
                    aria-controls="mobile-navigation"
                    aria-disabled={isMenuBtnDisabled ? "true" : "false"}
                    aria-expanded={isMobileMenuOpen ? "true" : "false"}
                    onClick={() => {
                        setIsMobileMenuOpen((prev) => !prev);
                        handleNavAnimation();
                    }}
                    className={`${menuBtnTheme} menu-btn relative grid aspect-square w-10 place-items-center rounded-full md:hidden`}
                    ref={menuBtnRef}>
                    <span className="sr-only">
                        {isMobileMenuOpen ? "hide menu" : "show menu"}
                    </span>
                    <div className="pointer-events-none absolute top-[45%] h-[1.5px] w-4 origin-center rounded-full"></div>
                    <div className="pointer-events-none absolute top-[55%] h-[1.5px] w-4 origin-center rounded-full"></div>
                </button>
            </div>
            <MobileMenu
                navRef={navRef}
                isOpen={isMobileMenuOpen}
                links={navLinks}
            />
        </nav>
    );
};

export default Nav;
