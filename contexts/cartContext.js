import { createContext, useContext, useState } from "react";

const cartContext = createContext();

export function ProvideCartStates({ children }) {
    const values = useCartStates();
    return (
        <cartContext.Provider value={values}>{children}</cartContext.Provider>
    );
}

export function useCart() {
    return useContext(cartContext);
}

function useCartStates() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    return {
        isCartOpen,
        setIsCartOpen,
        cart,
        setCart,
    };
}
