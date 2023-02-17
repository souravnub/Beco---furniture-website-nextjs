import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const TextArea = ({
    id,
    required,
    showCharLength,
    maxChar = 1000,
    onChange,
    label,
    className,
    containerClassName,
    ...props
}) => {
    const inputRef = useRef();
    const labelRef = useRef();
    const labelAniRef = useRef();

    const [value, setValue] = useState("");
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const [isInputInFocus, setIsInputInFocus] = useState(false);

    useEffect(() => {
        const labelAniTimeline = gsap.timeline({
            defaults: { ease: "power.inOut", duration: 0.25 },
        });
        labelAniTimeline
            .to(labelRef.current.querySelector(":scope > span"), {
                transformOrigin: "left",
                opacity: 0.6,
                scale: 0.7,
            })
            .to(
                labelRef.current,
                {
                    top: 0,
                    y: "-35%",
                },
                "<"
            );

        labelAniRef.current = labelAniTimeline;
    }, []);

    useEffect(() => {
        if (isInputInFocus && !isInputEmpty) {
            labelAniRef.current.play();
        } else if (isInputInFocus && isInputEmpty) {
            labelAniRef.current.play();
        } else if (!isInputInFocus && !isInputEmpty) {
            labelAniRef.current.play();
        } else if (!isInputInFocus && isInputEmpty) {
            labelAniRef.current.reverse();
        }
    }, [isInputEmpty, isInputInFocus]);

    function handleChange(e) {
        setValue(e.target.value);
        if (e.target.value !== "") {
            setIsInputEmpty(false);
        } else {
            setIsInputEmpty(true);
        }

        onChange && onChange(e);
    }

    return (
        <div className={`relative text-lg ${containerClassName}`}>
            <label
                ref={labelRef}
                htmlFor={id}
                className="pointer-events-none absolute top-0 left-0 -translate-y-1/2 overflow-hidden text-base">
                <span className="inline-block">
                    {label}
                    {required && (
                        <span className="text-brand" aria-hidden="true">
                            *
                        </span>
                    )}
                </span>
            </label>
            <textarea
                ref={inputRef}
                id={id}
                aria-required={required}
                {...props}
                onFocus={() => setIsInputInFocus(true)}
                onBlur={() => setIsInputInFocus(false)}
                onChange={(e) => handleChange(e)}
                className={`rounded-none border-b bg-transparent py-1 focus:outline-none ${className}`}></textarea>
            {showCharLength && (
                <span className="absolute bottom-0 right-0 translate-y-full text-sm opacity-60">
                    <span className="sr-only">
                        word count should be a maximum of {maxChar}, your world
                        count is {value.length}
                    </span>
                    <span aria-hidden="true">
                        {value.length} / {maxChar}
                    </span>
                </span>
            )}
        </div>
    );
};

export default TextArea;
