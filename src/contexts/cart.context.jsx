import {createContext, useState, useEffect} from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
    if (existingCartItem) {
        return cartItems.map(item => (item.id === productToAdd.id) ? {...item, quantity: item.quantity +1 } : {...item})
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(item => item.id === productToRemove.id);
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(item => item.id !== productToRemove.id);
    }

    return cartItems.map(item => (item.id === productToRemove.id) ? {...item, quantity: item.quantity-1 } : {...item})
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(item => item.id !== cartItemToClear.id)


export const CartContext = createContext({
    IsCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({ children }) => {
    const [IsCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => item.quantity + total, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, item) => item.quantity * item.price + total, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearCartItem(cartItems, productToRemove))
    }

    const value = {IsCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal }

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}