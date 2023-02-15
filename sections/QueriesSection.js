import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Section from "../components/Section";
import Accordion from "../components/Accordion";
import { useNav } from "../contexts/navContext";
import CursorHover from "../components/CursorHover";
import getTailwind, { getTailwindColors } from "../utils/getTailwind";

const queries = [
    {
        id: 1,
        title: "How much time it take to make a bed?",
        desc: "It depends on the type. But we complete building a bed in 25-30days.",
    },
    {
        id: 2,
        title: "Who is the CEO of Beco?",
        desc: "The CEO is the one-n-only SouravNub.",
    },
];

const QueriesSection = () => {
    const headingRef = useRef();
    const { setNavCursorBorderColor } = useNav();

    useEffect(() => {
        gsap.fromTo(
            headingRef.current.querySelectorAll(":scope > span > span"),
            {
                y: "100%",
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 90%",
                },
            }
        );
    }, []);

    return (
        <Section
            cursorStates={{ borderColor: "black" }}
            cursorExitStates={{
                borderColor: getTailwindColors.brand[500],
            }}
            onInView={() => {
                // when ever this section will be in view the cursor border color for nav will be set to white;
                setNavCursorBorderColor("white");
            }}
            navClass="nav-brand"
            menuBtnTheme="dark"
            className="bg-brand-500 bg-texture pt-28 pb-12">
            <h1
                className="flex flex-wrap justify-center gap-x-5 text-4xl font-bold sm:text-6xl md:text-7xl"
                ref={headingRef}>
                <span className="overflow-hidden">
                    <span className="inline-block">Furniture</span>
                </span>
                <span className="overflow-hidden  text-white">
                    <span className="inline-block">Making,</span>
                </span>
                <span className="overflow-hidden  text-white">
                    <span className="inline-block">Manufacturing</span>
                </span>
                <span className="overflow-hidden  ">
                    <span className="inline-block">&</span>
                </span>
                <span className="overflow-hidden ">
                    <span className="inline-block text-white">Designing</span>
                </span>
                <span className="overflow-hidden  ">
                    <span className="inline-block">made easy</span>
                </span>
            </h1>

            <div className="mt-14 px-2 md:px-4">
                <span className="font-semibold ">
                    have a query? This list of FAQ might help you out
                </span>

                <Accordion data={queries} className="mt-6 mb-10" />

                <span className="font-semibold ">
                    still wondering about something? Feel free to{" "}
                    <CursorHover
                        hoverStates={{
                            scale: 3,
                            borderColor: "white",
                        }}
                        exitStates={{
                            borderColor: "black",
                            scale: 1,
                        }}>
                        <Link href="/contact" className="text-white">
                            contact us
                        </Link>
                    </CursorHover>
                </span>
            </div>
        </Section>
    );
};

export default QueriesSection;
