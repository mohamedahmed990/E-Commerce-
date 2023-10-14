import React, { useContext, useEffect, useState } from 'react'
import Style from './AllOrders.module.css'
import { authContext } from '../../Context/Authentication';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Button, Card, Col, Container, Image, Row, Stack } from 'react-bootstrap';
import { animated } from 'react-spring';
import { PacmanLoader } from 'react-spinners';
export default function AllOrders() {
  const [allOrders, setAllOrders] = useState(null);
  const { token } = useContext(authContext)
  useEffect(() => {
    if (token) {
      const { id } = jwtDecode(token);
      getAllOrders(id);
    }
  }, [token]);

  function getAllOrders(userid) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userid}`, {
      headers: {
        token: token
      }
    }).then((response) => {
      // console.log(response);
      setAllOrders(response.data);
    }).catch((err) => {
      // console.log(err);
    })
  }
  if (!allOrders) {
    return <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <PacmanLoader color="#36d7b7" />
    </div>
  }
  return <>
    <Container className="py-5 min-vh-100 my-5" >
      <h2>All Orders</h2>
      {allOrders.map((order, index) => {
        return <div key={index} className='p-2 mb-3' style={{ "borderTop": "1px solid #5F6368" }} >
          <div md={6}>
            <div>
              <p className='fs-5'><span className='fs-4 fw-bolder'>Total Order Price:</span> {order.totalOrderPrice}</p>
              <p className='fs-5'><span className='fs-4 fw-bolder'>Created at:</span> {order.createdAt}</p>
              <p className='fs-5'><span className='fs-4 fw-bolder'>Number of order items:</span> {order.cartItems.length} items</p>
              <p className='fs-5'><span className='fs-4 fw-bolder'>Payment method type:</span> {order.paymentMethodType}</p>
            </div>
          </div>
          <Row className='items-container'>
            {order.cartItems.map((item, idx) =>
              <Col key={idx} md={6}>
                <Row className='item g-2' >
                  <Col md={2} className='my-2' >
                    <div className='img-container'>
                      <Image src={item.product.imageCover} fluid />
                    </div>
                  </Col>
                  <Col md={10} className='my-2 text-white' style={{ "backgroundColor": "#5F6368" }}>
                    <p className='m-1'>Name: {item.product.title.split(" ", 10).join(" ")}</p>
                    <p className='m-1'>Price: {item.price}</p>
                    <p className='m-1'>Pieces: {item.count}</p>
                    <p className='m-1'>Brand: {item.product.brand.name}</p>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </div>

          ;
      })}
    </Container>
  </>
}
