import React, { useEffect, useRef } from "react";
import { useCursor } from "../contexts/cursorContext";

const CursorHover = ({
    hoverStates,
    disabled,
    exitStates,
    children,
    ...props
}) => {
    const { setCursorStates } = useCursor();
    const wrapperRef = useRef();

    function handleMouseIn() {
        setCursorStates(hoverStates);
    }

    function handleMouseOut() {
        setCursorStates(exitStates);
    }

    useEffect(() => {
        if (disabled) return;
        wrapperRef.current.addEventListener("mouseleave", handleMouseOut);
        wrapperRef.current.addEventListener("mouseenter", handleMouseIn);
        return () => {
            wrapperRef.current?.removeEventListener(
                "mouseleave",
                handleMouseOut
            );
            wrapperRef.current?.removeEventListener(
                "mouseenter",
                handleMouseIn
            );
        };
    }, [
        hoverStates.fill,
        hoverStates.borderColor,
        hoverStates.scale,
        hoverStates.content,
        exitStates.fill,
        exitStates.borderColor,
        exitStates.scale,
        exitStates.content,
        disabled,
    ]);

    return (
        <div className="inline-block" ref={wrapperRef} {...props}>
            {children}
        </div>
    );
};

export default CursorHover;
