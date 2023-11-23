import React, { useEffect, useState } from 'react'
import Style from './CategorySlider.module.css'
import Slider from 'react-slick'
import { animated, useSpring } from 'react-spring';
import axios from 'axios';
import { useQuery } from 'react-query';
import { GridLoader } from 'react-spinners';
export default function CategorySlider() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    // Update windowWidth when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery("allCategories", getAllCategories);
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
          {windowWidth >= 850 ? <Slider {...settings1}>
            {data.data.data.map((category, index) => {
              return <div key={index}>
                <img style={{ width: "100%", height: "200px" }} src={category.image} alt="" />
                <h5 className='text-center p-2 fs-5'>{category.name}</h5>
              </div>
            })}
          </Slider> : <Slider {...settings2}>
            {data.data.data.map((category, index) => {
              return <div key={index}>
                <img style={{ width: "100%", height: "200px" }} src={category.image} alt="" />
                <h5 className='text-center p-2'>{category.name}</h5>
              </div>
            })}
          </Slider>}


        </div>
      </animated.div>
    </div>
  </>
}
