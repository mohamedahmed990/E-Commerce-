import React from 'react'
import Style from './Home.module.css'
import HomeSlider from '../HomeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'
export default function Home() {
  return <div className='py-5 mt-5'>
    <div className='container'>
      <HomeSlider />
      <CategorySlider />
      <Products />
    </div>
  </div>
}
