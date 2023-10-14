import React from 'react'
import Style from './Layout.module.css'
import NavbarComponent from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return <>
    <NavbarComponent />
    <Outlet />
    <Footer />
  </>
}
