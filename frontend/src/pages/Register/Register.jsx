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
  const {setToken}=useContext(AppContext)

  const navigate = useNavigate();


  const mySchema = yup.object({
    firstName:yup
      .string()
      .required("Name is Required")
      .min(3, "must be more than 3 chars")
      .max(10, "must be less than 10"),
      lastName:yup
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

    firstName: "",
    lastName: "",
    email: "",
    phone:"",
    password: ""
  };
  async function sendUserData(values) {
    setIsLoading(true);
    try {
      const res=await axios.post(
        "http://localhost:3000/signup",
        values
      );
      localStorage.setItem("tkn",res.data.token)
      setToken(res.data.token)
      console.log("res",res);
      
      setisPost(true);
      seterrMessage(undefined);
      setTimeout(function () {
        navigate("/restaurant");
      }, 1000);
    } catch (e) {
      if (e.response && e.response.status === 422) {
        seterrMessage(e.response.data.data[0].msg); // Conflict: User already exists
        setisPost(false);
      } else {
        console.log("error resons", e.response.data.data[0].msg);
      }
    }
    setIsLoading(false);
  }

  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: sendUserData,

    validationSchema: mySchema,
  });



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
          value={myFormik.values.firstName}
          type="text"
          id="firstName"
          placeholder="Enter your firstName"
          className="form-control mb-4"
        />
        {myFormik.errors.firstName && myFormik.touched.firstName && (
          <div className="alert alert-danger">{myFormik.errors.firstName}</div>
        )}
        <input
          onChange={myFormik.handleChange}
          onBlur={myFormik.handleBlur}
          value={myFormik.values.lastName}
          type="text"
          id="lastName"
          placeholder="Enter your lastName"
          className="form-control mb-4"
        />
        {myFormik.errors.firstName && myFormik.touched.lastName && (
          <div className="alert alert-danger">{myFormik.errors.lastName}</div>
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
