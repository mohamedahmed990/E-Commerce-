import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './Authentication';

export const cartContext = createContext();

export default function CartProvider({ children }) {
    const { token } = useContext(authContext)
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [cartProductslist, setCartProductslist] = useState(null);
    const [cartId, setCartId] = useState(null)

    useEffect(() => {
        getCartProducts();
    }, [token])
    async function addToCart(id) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
                productId: id
            }, {
                headers: {
                    token: token
                }
            });
            setTotalCartPrice(data.data.totalCartPrice)
            setNumOfCartItems(data.numOfCartItems)
            setCartProductslist(null);
            return data;
        } catch (error) {

        }
    }
    async function getCartProducts() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: token,
                }
            });
            setCartId(data.data._id);
            setCartProductslist(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            return data;
        } catch (response) {
            if (response?.response?.data?.message.includes("No cart exist for this user")){
                // console.log("No cart exist for this user");
                setCartProductslist([]);
            }   
        }
    }

    async function removeItem(id) {


        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: {
                    token: token
                }
            })
            setCartProductslist(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            return data;
        } catch (error) {
        }
    }

    async function updateCartProductQuantity(id, count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                count: count
            }, {
                headers: {
                    token: token
                }
            });
            setCartProductslist(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            return data;
        } catch (error) {
        }
    }
    async function clearUserCart() {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: token
                }
            });
            resetData();
            return data;
        } catch (error) {
        }
    }
    function resetData(){
        setCartProductslist([]);
        setNumOfCartItems(0);
        setTotalCartPrice(0);
    }

    return <>
        <cartContext.Provider value={{
            addToCart,
            numOfCartItems,
            totalCartPrice,
            cartProductslist,
            removeItem,
            getCartProducts,
            updateCartProductQuantity,
            clearUserCart,
            cartId,
            resetData
        }}>
            {children}
        </cartContext.Provider>
    </>
}
