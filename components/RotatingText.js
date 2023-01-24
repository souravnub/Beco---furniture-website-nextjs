import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const RotatingText = ({ children, text, spacing, textSpacing = 10 }) => {
    const textRef = useRef();
    const mainContainerRef = useRef();

    useEffect(() => {
        // have to wait for the fonts to load ,, because that will affect the width of the textContainer
        document.fonts.onloadingdone = setRotatingText();
    }, []);
    useEffect(() => {
        setRotatingText();
    }, [children]);

    function setRotatingText() {
        const textContainerWidth =
            mainContainerRef.current.getBoundingClientRect().width;
        textRef.current.innerHTML = text
            .split("")
            .map(
                (word, i) =>
                    `<span style="transform: rotate(${
                        i * textSpacing
                    }deg);transform-origin: 0 ${
                        textContainerWidth / 2
                    }px; position: absolute; left: 50%">${word}</span>`
            )
            .join("");
    }

    return (
        <div
            ref={mainContainerRef}
            style={{ padding: spacing }}
            className="p-6 relative aspect-square rounded-full flex items-center justify-center">
            <div className="aspect-square rounded-full">{children}</div>
            <motion.p
                animate={{
                    rotate: 360,
                    transition: {
                        repeat: Infinity,
                        duration: 9,
                        ease: "linear",
                    },
                }}
                ref={textRef}
                className="absolute w-full h-full"></motion.p>
        </div>
    );
};

export default RotatingText;
