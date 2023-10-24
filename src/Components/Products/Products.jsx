import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Style from "./Products.module.css";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { authContext } from "../../Context/Authentication";
import { wishlistContext } from "../../Context/WishListContext";

export default function Products() {
  const { token } = useContext(authContext);
  const navigate = useNavigate();
  const { addToCart } = useContext(cartContext);
  const { data, isLoading } = useQuery("allProducts", getAllProducts);
  const { getUserWishlist,
    wishlistProductsId,
    removeProductFromWishlist,
    addProductToWishlist,
    setWishlistProductsId } = useContext(wishlistContext)
  useEffect(() => {
    (async function () {
      const response = await getUserWishlist();
      if (response?.data?.status === "success") {
        const newWishList = [];
        console.log(response);
        for (let i = 0; i < response?.data.data.length; i++) {
          newWishList.push(response.data.data[i].id);
          console.log(response.data.data[i].id);
        }
        setWishlistProductsId(newWishList);
      }
    })();
  }, [token]);
  function handleClick(ProductId, isFavourite) {
    console.log(isFavourite);
    if (!isFavourite) {
      addProductToWishlist(ProductId)
    }
    if (isFavourite) {
      removeProductFromWishlist(ProductId)
    }
  }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

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

  function sendProduct(id) {
    navigate(`/products/${id}`);
  }


  if (isLoading) {
    return (
      <>
        <Stack className="vh-100 align-items-center justify-content-center">
          <Spinner animation="grow" variant="success" />
        </Stack>
      </>
    );
  }
  // console.log(data)

  return (
    <>
      <Container className="py-3">
        <Row className="g-4">
          {data.data.data.map((product, index) => {
            return (
              <Col  key={index} sm={6} md={4} lg={3}  >
                <Card className={Style['product-card']}
                  style={{ height: "100%" }}
                >
                  <Card.Img variant="top" src={product.imageCover} style={{ cursor: "pointer" }} onClick={function () {
                    sendProduct(product.id)
                  }} />
                  <Card.Body>
                    <Card.Text className="mb-1 main-color">
                      {product.category.name}
                    </Card.Text>
                    <Card.Title className="mb-2">
                      {product.title.split(" ", 2).join(" ")}
                    </Card.Title>
                    <Stack direction="horizontal" className="justify-content-between mb-3">
                      <Card.Text className="mb-2">{product.price} EG</Card.Text>
                      <div className="d-flex gap-3 align-items-center">
                        <Card.Text className="mb-2 d-flex gap-1 align-items-center"><i className="star-color fa-solid fa-star"></i>{product.ratingsAverage}</Card.Text>
                        <div onClick={function () {
                          handleClick(product.id, wishlistProductsId.includes(product.id))
                        }} style={{ cursor: "pointer", color: "red" }}>
                          <FontAwesomeIcon icon={wishlistProductsId.includes(product.id) ? solidHeart : regularHeart} size="2x" />
                        </div>
                      </div>
                    </Stack>
                    <Button style={{ border: "none" }} className="w-100 bg-green " onClick={function () {
                      addProductToCart(product.id)
                    }}> + Add to cart</Button>
                  </Card.Body>
                </Card>
              </Col>

            );
          })}
        </Row>
      </Container>
    </>
  );
}
