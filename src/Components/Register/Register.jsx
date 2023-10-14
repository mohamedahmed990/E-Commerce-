import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Alert, Button, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
export default function Register() {
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit: submitForm,
    validate: validateForm,
  });
  function submitForm(values) {
    setIsLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({ data }) => {
      // console.log(data.message);
      if (data.message === "success") {
        setSuccessMsg("Account created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }).catch((error) => {
      // console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
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
    const phoneRegex = /^01[0125][0-9]{8}$/;

    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 3) {
      errors.name = "Name should be at least 3 characters";
    } else if (values.name.length > 10) {
      errors.name = "Name maximum length should be 10 characters";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "Invalid phone number";
    }

    if (values.password.length < 8) {
      errors.password = "Passsword must be at least 8 characters";
    } else if (values.password.length > 16) {
      errors.password = "Passsword maximum length must be 16 characters";
    }

    if (values.password !== values.rePassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  }

  return (
    <>
      {/* {console.log(formik)} */}
      <Form className="w-75 py-5 m-auto min-vh-100" onSubmit={formik.handleSubmit}>
        <h2>Register Now </h2>
        {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : ""}
        {successMsg ? <Alert variant="success">{successMsg}</Alert> : ""}
        <Stack gap={4}>
        <Form.Group  controlId="formBasicName">
          <Form.Label>Name :</Form.Label>
          <Form.Control
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            placeholder="Name"
          />
        </Form.Group>
        {formik.errors.name && formik.touched.name ? <Alert variant="danger">{formik.errors.name}</Alert> : ""}

        <Form.Group  controlId="formBasicEmail">
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

        <Form.Group  controlId="formBasicPhoneNumber">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
            placeholder="Phone Number"
          />
        </Form.Group>
        {formik.errors.phone && formik.touched.phone ? <Alert variant="danger">{formik.errors.phone}</Alert> : ""}

        <Form.Group  controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        {formik.errors.password && formik.touched.password ? <Alert variant="danger">{formik.errors.password}</Alert> : ""}

        <Form.Group  controlId="formBasicRePassword">
          <Form.Label>Confirm Password :</Form.Label>
          <Form.Control
            type="password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword"
            placeholder="Confirm Password"
          />
        </Form.Group>
        {formik.errors.confirmPassword && formik.touched.confirmPassword ? <Alert variant="danger">{formik.errors.confirmPassword}</Alert> : ""}

        <Button variant="success" type="submit" style={{ width: "fit-content" }}>
          {isLoading ? <ScaleLoader color="white" height={20} /> : "Register"}
        </Button>
        </Stack>
      </Form>
    </>
  );
}
