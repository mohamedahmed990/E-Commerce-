import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Alert, Button, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { authContext } from "../../Context/Authentication";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function Payment() {
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(authContext);
  const {
    cartId,
    resetData
  } = useContext(cartContext);

  const formik = useFormik({
    initialValues: {
      city: "",
      phone: "",
      details: "",
    },
    validate: validateForm,
  });
  function confirmCashPayment() {
    const { values } = formik;
    validateForm(values);
    if (formik.errors.city || formik.errors.phone || formik.errors.details) {
      console.log(formik.errors)
      return;
    }
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
      shipingAddress: {
        city: values.city,
        phone: values.phone,
        details: values.details
      }
    }, {
      headers: {
        token: token
      }
    }).then((response) => {
      console.log(response)
      if (response.data.status === "success") {
        resetData();
        toast.success(" Order Confirmed", {
          duration: 2000,
          position: "top-center"
        });
      }
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false);
    })
  }
  function confirmOnlinePayment() {

    const { values } = formik;
    if (formik.errors.city || formik.errors.phone || formik.errors.details) {
      console.log(formik.errors)
      return;
    }
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {
      shipingAddress: {
        city: values.city,
        phone: values.phone,
        details: values.details
      }
    }, {
      headers: {
        token: token
      },
      params: {
        url: "http://localhost:3000"
      }
    }).then((response) => {
      console.log(response)
      if (response.data.status === "success") {
        resetData();
        toast.success(" Order Confirmed", {
          duration: 2000,
          position: "top-center"
        });
        window.open(response.data.session.url);
      }
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false);
    })
  }

  function validateForm(values) {
    setErrorMsg(null);
    setSuccessMsg(null);
    const errors = {};
    const phoneRegex = /^01[0125][0-9]{8}$/;

    if (!values.city) {
      errors.city = "City is required";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "Invalid phone number";
    }

    if (!values.details) {
      errors.details = "Details field is required";
    }
    return errors;
  }


  return <>
    <Form className="w-75 py-5 m-auto min-vh-100">
      <h2>Confirm Cart </h2>
      {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : ""}
      {successMsg ? <Alert variant="success">{successMsg}</Alert> : ""}
      <Stack gap={4}>
        <Form.Group controlId="formBasicName">
          <Form.Label>City :</Form.Label>
          <Form.Control
            type="text"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="city"
            placeholder="City"
          />
        </Form.Group>
        {formik.errors.city && formik.touched.city ? <Alert variant="danger">{formik.errors.city}</Alert> : ""}

        <Form.Group controlId="formBasicPhoneNumber">
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

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="details"
            placeholder="Details"
          />
        </Form.Group>
        {formik.errors.details && formik.touched.details ? <Alert variant="danger">{formik.errors.details}</Alert> : ""}


        <Button variant="success" type="submit" style={{ width: "fit-content" }} onClick={function (e) {
          e.preventDefault();
          confirmCashPayment();
        }}>
          Confirm Cash Payment
          {/* {isLoading ? <ScaleLoader color="white" height={20} /> : "Confirm Cash Payment"} */}
        </Button>
        <Button variant="success" type="submit" style={{ width: "fit-content" }} onClick={function(e){
          e.preventDefault();
          confirmOnlinePayment();
        }}>
          Confirm Online Payment
          {/* {isLoading ? <ScaleLoader color="white" height={20} /> : "Confirm Online Payment"} */}
        </Button>
      </Stack>
    </Form>
  </>
}
