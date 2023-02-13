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
    onInView,
    refreshScrollTrigger = [],
    ...props
}) => {
    const sectionRef = useRef();
    const scrollTriggerRef = useRef();

    const { setBorderColor } = useCursor();
    const { setNavType, navHeight, setMenuBtnTheme, setNavCursorBorderColor } =
        useNav();

    useEffect(() => {
        function handleCursorBorder() {
            setBorderColor(cursorBorderColor);
        }
        function setBorderColorToDefault() {
            setBorderColor(getTaliwind.theme.borderColor.brand[500]);
        }
        if (cursorBorderColor) {
            sectionRef.current.addEventListener(
                "mouseenter",
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
                    "mouseenter",
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
            function handleSectionInView() {
                setNavType(navClass || "nav-white");
                setMenuBtnTheme(menuBtnTheme);
                if (onInView) {
                    onInView();
                }
            }
            function handleSectionLeave() {
                setNavType("nav-white");
                setMenuBtnTheme("dark");
                setNavCursorBorderColor(
                    getTaliwind.theme.borderColor.brand[500]
                );
            }
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: `top +=${navHeight}`,
                end: `bottom +=${navHeight}`,

                onEnter: handleSectionInView,
                onEnterBack: handleSectionInView,
                onLeave: handleSectionLeave,
                onLeaveBack: handleSectionLeave,
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
