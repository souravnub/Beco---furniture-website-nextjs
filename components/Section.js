import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { useNav } from "../contexts/navContext";

const Section = ({ children, navClass, menuBtnTheme = "dark", ...props }) => {
    const sectionRef = useRef();
    const { setNavType, navHeight, setMenuBtnTheme } = useNav();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        let scrollTrigger;
        if (navHeight !== undefined) {
            scrollTrigger = ScrollTrigger.create({
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
            scrollTrigger?.kill();
        };
    }, [navHeight]);

    return (
        <section ref={sectionRef} {...props}>
            {children}
        </section>
    );
};

export default Section;
