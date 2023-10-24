import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Alert, Button, Form, Stack } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { authContext } from '../../Context/Authentication';
export default function Login() {
  let { setToken } = useContext(authContext);
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitForm,
    validate: validateForm,
  });
  function submitForm(values) {
    setIsLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(({ data }) => {
      if (data.message === "success") {
        setSuccessMsg("Welcome back");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    }).catch((error) => {
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

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (values.password.length < 8) {
      errors.password = "Passsword must be at least 8 characters";
    } else if (values.password.length > 16) {
      errors.password = "Passsword maximum length must be 16 characters";
    }
    return errors;
  }

  return (
    <>
      <Form className="w-75 py-5 m-auto min-vh-100 mt-5" onSubmit={formik.handleSubmit}>
        <h2>Login </h2>
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

          <Stack direction="horizontal" className="align-items-center justify-content-between">
            <Link to="/forgotpassword" className="text-decoration-none">Forgot your Password ?</Link>
            <Button variant="success" type="submit" style={{ width: "fit-content" }}>
              {isLoading ? <ScaleLoader color="white" height={20} /> : "Login"}
            </Button>
          </Stack>

        </Stack>
      </Form>
    </>
  );
}
