import { useState, createContext, useContext, useEffect } from "react";
import getTaliwind from "../utils/getTaliwind";

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
    const [initialNavHeight, setInitialNavHeight] = useState(0);
    const [navCursorBorderColor, setNavCursorBorderColor] = useState(
        getTaliwind.theme.borderColor.brand[500]
    );

    return {
        navType,
        setNavType,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        navHeight,
        setNavHeight,
        navTypeBeforeMenuOpen,
        setNavTypeBeforeMenuOpen,
        menuBtnTheme,
        setMenuBtnTheme,
        initialNavHeight,
        setInitialNavHeight,
        navCursorBorderColor,
        setNavCursorBorderColor,
    };
}
