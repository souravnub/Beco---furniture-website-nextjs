import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useNav } from "../contexts/Nav";
import gsap from "gsap";
import resolveConfig from "tailwindcss/resolveConfig";
import { FaCircleNotch } from "react-icons/fa";
import myConfig from "../tailwind.config";
import MobileMenu from "./MobileMenu";

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
    } = useNav();
    const navRef = useRef();
    const navPaddingAni = useRef();
    const menuBtnRef = useRef();
    const navAniRef = useRef();

    const tailwindConfig = resolveConfig(myConfig);

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
        // newNavPadding should be small than what is in the className of nav
        const newNavPadding = tailwindConfig.theme.spacing[4];

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
                toBg: tailwindConfig.theme.backgroundColor.dark.DEFAULT,
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
                className="transition fixed z-20 nav-transparent bg-texture flex justify-between items-center p-6 top-0 w-full">
                <Link href="/" className="flex gap-1 items-center">
                    <FaCircleNotch className="fill-yellow-400" />
                    <span className="font-semibold text-xl">Beco</span>
                </Link>

                <button
                    disabled={isMenuBtnDisabled}
                    aria-controls="mobile-navigation"
                    aria-disabled={isMenuBtnDisabled ? "true" : "false"}
                    aria-expanded={isMobileMenuOpen ? "true" : "false"}
                    onClick={() => {
                        setIsMobileMenuOpen((prev) => !prev);
                        handleNavAnimation();
                    }}
                    className={`${menuBtnTheme} relative menu-btn grid place-items-center rounded-full w-10 aspect-square`}
                    ref={menuBtnRef}>
                    <span className="sr-only">
                        {isMobileMenuOpen ? "hide menu" : "show menu"}
                    </span>
                    <div className="absolute w-4 h-[1.5px] top-[45%] origin-center pointer-events-none"></div>
                    <div className="absolute w-4 h-[1.5px] top-[55%] origin-center pointer-events-none"></div>
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
