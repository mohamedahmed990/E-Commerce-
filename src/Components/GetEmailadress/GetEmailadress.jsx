import React, { useContext, useState } from 'react'
import Style from './GetEmailadress.module.css'
import { Alert, Button, Form, Stack } from 'react-bootstrap'
import { ScaleLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { authContext } from '../../Context/Authentication';
import axios from 'axios';
export default function GetEmailadress() {
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: submitForm,
    validate: validateForm,
  });
  function submitForm(values) {
    setIsLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).then((response) => {
      console.log(response);
      if (response.data.statusMsg === "success") {
        setSuccessMsg(response.data.message);
        setTimeout(() => {
          navigate("/getverificationcode");
        }, 1000);
      }
    }).catch((error) => {
      console.error(error);
      if (error.response.data.statusMsg === "fail") {
        setErrorMsg(error.response.data.message);
      }
    }).finally(() => {
      setIsLoading(false);
    })
  }

  function validateForm(values) {
    setErrorMsg(null);
    setSuccessMsg(null);
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,3}$/;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  }

  return <>
    <Form className="w-75 py-5 m-auto min-vh-100 mt-5" onSubmit={formik.handleSubmit}>
      <h4>Enter your Email to send Verificarion Code </h4>
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

        <Button variant="success" type="submit" style={{ width: "fit-content" }} className='d-flex justify-content-center align-items-center'>
          {isLoading ? <ScaleLoader color="white" height={20} /> : "Send Code"}
        </Button>

      </Stack>
    </Form>
  </>
}
