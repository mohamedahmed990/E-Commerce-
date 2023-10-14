import React from 'react'
import Style from './Footer.module.css'
import { Form } from 'formik'
import { Button, Stack } from 'react-bootstrap'
export default function Footer() {
  return <>
    <footer className='p-5 ' style={{ "backgroundColor": "#F0F3F2" }}>
      <h2>Get the FreshCart app</h2>
      <p>we will send you a link,open it on your phone to download the app</p>
      <div className="d-flex justify-content-center gap-2 p-2">
        <input className='form-control w-75 ' type="email" placeholder="Email..." />
        <Button className='bg-green'>Share App Link</Button>
      </div>
    </footer>
  </>
}
