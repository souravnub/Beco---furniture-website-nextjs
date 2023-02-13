import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { useCursor } from "../contexts/cursorContext";
import { useNav } from "../contexts/navContext";
import getTaliwind from "../utils/getTaliwind";

gsap.registerPlugin(ScrollTrigger);

const Section = ({
    children,
    navClass,
    cursorBorderColor,
    menuBtnTheme = "dark",
    refreshScrollTrigger = [],
    ...props
}) => {
    const sectionRef = useRef();
    const scrollTriggerRef = useRef();

    const { setBorderColor } = useCursor();
    const { setNavType, navHeight, setMenuBtnTheme } = useNav();

    useEffect(() => {
        function handleCursorBorder() {
            setBorderColor(cursorBorderColor);
        }
        function setBorderColorToDefault() {
            setBorderColor(getTaliwind.theme.borderColor.brand[500]);
        }
        if (cursorBorderColor) {
            sectionRef.current.addEventListener(
                "mouseover",
                handleCursorBorder
            );
            sectionRef.current.addEventListener(
                "mouseleave",
                setBorderColorToDefault
            );
        }
        return () => {
            if (cursorBorderColor) {
                sectionRef.current.removeEventListener(
                    "mouseover",
                    handleCursorBorder
                );
                sectionRef.current.removeEventListener(
                    "mouseleave",
                    setBorderColorToDefault
                );
            }
        };
    }, []);

    useEffect(() => {
        scrollTriggerRef.current?.refresh();
    }, [...refreshScrollTrigger]);

    useEffect(() => {
        if (navHeight !== undefined) {
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: `top +=${navHeight}`,
                end: `bottom +=${navHeight}`,

                onEnter: () => {
                    setNavType(navClass || "nav-white");
                    setMenuBtnTheme(menuBtnTheme);
                },
                onEnterBack: () => {
                    setNavType(navClass || "nav-white");
                    setMenuBtnTheme(menuBtnTheme);
                },
            });
        }
        return () => {
            scrollTriggerRef.current?.kill();
        };
    }, [navHeight]);

    return (
        <section ref={sectionRef} {...props}>
            {children}
        </section>
    );
};

export default Section;
