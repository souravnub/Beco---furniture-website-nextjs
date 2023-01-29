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
    // navType will be a class that will define how the nav and it's elements will look like
    const [navType, setNavType] = useState(undefined);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [navHeight, setNavHeight] = useState(undefined);
    const [navTypeBeforeMenuOpen, setNavTypeBeforeMenuOpen] =
        useState(undefined);
    const [menuBtnTheme, setMenuBtnTheme] = useState("light");
    const [initialNavHeight, setInitialNavHeight] = useState(undefined);

    return {
        navType,
        setNavType,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        navHeight,
        setNavHeight,
        initialNavHeight,
        setInitialNavHeight,
        navTypeBeforeMenuOpen,
        setNavTypeBeforeMenuOpen,
        menuBtnTheme,
        setMenuBtnTheme,
    };
}
