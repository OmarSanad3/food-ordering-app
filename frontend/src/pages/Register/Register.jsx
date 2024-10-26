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
    phoneNumber: yup
      .string()
      .required("phoneNumber is required")
      .length(11, "must be 11 digit"),
    email: yup
      .string()
      .required("email is required")
      .email("enter avalid email"),
    password: yup.string().required("password is required").min(6).max(12),
    confirmPassword: yup
      .string()
      .required("Repassword is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  const userData = {

    firstName: "",
    lastName: "",
    email: "",
    phoneNumber:"",
    password: "",
    confirmPassword:""
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
        navigate("/");
      }, 1000);
    } catch (e) {
      console.log(e);
      
      if (e.response && e.response.status === 422) {
        seterrMessage("This account is already exist"); 
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
          value={myFormik.values.phoneNumber}
          type="text"
          id="phoneNumber"
          placeholder="Enter your phoneNumber number"
          className="form-control mb-4"
        />
        {myFormik.errors.phoneNumber && myFormik.touched.phoneNumber && (
          <div className="alert alert-danger">{myFormik.errors.phoneNumber}</div>
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
          value={myFormik.values.confirmPassword}
          type="password"
          id="confirmPassword"
          placeholder="Re-enter your password"
          className="form-control mb-4"
        />
        {myFormik.errors.confirmPassword && myFormik.touched.confirmPassword && (
          <div className="alert alert-danger">{myFormik.errors.confirmPassword}</div>
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
