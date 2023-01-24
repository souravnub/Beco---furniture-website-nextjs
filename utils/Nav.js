import { useState, createContext, useContext } from "react";

const navContext = createContext();

export function ProvideNavState({ children }) {
    const values = navStates();
    return <navContext.Provider value={values}>{children}</navContext.Provider>;
}

export const useNav = () => {
    return useContext(navContext);
};

function navStates() {
    const [isNavThemeDark, setIsNavThemeDark] = useState(false);

    return {
        isNavThemeDark,
        setIsNavThemeDark,
    };
}
