import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useCursor } from "../contexts/cursorContext";
import resolveConfig from "tailwindcss/resolveConfig";
import myConfig from "../tailwind.config";
import getPxVal from "../utils/getPxVal";

const Cursor = () => {
    const cursorRef = useRef();
    const contentRef = useRef();

    const { fill, scale, content } = useCursor();
    const [isCursorInWindow, setIsCursorInWindow] = useState(false);
    const tailwindConfig = resolveConfig(myConfig);

    function animateCursor({ clientX: x, clientY: y }) {
        return gsap.to(cursorRef.current, {
            opacity: 1,
            left: x,
            top: y,
            duration: 0,
        });
    }
    function hideCuror() {
        return gsap.to(cursorRef.current, {
            opacity: 0,
        });
    }

    function handleCursorOutOfWindow() {
        setIsCursorInWindow(false);
    }
    function handleCursorIntoWindow() {
        setIsCursorInWindow(true);
    }

    useEffect(() => {
        window.addEventListener("mouseout", handleCursorOutOfWindow);
        window.addEventListener("mouseover", handleCursorIntoWindow);
        return () => {
            window.removeEventListener("mouseout", handleCursorOutOfWindow);
            window.removeEventListener("mouseover", handleCursorIntoWindow);
        };
    }, []);

    // animations for cursorHoverComponent
    useEffect(() => {
        const cursorWidth = getPxVal(tailwindConfig.theme.width[5]);

        const timeline = gsap.timeline().to(cursorRef.current, {
            backgroundColor: fill || "transparent",
            width: cursorWidth * scale,
            duration: 0.2,
        });
        const contentAni = gsap.fromTo(
            contentRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.15, paused: true, ease: "none" }
        );

        timeline.add(contentAni, ">-0.2");

        if (content) {
            contentAni.play();
        }
    }, [fill, content, scale]);

    useEffect(() => {
        if (isCursorInWindow) {
            window.addEventListener("mousemove", animateCursor);
        } else {
            hideCuror();
            window.removeEventListener("mousemove", animateCursor);
        }
    }, [isCursorInWindow]);

    return (
        <div
            ref={cursorRef}
            area-hidden="true"
            className="pointer-events-none fixed border-2 border-yellow-500 w-5 aspect-square rounded-full z-50 -translate-x-1/2 -translate-y-1/2 hidden md:inline-block">
            <div
                ref={contentRef}
                className="absolute flex items-center justify-center inset-0 opacity-0">
                {content}
            </div>
        </div>
    );
};

export default Cursor;
