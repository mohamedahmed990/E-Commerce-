import React, { useContext } from 'react'
import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Button, Container, Spinner, Stack } from 'react-bootstrap';
import { cartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';

export default function ProductDetails() {

  const { addToCart , totalCartPrice, numOfCartItems } = useContext(cartContext);
  const { id } = useParams();
  const response = useQuery(`${id}`, getProductDetails);
  const { isLoading } = response;
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  async function addProductToCart(id) {
    const data = await addToCart(id)
    if (data?.status === "success") {
      toast.success(data.message, {
        duration: 2000,
      });
      console.log(totalCartPrice)
      console.log(numOfCartItems)

    } else {
      toast.error("Error Occured",{
        duration: 2000,
        position:"top-center"
      });
    }
  }
  

  if (isLoading) {
    return <>
      <Stack className="vh-100 align-items-center justify-content-center">
        <Spinner animation="grow" variant="success" />
      </Stack>
    </>
  }

  const { data: product } = response.data.data;
  return <>
    <Container className="min-vh-100">
      <div className='row align-items-center g-4'>
        <div className='col-md-4'>
          <div className='img-container'>
            <img className='w-100' src={product.imageCover} alt={product.title} />
          </div>
        </div>
        <div className='col-md-8'>
          <div className='details'>
            <h3>{product.title}</h3>
            <p className='secondary-text-color px-2'>{product.description}</p>
            <p>{product.category.name}</p>

            <Stack direction="horizontal" className="justify-content-between">
              <p>{product.price} EG</p>
              <span className='d-flex gap-1 justify '>
                <i className="star-color fa-solid fa-star"></i>{product.ratingsAverage}
              </span>
            </Stack>
            <Button style={{ border: "none" }} className="w-100 bg-green " onClick={function () {
              addProductToCart(product.id)
            }}> + Add to cart</Button>

          </div>
        </div>
      </div>
    </Container>
  </>
}
