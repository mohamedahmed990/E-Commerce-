import React from 'react'
import Style from './HomeSlider.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { animated, useSpring } from 'react-spring';

export default function HomeSlider() {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  return <>
    <div className='pb-5'>
      <animated.div style={props}>
        <div className="row g-0">
          <div className="col-sm-9">
            <Slider {...settings}>
              <div>
                <img style={{ width: "100%", height: "400px" }} src={require("../../images/slider-image-1.jpeg")} alt="" />
              </div>
              <div>
                <img style={{ width: "100%", height: "400px" }} src={require("../../images/slider-image-2.jpeg")} alt="" />
              </div>
              <div>
                <img style={{ width: "100%", height: "400px" }} src={require("../../images/slider-image-3.jpeg")} alt="" />
              </div>
              <div>
                <img style={{ width: "100%", height: "400px" }} src={require("../../images/slider-2.jpeg")} alt="" />
              </div>

            </Slider>
          </div>
          <div className="col-sm-3">
            <div>
              <img style={{width:"100%" ,height:"200px"}} src={require("../../images/grocery-banner-2.jpeg")} alt="" />
            </div>
            <div>
              <img style={{width:"100%" ,height:"200px"}} src={require("../../images/grocery-banner.png")} alt="" />
            </div>
          </div>
        </div>

      </animated.div>
    </div>
  </>
}
