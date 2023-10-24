import React, { useContext, useState } from 'react'
import Style from './ResetPassword.module.css'
import { authContext } from '../../Context/Authentication';
import {  useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { Alert, Button, Stack , Form } from 'react-bootstrap';
import { ScaleLoader } from 'react-spinners';
export default function ResetPassword() {
  let { setToken } = useContext(authContext);
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: submitForm,
    validate: validateForm,
  });
  function submitForm(values) {
    setIsLoading(true);
    axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values).then((response) => {
    console.log(response)
    if (response.data.token) {
        setSuccessMsg("Password reset successfully");
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    }).catch((error) => {
      console.log(error);
      // setErrorMsg(error.response.data.message);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  function validateForm(values) {
    setErrorMsg(null);
    setSuccessMsg(null);
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,3}$/;
    const passwordRegex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (values.newPassword.length < 8) {
      errors.newPassword = "Passsword must be at least 8 characters";
    } else if (values.newPassword.length > 16) {
      errors.newPassword = "Passsword maximum length must be 16 characters";
    }
    return errors;
  }

  return <>
    <Form className="w-75 py-5 m-auto min-vh-100 mt-5" onSubmit={formik.handleSubmit}>
      <h2>Reset Password </h2>
      {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : ""}
      {successMsg ? <Alert variant="success">{successMsg}</Alert> : ""}
      <Stack gap={4}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email :</Form.Label>
          <Form.Control
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>
        {formik.errors.email && formik.touched.email ? <Alert variant="danger">{formik.errors.email}</Alert> : ""}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>new Password: </Form.Label>
          <Form.Control
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="newPassword"
            placeholder="newPassword"
          />
        </Form.Group>
        {formik.errors.newPassword && formik.touched.newPassword ? <Alert variant="danger">{formik.errors.newPassword}</Alert> : ""}

        <Stack direction="horizontal" className="align-items-center justify-content-between">
          <Button variant="success" type="submit" style={{ width: "fit-content" }}>
            {isLoading ? <ScaleLoader color="white" height={20} /> : "Login"}
          </Button>
        </Stack>

      </Stack>
    </Form>
  </>;
}
