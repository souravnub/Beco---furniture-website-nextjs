import React, { useEffect, useRef } from "react";
import Input from "../components/Input";
import Section from "../components/Section";
import TextArea from "../components/TextArea";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import CursorHover from "../components/CursorHover";
import getTailwind, { getTailwindColors } from "../utils/getTailwind";
import Fieldset from "../components/Fieldset";
import Link from "next/link";

const data = [
    {
        id: "<10K",
        title: "Less than 10K",
        value: "<10K",
    },
    {
        id: "10K-50K",
        title: "10K - 50K",
        value: "10K-50K",
    },
    {
        id: ">50K",
        title: "More than 50K",
        value: ">50K",
    },
    {
        id: "none",
        title: "Not determined",
        value: "not determined",
    },
];

const Contact = () => {
    const nameValRef = useRef(null);
    const emailValRef = useRef(null);
    const projectIdeaValRef = useRef(null);
    const budgetValRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: nameValRef.current,
            email: emailValRef.current,
            projectIdeaDesc: projectIdeaValRef.current,
            budget: budgetValRef.current,
        };
        console.log(data);
    }

    return (
        <Section
            navClass="nav-white"
            className="flex flex-col gap-y-8 bg-dark bg-texture py-24 px-4 text-gray-50 md:flex-row  md:justify-between md:gap-x-8">
            <div>
                <span className="text-md font-semibold">Have an idea?</span>
                <h1 className="mt-1 text-6xl font-bold text-brand md:mt-2 lg:text-7xl">
                    Let's get in touch
                </h1>
                <CursorHover
                    className="mt-6 inline-block  md:mt-10"
                    hoverStates={{ scale: 3 }}
                    exitStates={{ scale: 1 }}>
                    <Link
                        href="/contact"
                        className="text-md group relative  py-1 font-semibold">
                        hello@beco.com
                        <span
                            className="absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 bg-brand transition duration-300 group-hover:scale-x-100"
                            aria-hidden="true"></span>
                    </Link>
                </CursorHover>
            </div>

            <div className="mt-6 md:w-8/12 md:min-w-[25rem]">
                <form onSubmit={handleSubmit}>
                    <div className="flex w-full flex-col gap-8 sm:flex-row md:gap-11">
                        <Input
                            onChange={(e) => {
                                nameValRef.current = e.target.value;
                            }}
                            required={true}
                            id="name"
                            label="Your Name"
                            type="text"
                            containerClassName="flex-1"
                            className="w-full"
                        />
                        <Input
                            onChange={(e) => {
                                emailValRef.current = e.target.value;
                            }}
                            required={true}
                            label="Your email"
                            type="email"
                            id="email"
                            containerClassName="flex-1"
                            className="w-full"
                        />
                    </div>
                    <TextArea
                        onChange={(e) => {
                            projectIdeaValRef.current = e.target.value;
                        }}
                        id="idea"
                        showCharLength={true}
                        label="tell us about your idea"
                        containerClassName="w-full mt-14"
                        className="w-full"
                    />

                    <Fieldset
                        title="Approx. Budget, USD"
                        radioGroup="budget"
                        data={data}
                        onChange={(e) => {
                            console.log(e.target.value);
                            budgetValRef.current = e.target.value;
                        }}
                    />

                    <CursorHover
                        hoverStates={{ borderColor: "transparent" }}
                        className="mt-16 inline-block"
                        exitStates={{
                            borderColor: getTailwindColors.brand[500],
                        }}>
                        <button className="flex items-center gap-1 rounded-full bg-white px-5 py-2  text-dark transition duration-300 hover:bg-brand-500 hover:text-white">
                            <HiOutlineArrowUpRight />
                            Submit
                        </button>
                    </CursorHover>
                </form>
            </div>
        </Section>
    );
};

export default Contact;
