import React, { useContext } from "react";
import Style from "./Navbar.module.css"
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../images/freshcart-logo.svg"
import { authContext } from './../../Context/Authentication';
import { cartContext } from "../../Context/CartContext";

export default function NavbarComponent() {
  const { token, setToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);
  const navigate = useNavigate();
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>
      <Navbar  className={`${Style["bg-navbar"]} fixed-top`} expand="lg" sticky="true" style={{ boxShadow: '1px 2px 9px #EDE9E9'}}>
        <Container>
          <Navbar.Brand to="/home" className="">
            <img src={Logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {token ? <Nav className="me-auto gap-5">
              <NavLink activeclassname={Style.active} className="text-decoration-none text-dark secondary-text-color" to="/home" href="/products">Home</NavLink>
              <NavLink activeclassname={Style.active} className="text-decoration-none text-dark secondary-text-color" to="/brands">Brands</NavLink>
              <NavLink activeclassname={Style.active} className="text-decoration-none text-dark secondary-text-color" to="/wishlist">Wishlist</NavLink>
              <NavLink activeclassname={Style.active} className="text-decoration-none text-dark secondary-text-color position-relative" to="/cart">
                Cart
                <span className="position-absolute top-0 start-100 badge rounded-pill bg-danger">
                  {numOfCartItems}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </NavLink>
              <NavLink activeclassname={Style.active} className="text-decoration-none text-dark secondary-text-color" to="/allorders">All Orders</NavLink>
            </Nav> : ""}


            <Nav className="ms-auto gap-4 align-items-center">
              {/* <li className="d-flex gap-3">
                <i className="fa-brands fa-instagram "></i>
                <i className="fa-brands fa-facebook "></i>
                <i className="fa-brands fa-twitter "></i>
                <i className="fa-brands fa-youtube "></i>
                <i className="fa-brands fa-linkedin "></i>
              </li> */}
              {token ? <>
                <NavLink className="text-decoration-none text-dark" to="/profile" >Profile</NavLink>
                <span onClick={logout} className={Style.logout}>Logout</span>
              </> : <>
                <NavLink className="text-decoration-none text-dark" to="/register" >Register</NavLink>
                <NavLink className="text-decoration-none text-dark" to="/login" >Login</NavLink>
              </>}


            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>
    </>
  );
}
