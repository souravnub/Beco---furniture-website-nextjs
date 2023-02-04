import { createContext, useContext, useState } from "react";

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

    function resetCursorStates() {
        setFill(undefined);
        setScale(1);
        setContent(undefined);
    }

    return {
        fill,
        setFill,
        scale,
        setScale,
        content,
        setContent,
        resetCursorStates,
    };
}
