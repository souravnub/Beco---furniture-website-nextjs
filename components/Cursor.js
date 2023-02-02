import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const Cursor = () => {
    const cursorRef = useRef();
    const [isCursorInWindow, setIsCursorInWindow] = useState(false);

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
            className="pointer-events-none fixed border-2 border-yellow-500 w-5 aspect-square rounded-full z-50 -translate-x-1/2 -translate-y-1/2 hidden md:inline-block "></div>
    );
};

export default Cursor;
