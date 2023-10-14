import React from 'react'
import Style from './NotFound.module.css'
import ErrorImage from '../../images/error.svg';
export default function NotFound() {
  return <>
    <div className='min-vh-100 container pt-5 text-center'>
        <img className='w-50' src={ErrorImage} alt="" />
    </div>
  </>
}
