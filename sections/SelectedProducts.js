import React, { useEffect, useRef } from "react";
import Section from "../components/Section";
import ProductCard from "../components/ProductCard";
import { MdCallMissedOutgoing } from "react-icons/md";
import CursorHover from "../components/CursorHover";
import gsap from "gsap";

const products = [
    {
        id: 1,
        name: "White Couches",
        price: "$25.3",
        img: "https://images.unsplash.com/photo-1506326426992-32b61983f2fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fGZ1cm5pdHVyZSUyMHBsYWluJTIwYmFja2dvcnVuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
        cursorFill: "yellow",
        cursorColor: "black",
    },
    {
        id: 2,
        name: "Queen's Sofa",
        price: "$25.3",
        img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c29mYXxlbnwwfDF8MHx8&auto=format&fit=crop&w=2000&q=60",
        cursorFill: "black",
        cursorColor: "white",
    },
];

const SelectedProducts = () => {
    const headingRef = useRef();
    const sectionIntroRef = useRef();

    useEffect(() => {
        gsap.fromTo(
            [
                sectionIntroRef.current,
                headingRef.current.querySelector("h1"),
                headingRef.current.querySelector("p"),
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
                    trigger: headingRef.current,
                    start: "top 85%",
                },
            }
        );
    }, []);

    return (
        <Section
            className="bg-texture px-3 pt-24 pb-12"
            navClass="nav-white"
            menuBtnTheme="dark">
            {/* header below */}
            <div className="flex flex-col gap-y-3 md:flex-row md:justify-between">
                <span className="text-sm font-semibold" ref={sectionIntroRef}>
                    Selected products
                </span>

                <div ref={headingRef} className="md:w-7/12 md:min-w-[25rem]">
                    <h1 className="text-5xl font-bold sm:text-6xl">
                        Best crafted furniture that sets you apart
                    </h1>

                    <p className="mt-4 text-sm font-semibold text-gray-900">
                        Browse the quality products, that will get you going
                    </p>
                </div>
            </div>

            {/* products container */}
            <div className="flex flex-wrap justify-center gap-x-28 px-10 md:justify-start">
                {products.map(
                    ({ id, name, price, img, cursorFill, cursorColor }) => {
                        return (
                            <ProductCard
                                key={id}
                                name={name}
                                price={price}
                                img={img}
                                cursorFill={cursorFill}
                                cursorColor={cursorColor}
                            />
                        );
                    }
                )}
            </div>

            <div className="mt-16 flex justify-center">
                <CursorHover borderColor="transparent" className="inline-block">
                    <button className="group relative isolate flex aspect-square items-center gap-2 overflow-hidden rounded-full border border-dark p-6 text-sm font-semibold text-gray-900 transition duration-500 hover:border-transparent focus:border-transparent">
                        <MdCallMissedOutgoing className="text-2xl" />
                        All products
                        {/* btn fill */}
                        <div
                            aria-hidden="true"
                            className="absolute top-1/2 left-1/2 -z-10 aspect-square w-full -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-brand transition duration-500 group-hover:scale-100 group-focus:scale-100"></div>
                    </button>
                </CursorHover>
            </div>
        </Section>
    );
};

export default SelectedProducts;
