import { createContext, useContext, useState } from "react";
import getTaliwind from "../utils/getTaliwind";

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

    function resetCursorStates() {
        setFill(undefined);
        setScale(1);
        setContent(undefined);
        setBorderColor(getTaliwind.theme.borderColor.brand[500]);
    }

    return {
        fill,
        setFill,
        scale,
        setScale,
        content,
        setContent,
        resetCursorStates,
        borderColor,
        setBorderColor,
    };
}
