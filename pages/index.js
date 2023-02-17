import gsap from "gsap";
import { useEffect, useRef } from "react";
import Section from "../components/Section";
import Contact from "../sections/Contact";
import FactsSection from "../sections/FactsSection";
import Hero from "../sections/Hero";
import QueriesSection from "../sections/QueriesSection";
import SelectedProducts from "../sections/SelectedProducts";

export default function Home() {
    const approachSectionRef = useRef();

    useEffect(() => {
        gsap.fromTo(
            [
                approachSectionRef.current.querySelector(":scope > span"),
                approachSectionRef.current.querySelector("div > h1"),
                approachSectionRef.current.querySelector("div > p"),
            ],
            {
                opacity: 0,
                y: 40,
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                ease: "power",
                scrollTrigger: {
                    trigger: approachSectionRef.current,
                    start: "top 85%",
                },
            }
        );
    }, []);
    return (
        <>
            {/* remb : make the first section a normal section */}
            <Hero />
            <SelectedProducts />

            <Section navClass="nav-white" menuBtnTheme="dark">
                <div
                    ref={approachSectionRef}
                    className="flex flex-col gap-y-3 bg-texture px-4 pt-32 pb-40 md:flex-row md:justify-between">
                    <span className="text-sm font-bold">Our approach</span>
                    <div className="md:w-7/12 md:min-w-[25rem]">
                        <h1 className="mb-5 text-5xl font-bold">
                            We support you in making your dream home.
                        </h1>
                        <p>
                            We analyze projects from a fresh perspective. Our
                            experts in analytics, marketing and design will give
                            you a 360-degree view of the possible hurdles, along
                            with a way to overcome them professionally.
                        </p>
                    </div>
                </div>
            </Section>

            <FactsSection />

            <QueriesSection />

            <Contact />
        </>
    );
}
