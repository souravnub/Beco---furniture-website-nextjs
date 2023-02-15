import React, { useEffect, useRef } from "react";
import { useCursor } from "../contexts/cursorContext";

const CursorHover = ({ hoverStates, exitStates, children, ...props }) => {
    const { setCursorStates } = useCursor();
    const wrapperRef = useRef();

    function handleMouseIn() {
        setCursorStates(hoverStates);
    }

    function handleMouseOut() {
        setCursorStates(exitStates);
    }

    useEffect(() => {
        wrapperRef.current.addEventListener("mouseleave", handleMouseOut);
        wrapperRef.current.addEventListener("mouseenter", handleMouseIn);
        return () => {
            wrapperRef.current.removeEventListener(
                "mouseleave",
                handleMouseOut
            );
            wrapperRef.current.removeEventListener("mouseenter", handleMouseIn);
        };
    }, []);

    return (
        <div className="inline-block" ref={wrapperRef} {...props}>
            {children}
        </div>
    );
};

export default CursorHover;
