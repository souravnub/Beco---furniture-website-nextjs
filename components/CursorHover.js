import React, { useEffect, useRef } from "react";
import { useCursor } from "../contexts/cursorContext";

const CursorHover = ({ fill, scale, content, children, ...props }) => {
    const { setFill, setScale, setContent, resetCursorStates } = useCursor();
    const wrapperRef = useRef();

    function handleMouseIn() {
        setFill(fill);
        setScale(scale);
        setContent(content);
    }

    function handleMouseOut() {
        resetCursorStates();
    }

    useEffect(() => {
        wrapperRef.current.addEventListener("mouseout", handleMouseOut);
        wrapperRef.current.addEventListener("mouseover", handleMouseIn);
        return () => {
            wrapperRef.current.removeEventListener("mouseout", handleMouseOut);
            wrapperRef.current.removeEventListener("mouseover", handleMouseIn);
        };
    }, []);

    return (
        <div
            className="inline-block"
            aria-hidden="true"
            ref={wrapperRef}
            {...props}>
            {children}
        </div>
    );
};

export default CursorHover;
