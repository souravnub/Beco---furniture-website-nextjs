import React from "react";
import { FaPlay } from "react-icons/fa";
import RotatingText from "./RotatingText";

const Hero = () => {
    return (
        <section className=" bg-black text-white text-5xl font-cursive">
            <div className="relative container py-10 capitalize flex flex-col gap-8 items-center">
                <div className="flex flex-col gap-3 items-center">
                    <h1>handcrafted</h1>
                    <div className="relative h-28 w-full overflow-hidden">
                        <img
                            className="absolute inset-0 px-5 "
                            src="https://images.unsplash.com/photo-1497219055242-93359eeed651?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29vZCUyMGNhcnZpbmd8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                            alt=""
                        />
                    </div>
                </div>
                <h1 className="text-6xl">furniture</h1>
                <div className="flex items-center gap-5">
                    <h1>only</h1>
                    <div className="relative h-20 w-36 overflow-hidden">
                        <img
                            className="absolute inset-0"
                            src="https://images.unsplash.com/photo-1600607687126-8a3414349a51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8ODN8MzYxODcwN3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
                            alt=""
                        />
                    </div>
                    <h1>for</h1>
                </div>
                <div className="flex justify-between w-full px-10">
                    <div className="font-normal text-[.65rem] font-mono normal-case">
                        <RotatingText
                            text="Sofas Wardrobes Dining Beds Seating"
                            spacing="1.4rem"
                            textSpacing={10.1}>
                            <div className="p-8 bg-white/10 w-full h-full flex items-center justify-center rounded-full">
                                <FaPlay size={20} />
                            </div>
                        </RotatingText>
                    </div>
                    <h1>you</h1>
                </div>
            </div>
        </section>
    );
};

export default Hero;
