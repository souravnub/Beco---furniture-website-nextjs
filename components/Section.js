import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { useNav } from "../contexts/navContext";

gsap.registerPlugin(ScrollTrigger);

const Section = ({
  children,
  navClass,
  menuBtnTheme = "dark",
  refreshScrollTrigger = [],
  ...props
}) => {
  const sectionRef = useRef();
  const scrollTriggerRef = useRef();

  const { setNavType, navHeight, setMenuBtnTheme } = useNav();

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
