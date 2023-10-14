import React from 'react'
import Style from './CategorySlider.module.css'
import Slider from 'react-slick'
import { animated, useSpring } from 'react-spring';
import axios from 'axios';
import { useQuery } from 'react-query';
import { GridLoader } from 'react-spinners';
export default function CategorySlider() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery("allCategories", getAllCategories);
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false
  };


  if (isLoading) {
    return <>
      <div className='pb-5 d-flex justify-content-center'>

        <GridLoader color="#36d7b7" />
      </div>
    </>
  }
  return <>
    <div className='pb-5'>
      <animated.div style={props}>
        <div className="row g-0">
          <Slider {...settings}>
            {data.data.data.map((category, index) => {
              return <div key={index}>
                <img style={{ width: "100%", height: "200px" }} src={category.image} alt="" />
                <h5 className='text-center p-2'>{category.name}</h5>
              </div>
            })}
          </Slider>
        </div>
      </animated.div>
    </div>
  </>
}
