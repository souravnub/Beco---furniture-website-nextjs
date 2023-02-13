import React, { useEffect, useRef } from "react";
import { useCursor } from "../contexts/cursorContext";

const CursorHover = ({
    fill,
    scale,
    content,
    borderColor,
    children,
    ...props
}) => {
    const { setFill, setScale, setContent, resetCursorStates, setBorderColor } =
        useCursor();
    const wrapperRef = useRef();

    function handleMouseIn() {
        setBorderColor(borderColor);
        setFill(fill);
        setScale(scale);
        setContent(content);
    }

    function handleMouseOut() {
        resetCursorStates();
    }

    useEffect(() => {
        wrapperRef.current.addEventListener("mouseleave", handleMouseOut);
        wrapperRef.current.addEventListener("mouseover", handleMouseIn);
        return () => {
            wrapperRef.current.removeEventListener(
                "mouseleave",
                handleMouseOut
            );
            wrapperRef.current.removeEventListener("mouseover", handleMouseIn);
        };
    }, []);

    return (
        <div className="inline-block" ref={wrapperRef} {...props}>
            {children}
        </div>
    );
};

export default CursorHover;
