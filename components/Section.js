import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { useCursor } from "../contexts/cursorContext";
import { useNav } from "../contexts/navContext";
import { getTailwindColors } from "../utils/getTailwind";

gsap.registerPlugin(ScrollTrigger);

const Section = ({
    children,
    navClass,
    cursorStates,
    cursorExitStates,
    menuBtnTheme = "dark",
    onInView,
    ...props
}) => {
    const sectionRef = useRef();
    const scrollTriggerRef = useRef();

    const { setCursorStates } = useCursor();
    const { setNavType, navHeight, setMenuBtnTheme, setNavCursorBorderColor } =
        useNav();

    useEffect(() => {
        function handleCursorOver() {
            setCursorStates(cursorStates);
        }
        function handleCursorLeave() {
            setCursorStates(cursorExitStates);
        }
        if (cursorStates !== undefined || cursorExitStates !== undefined) {
            sectionRef.current.addEventListener("mouseenter", handleCursorOver);
            sectionRef.current.addEventListener(
                "mouseleave",
                handleCursorLeave
            );
        }
        return () => {
            if (cursorStates !== undefined || cursorExitStates !== undefined) {
                sectionRef.current?.removeEventListener(
                    "mouseenter",
                    handleCursorOver
                );
                sectionRef.current?.removeEventListener(
                    "mouseleave",
                    handleCursorLeave
                );
            }
        };
    }, []);

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
                setNavCursorBorderColor(getTailwindColors.brand[500]);
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
