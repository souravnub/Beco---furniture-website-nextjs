import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getTailwindColors } from "../utils/getTailwind";

const Fieldset = ({ title, radioGroup, data, getVal }) => {
    const radioContainerRef = useRef();
    const currentEleHoverAni = useRef();

    const [value, setValue] = useState(data.find((obj) => obj.DEFAULT).value);

    useEffect(() => {
        getVal(value);
    }, [value]);

    useEffect(() => {
        Array.from(radioContainerRef.current.children).forEach((labelEle) => {
            const input = labelEle.querySelector(":scope > input");
            if (input.getAttribute("data-default") === "default") {
                input.checked = true;
                input.setAttribute("aria-checked", "true");
            } else {
                input.setAttribute("aria-checked", "false");
            }
        });
        setRadioAnimations();
    }, []);

    function setRadioAnimations() {
        Array.from(radioContainerRef.current.children).forEach((labelEle) => {
            const radioInput = labelEle.querySelector(":scope > input");
            if (radioInput.checked) {
                radioInput.setAttribute("aria-checked", "true");
                gsap.to(labelEle, {
                    backgroundColor: "white",

                    color: getTailwindColors.dark.DEFAULT,
                    duration: 0.4,
                });
            } else {
                radioInput.setAttribute("aria-checked", "false");
                gsap.to(labelEle, {
                    backgroundColor: getTailwindColors.dark[100],
                    color: "white",
                    duration: 0.4,
                });
            }
        });
    }

    function handleRadioSelect() {
        setRadioAnimations();
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
        currentEleHoverAni.current?.reverse();
    }

    return (
        <fieldset
            onChange={(e) => {
                setValue(e.target.value);
            }}
            value={value}
            className="mt-12">
            <legend className="mb-4">{title}</legend>

            <div className="flex flex-wrap gap-3" ref={radioContainerRef}>
                {data.map(({ title, id, value, DEFAULT }) => {
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
                                data-default={DEFAULT && "default"}
                            />
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
};

export default Fieldset;
