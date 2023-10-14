import React from 'react'
import Style from './Brands.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import axios from 'axios';
import { PacmanLoader } from 'react-spinners';
export default function Brands() {

  const { data, isLoading } = useQuery("allBrands", getAllBrands);
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  if (isLoading) {
    return <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <PacmanLoader color="#36d7b7" />
      </div>
    </>
  }
  console.log(data)
  return <>
    <Container className='py-5 min-vh-100'>
      <Row className='g-4'>
        {data.data.data.map((brand, index) => {
          return <Col key={index} sm={4} md={3} lg={2} >
            <div className='content'>
              <div className='img-container'>
                <img className='w-100' src={brand.image} alt="" />
              </div>
              {/* <h5 className='title text-center'>{brand.name}</h5> */}
            </div>
          </Col>
        })}

      </Row>
    </Container>
  </>
}
