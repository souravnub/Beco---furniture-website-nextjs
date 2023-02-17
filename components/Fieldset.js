import React, { useRef } from "react";
import gsap from "gsap";
import { getTailwindColors } from "../utils/getTailwind";

const Fieldset = ({ title, radioGroup, data, onChange }) => {
    const radioContainerRef = useRef();
    const currentEleHoverAni = useRef();

    function handleRadioSelect() {
        Array.from(radioContainerRef.current.children).forEach((labelEle) => {
            if (labelEle.querySelector(":scope > input").checked) {
                gsap.to(labelEle, {
                    backgroundColor: "white",

                    color: getTailwindColors.dark.DEFAULT,
                    duration: 0.4,
                });
            } else {
                currentEleHoverAni.current?.revert();
                gsap.to(labelEle, {
                    backgroundColor: getTailwindColors.dark[100],
                    color: "white",
                    duration: 0.4,
                });
            }
        });
    }

    let hoverAni = (ele) => {
        return gsap.fromTo(
            ele,
            { opacity: 1 },
            {
                opacity: 0.5,
                duration: 0.2,
            }
        );
    };

    function handleRadioHover(e) {
        if (!e.target.querySelector(":scope > input")?.checked) {
            currentEleHoverAni.current = hoverAni(e.target);
        }
    }
    function handleRadioMouseOut(e) {
        currentEleHoverAni.current.reverse();
    }

    return (
        <fieldset onChange={(e) => onChange(e)} className="mt-12">
            <legend className="mb-4">{title}</legend>

            <div className="flex flex-wrap gap-3" ref={radioContainerRef}>
                {data.map(({ title, id, value }) => {
                    return (
                        <label
                            key={id}
                            htmlFor={id}
                            onMouseEnter={handleRadioHover}
                            onMouseLeave={handleRadioMouseOut}
                            className="group inline-block min-w-max flex-1 cursor-pointer rounded-full bg-dark-100 px-4 py-2 text-center text-white">
                            <span>{title}</span>
                            <input
                                id={id}
                                type="radio"
                                name={radioGroup}
                                value={value}
                                className="appearance-none"
                                onChange={handleRadioSelect}
                            />
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
};

export default Fieldset;
