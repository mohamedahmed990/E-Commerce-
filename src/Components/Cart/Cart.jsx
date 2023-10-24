import React, { useContext, useEffect } from 'react'
import Style from './Cart.module.css'
import { Button, Container, Stack } from 'react-bootstrap';
import { cartContext } from '../../Context/CartContext';
import { PacmanLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { authContext } from '../../Context/Authentication';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
  const navigate = useNavigate()
  const { token } = useContext(authContext)
  const {
    numOfCartItems,
    totalCartPrice,
    cartProductslist: products,
    removeItem,
    getCartProducts,
    updateCartProductQuantity,
    clearUserCart,
  } = useContext(cartContext);


  useEffect(() => {
    getCartProducts();

  }, [])
  async function deleteItem(id) {
    const data = await removeItem(id)
    if (data?.status === "success") {
      toast.success("Item Removed from Cart successfully", {
        duration: 2000,
        position: "top-center"
      })
    } else {
      toast.error("Error Occured", {
        duration: 2000,
        position: "top-center"
      })
    }
  }
  function updateCartProduct(id, count) {
    updateCartProductQuantity(id, count)
  }
  async function clearCart() {
    const data = await clearUserCart();

  }
  function navigateToPayment() {
    navigate("/payment");
  }

  if (!products) {
    return <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <PacmanLoader color="#36d7b7" />
    </div>
  }
  if (products?.length === 0) {
    return <div className='min-vh-100'>
      <Container className="p-4 bg-grey my-3 ">
        <h2 >There is no products in your cart</h2>
        <p className='fs-5' >Try adding some products</p>
      </Container>
    </div>
  }
  return <>
    <Container className="mt-5 min-vh-100 overflow-hidden">
      <div className='px-4  bg-grey mt-5  py-5'>
        <h2 >Shop Cart :</h2>
        <p className='fs-5 main-color' >Total Cart Price : {totalCartPrice} EG </p>
        <Stack direction="horizontal" className='justify-content-between'>
          <Button variant="danger" onClick={clearCart}>Clear Cart</Button>
          <Button variant="primary" onClick={navigateToPayment}>Confirm Payment</Button>
        </Stack>
        <Stack >
          {products.map((item, index) => {
            return <div key={index} className='cart-item row py-3' style={{ "borderBottom": "1px solid #DEE2E6" }}>
              <div className='col-1'>
                <div>
                  <img className='w-100' src={item.product.imageCover} alt="" />
                </div>
              </div>
              <div className='col-11'>
                <div className='d-flex justify-content-between'>
                  <div>
                    <p>{item.product.title}</p>
                    <p>{item.price}</p>
                    <Button variant='outline-danger' onClick={function () {
                      deleteItem(item.product.id)
                    }}><i className="fa-solid fa-trash-can"></i> Remove</Button>
                  </div>
                  <Stack direction="horizontal" gap={2} className='align-items-center'>
                    <Button variant='outline-success' className='py-1 px-2' onClick={() => {
                      updateCartProduct(item.product.id, item.count + 1)
                    }}>+</Button>
                    <p className='mb-0'>{item.count}</p>
                    <Button variant='outline-success' className='py-1 px-2' onClick={() => {
                      updateCartProduct(item.product.id, item.count - 1 < 0 ? 0 : item.count - 1)
                    }}> - </Button>
                  </Stack>
                </div>
              </div>
            </div >
          })}


        </Stack>
      </div>
    </Container>

  </>
}
