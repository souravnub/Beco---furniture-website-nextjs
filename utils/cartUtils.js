export function getIncreasedProductQuantityCart(cart, productId, increment) {
    return cart.map((product) => {
        if (product.id === productId) {
            product.quantity += increment;
        }
        return product;
    });
}

export function getDecreasedProductQuanitityCart(cart, productId, decrement) {
    return cart.filter((product) => {
        if (product.id === productId) {
            if (product.quantity - decrement <= 0) {
                return null;
            } else {
                product.quantity -= decrement;
            }
        }

        return product;
    });
}

export function getRemovedProductCart(cart, productId) {
    return cart.filter((product) => product.id !== productId);
}

export function getCartWithAddedProduct(cart, product, quantity) {
    if (cart.find((item) => item.id === product.id)) {
        return cart.map((item) => {
            if (item.id === product.id) {
                product.quantity += quantity || 1;
            }
            return product;
        });
    } else {
        return [...cart, product];
    }
}

export function getCartLength(cart) {
    let length = 0;
    cart.forEach((item) => {
        length += item.quantity;
    });
    return length;
}
