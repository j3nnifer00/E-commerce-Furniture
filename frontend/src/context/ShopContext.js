import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(() => {
        // localStorage에서 초기 cartItems를 가져오는 함수
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : {};
    });

    const [totalPrice, setTotalPrice] = useState();


    useEffect(() => {
        // cartItems가 업데이트될 때마다 localStorage에 저장
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        const totalPrice = getTotalPrice(); // 총 가격 계산
        setTotalPrice(totalPrice); 

    }, [cartItems]);

    const addToCart = (productId, quantity = 1, productPrice, productStock) => {
        let addedSuccessfully = false;

        setCartItems((prevCartItems) => {
            const currentQuantity = prevCartItems[productId]?.quantity || 0; // if no, then 0
            

            if (quantity === 0) { // if it is trying to add 0 product
                return prevCartItems;
            } else if (currentQuantity + quantity > productStock) { // if it is trying to add more than available stock
                return prevCartItems; 
            }

            addedSuccessfully = true;

            return {
                ...prevCartItems,
                [productId]: {
                    price: productPrice, 
                    quantity: currentQuantity + quantity},
            };
        });

        // 정상적으로 추가된 경우 true 반환
        return addedSuccessfully;
    };

    const removeFromCart = (productId) => {
        setCartItems((prevCartItems) => {
            const updatedCart = { ...prevCartItems };
            const currentQuantity = updatedCart[productId]?.quantity || 0;

            if (currentQuantity > 1) {
                updatedCart[productId].quantity -= 1;
            } else {
                delete updatedCart[productId];
            }

            return updatedCart;
        });
    };

    const deleteFromCart = (productId) => {
        setCartItems((prevCartItems) => {
            const updatedCart = { ...prevCartItems };
            delete updatedCart[productId];
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCartItems({}); // empty memory
        localStorage.removeItem('cartItems'); // remove it from local Storage
    };

    const getTotalPrice = () => {
        return Object.keys(cartItems).reduce((total, productId) => {
            const { price, quantity } = cartItems[productId]
            return total + price * quantity;
        }, 0);
    };


    const contextValue = { cartItems, totalPrice, setCartItems, addToCart, removeFromCart, deleteFromCart, clearCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}
