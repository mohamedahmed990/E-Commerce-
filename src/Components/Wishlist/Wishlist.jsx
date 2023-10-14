import React, { useContext, useEffect } from 'react'
import Style from './Wishlist.module.css'
import { wishlistContext } from '../../Context/WishListContext'
import { authContext } from '../../Context/Authentication'
import { PacmanLoader } from 'react-spinners'
import { cartContext } from './../../Context/CartContext';
import { Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
export default function Wishlist() {
  const {
    wishlistDetails,
    getUserWishlist,
    removeProductFromWishlist,
    setWishlistDetails
  } = useContext(wishlistContext)
  const { token } = useContext(authContext)
  const { addToCart } = useContext(cartContext)
 
  useEffect(() => {
    getUserWishlist();
  }, [token])


  async function addProductToCart(id) {
    const data = await addToCart(id)
    if (data?.status === "success") {
      toast.success(data.message, {
        duration: 2000,
      });
    } else {
      toast.error("Error Occured", {
        duration: 2000,
        position: "top-center"
      });
    }
  }
  async function removeFromWishlist(productId) {
    await removeProductFromWishlist(productId);
    const response = await getUserWishlist();
    if (response) {
      setWishlistDetails(response.data.data);
    }

  }
  if (wishlistDetails === null) {
    return <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <PacmanLoader color="#36d7b7" />
    </div>

  }
  if (wishlistDetails.length===0) {
    return <div className='d-flex justify-content-center py-5 min-vh-100'>
      <h2>Your Wishlist is empty</h2>
    </div>

  }
  console.log(wishlistDetails)
  return <>
    <div className='container py-5 min-vh-100'>
      <h2>Wishlist</h2>
      <div className='row g-0'>
        {wishlistDetails.map((product, index) => {
          return <div key={index} className='col-md-4  p-2'>
            <div className='content p-4 rounded-3' style={{ backgroundColor: "#DC3545" }}>
              <div className='d-flex gap-2 mb-3'>
                <div className='w-25'>
                  <div className='img-container'>
                    <img className='w-100' src={product.imageCover} alt="" />
                  </div>
                </div>
                <div className='w-75'>
                  <p className='m-0'><span className='fs-5'>Name: </span>{product.title.split(" ", 4).join(" ")}</p>
                  <p className='m-0'>Price: {product.price}</p>
                  <p className='m-0'>Category: {product.category.name}</p>
                  <p className='m-0'>Brand: {product.brand.name}</p>
                </div>
              </div>
              <div className='d-flex gap-3'>
                <Button variant='outline-light' className="w-100 " onClick={function () {
                  addProductToCart(product.id)
                }}> + Add to cart</Button>
                <Button variant="outline-dark" className="w-100  " onClick={function () {
                  removeFromWishlist(product.id)
                }}> Remove from wishlist</Button>
              </div>
            </div>


            {/* <div className='col-sm-4'></div>
        <div className='col-sm-2'>heart  </div> */}
          </div>
        })}
      </div>


    </div>
  </>
}
