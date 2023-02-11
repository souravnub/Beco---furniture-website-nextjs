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
      className={`fixed inset-0 z-10 bg-dark bg-texture text-white opacity-0 md:hidden`}
    >
      {links.map(({ href, text }) => {
        return (
          <div
            key={href}
            className="group relative isolate border-t border-dark p-5 after:absolute after:inset-0 after:-z-10 after:origin-top after:scale-y-0 after:bg-white after:transition-transform after:duration-300 after:content-[''] first:mt-1 focus-within:after:scale-y-100 hover:after:scale-y-100"
          >
            <div className="overflow-hidden">
              <Link
                href={href}
                className=" block text-3xl font-bold mix-blend-difference"
              >
                {text}
              </Link>
            </div>
          </div>
        );
      })}
      <Link
        href={"/contact"}
        className="group mt-5 ml-5 grid aspect-square w-fit grid-flow-col place-content-center items-center gap-3 rounded-full bg-brand p-5 text-black"
      >
        <div className="relative aspect-square w-4" aria-hidden="true">
          <HiOutlineArrowRight className="absolute opacity-100 transition duration-700 group-hover:translate-x-full group-hover:opacity-0 group-focus:translate-x-full group-focus:opacity-0" />
          <HiOutlineArrowRight className="absolute right-full opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100 group-focus:translate-x-full group-focus:opacity-100" />
        </div>
        Have an Idea?
      </Link>
    </ul>
  );
};

export default MobileMenu;
