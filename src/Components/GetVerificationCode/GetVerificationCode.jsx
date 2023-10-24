import React, { useState } from 'react'
import Style from './GetVerificationCode.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Form, Stack } from 'react-bootstrap'
import { ScaleLoader } from 'react-spinners';
export default function GetVerificationCode() {
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: submitForm,
    validate: validateForm,
  });
  function submitForm(values) {
    setIsLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values).then((response) => {
    if (response.data.status === "Success") {
      console.log(response)
        setSuccessMsg("Success");
        setTimeout(() => {
          navigate("/resetPassword");
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
    if (!values.resetCode) {
      errors.resetCode = "verification code is required";
    }
    // else if (values.code.length !== 6) {
    //   errors.code = "verification code must be 6 numbers";
    // }
    return errors;
  }
 
  return <>
    <Form className="w-75 py-5 m-auto min-vh-100 mt-5" onSubmit={formik.handleSubmit}>
      <h4>Enter your verificarion code </h4>
      {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : ""}
      {successMsg ? <Alert variant="success">{successMsg}</Alert> : ""}
      <Stack gap={4}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Code :</Form.Label>
          <Form.Control
            type="text"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="resetCode"
            placeholder="Enter your resetCode..."
          />
        </Form.Group>
        {formik.errors.resetCode && formik.touched.resetCode ? <Alert variant="danger">{formik.errors.resetCode}</Alert> : ""}

        <Button variant="success" type="submit" style={{ width: "fit-content" }} className='d-flex justify-content-center align-items-center'>
          {isLoading ? <ScaleLoader color="white" height={20} /> : "Enter Code"}
        </Button>

      </Stack>
    </Form>
  </>
}
