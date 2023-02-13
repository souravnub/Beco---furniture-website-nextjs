import React from "react";
import Section from "../components/Section";

const FactsSection = () => {
    return (
        <Section
            navClass="nav-dark"
            menuBtnTheme="light"
            className="flex flex-col gap-y-3 bg-dark bg-texture  py-24 px-4 text-gray-50 md:flex-row md:justify-between">
            <span className="text-sm font-bold">Facts & figures</span>

            <div className="md:w-8/12 md:min-w-[25rem]">
                <h1 className="mb-16 text-4xl font-bold md:text-5xl lg:text-6xl">
                    We are inspired to reach even greater heights when our
                    clients share project results with us.
                </h1>

                <div aria-hidden="true" className="h-px bg-dark-fade"></div>

                <ul className="my-20 flex flex-wrap gap-10 md:gap-20">
                    <li>
                        <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:mb-6 md:text-5xl">
                            $16M+
                        </h1>
                        <p>Over $16m in investments raised by our clients</p>
                    </li>
                    <li>
                        <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:mb-6 md:text-5xl">
                            4.9
                        </h1>
                        <p>
                            An average rating of 4.9 combined for all the
                            products
                        </p>
                    </li>

                    <li>
                        <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:mb-6 md:text-5xl">
                            # 1
                        </h1>
                        <p>
                            Number one seller on the list of best quality
                            furniture 2022.
                        </p>
                    </li>
                </ul>

                <div aria-hidden="true" className="h-px bg-dark-fade"></div>

                <div className="mt-14">
                    <span className="text-md mb-5 inline-block font-bold">
                        Proud to be partner with:
                    </span>
                    <ul className="flex flex-wrap gap-10">
                        <li className="rounded-md bg-dark-fade px-8 py-4 text-sm font-semibold capitalize text-dark">
                            company logo
                        </li>
                        <li className="rounded-md bg-dark-fade px-8 py-4 text-sm font-semibold capitalize text-dark">
                            company logo
                        </li>
                        <li className="rounded-md bg-dark-fade px-8 py-4 text-sm font-semibold capitalize text-dark">
                            company logo
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    );
};

export default FactsSection;
