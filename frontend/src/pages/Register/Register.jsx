import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import * as yup from "yup";

export default function Register() {
  const [isPost, setisPost] = useState(false);
  const [errMessage, seterrMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleRegistration } = useContext(AppContext);

  const navigate = useNavigate();
  console.log(isPost, "before");

  const mySchema = yup.object({
    name: yup
      .string()
      .required("Name is Required")
      .min(3, "must be more than 3 chars")
      .max(10, "must be less than 10"),
    phone: yup
      .string()
      .required("phone is required")
      .length(11, "must be 11 digit"),
    email: yup
      .string()
      .required("email is required")
      .email("enter avalid email"),
    password: yup.string().required("password is required").min(6).max(12),
    rePassword: yup
      .string()
      .required("Repassword is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  const userData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };
  async function sendUserData(values) {
    setIsLoading(true);
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log("submitted", values);

      setisPost(true);
      toggleRegistration();
      console.log();

      seterrMessage(undefined);
      setTimeout(function () {
        navigate("/resturants");
      }, 2000);
    } catch (e) {
      if (e.response && e.response.status === 409) {
        console.log(e.response.data.message);
        seterrMessage(e.response.data.message); // Conflict: User already exists
        setisPost(false);
      } else {
        console.log("error", e);
      }
    }
    setIsLoading(false);
  }

  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: sendUserData,

    validationSchema: mySchema,
  });

  console.log(myFormik.errors);

  return (
    <div className="w-75 m-auto p-5">
      {isPost == true ? (
        <div className="alert alert-success text-center ">
          Your account is created successefuly
        </div>
      ) : (
        ""
      )}
      {errMessage ? (
        <div className="alert alert-danger text-center ">{errMessage}</div>
      ) : (
        ""
      )}
      <h2 className="mb-5">Register Now</h2>
      <form onSubmit={myFormik.handleSubmit}>
        <input
          onChange={myFormik.handleChange}
          onBlur={myFormik.handleBlur}
          value={myFormik.values.name}
          type="text"
          id="name"
          placeholder="Enter your name"
          className="form-control mb-4"
        />
        {myFormik.errors.name && myFormik.touched.name && (
          <div className="alert alert-danger">{myFormik.errors.name}</div>
        )}

        <input
          onChange={myFormik.handleChange}
          onBlur={myFormik.handleBlur}
          value={myFormik.values.email}
          type="text"
          id="email"
          placeholder="Enter your email"
          className="form-control mb-4"
        />
        {myFormik.errors.email && myFormik.touched.email && (
          <div className="alert alert-danger">{myFormik.errors.email}</div>
        )}

        <input
          onChange={myFormik.handleChange}
          onBlur={myFormik.handleBlur}
          value={myFormik.values.phone}
          type="text"
          id="phone"
          placeholder="Enter your phone number"
          className="form-control mb-4"
        />
        {myFormik.errors.phone && myFormik.touched.phone && (
          <div className="alert alert-danger">{myFormik.errors.phone}</div>
        )}

        <input
          onChange={myFormik.handleChange}
          onBlur={myFormik.handleBlur}
          value={myFormik.values.password}
          type="password"
          id="password"
          placeholder="Enter your password"
          className="form-control mb-4"
        />
        {myFormik.errors.password && myFormik.touched.password && (
          <div className="alert alert-danger">{myFormik.errors.password}</div>
        )}

        <input
          onChange={myFormik.handleChange}
          onBlur={myFormik.handleBlur}
          value={myFormik.values.rePassword}
          type="password"
          id="rePassword"
          placeholder="Re-enter your password"
          className="form-control mb-4"
        />
        {myFormik.errors.rePassword && myFormik.touched.rePassword && (
          <div className="alert alert-danger">{myFormik.errors.rePassword}</div>
        )}

        <button
          type="submit"
          className="rounded-4 text-white p-2 bg-warning w-100"
        >
          {isLoading ? (
            <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
