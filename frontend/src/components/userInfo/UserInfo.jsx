import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
    const navigate =useNavigate()
  const formik = useFormik({
    initialValues: {
      city: "",
      address: "",
      phone: ""
    },
    validationSchema: Yup.object({
      city: Yup.string().required("City is required"),
      address: Yup.string().required("Address is required"),
      phone: Yup.string()
        .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
        .required("Phone is required")
    }),
    onSubmit: (values) => {
      console.log("Form Data Submitted:", values);
      navigate("/payment")
    }
  });

  return (
    <div className="checkout-form">
      <h2 className="mb-5 mt-3 text-center" >shipping Details</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your city"
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-danger">{formik.errors.city}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your address"
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="text-danger">{formik.errors.address}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your phone number"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-danger">{formik.errors.phone}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary bg-warning">
          Go to Payment
        </button>
      </form>
    </div>
  );
}
