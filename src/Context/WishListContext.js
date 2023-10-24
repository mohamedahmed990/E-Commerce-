import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "./Authentication";

export const wishlistContext = createContext()
export default function WishlistProvider({ children }) {
    const [wishlistProductsId, setWishlistProductsId] = useState([]);
    const [wishlistDetails, setWishlistDetails] = useState(null);
    const { token } = useContext(authContext);

    async function getUserWishlist() {
        try {
            if (token) {
                const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                    headers: {
                        token: token
                    }
                })
                setWishlistDetails(response.data.data);
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function removeProductFromWishlist(ProductId) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${ProductId}`, {
                headers: {
                    token: token
                }
            })
            console.log(data)
            if (data.status === "success") {
                await getUserWishlist();
                setWishlistProductsId(data.data);
                // console.log(wishlistProductsId);
                toast.success("Product removed from wishlist successfully", {
                    duration: 2000,
                });
            } else {
                toast.error("Error Occured", {
                    duration: 2000,
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function addProductToWishlist(ProductId) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
                "productId": ProductId
            }, {
                headers: {
                    token: token
                }
            })
            console.log(data)
            if (data.status === "success") {
                await getUserWishlist();
                setWishlistProductsId(data.data);
                // console.log(data.data);
                toast.success(data.message, {
                    duration: 2000,
                });
            } else {
                toast.error("Error Occured", {
                    duration: 2000,
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    return <>
        <wishlistContext.Provider value={{
            wishlistProductsId,
            setWishlistProductsId,
            getUserWishlist,
            addProductToWishlist,
            removeProductFromWishlist,
            wishlistDetails,
            setWishlistDetails
        }}>
            {children}
        </wishlistContext.Provider>
    </>

}