import { createContext, useContext, useState } from "react";
import getTailwind from "../utils/getTailwind";

const cursorContext = createContext();

export function ProvideCursorStates({ children }) {
    const values = useCursorStates();
    return (
        <cursorContext.Provider value={values}>
            {children}
        </cursorContext.Provider>
    );
}

export function useCursor() {
    return useContext(cursorContext);
}

function useCursorStates() {
    const [fill, setFill] = useState(undefined);
    const [scale, setScale] = useState(1);
    const [content, setContent] = useState(undefined);
    const [borderColor, setBorderColor] = useState(undefined);

    function setCursorStates({ borderColor, fill, scale, content }) {
        borderColor !== undefined && setBorderColor(borderColor);
        fill !== undefined && setFill(fill);
        scale !== undefined && setScale(scale);
        content !== undefined && setContent(content);
    }

    return {
        fill,
        scale,
        content,
        borderColor,
        setCursorStates,
    };
}
