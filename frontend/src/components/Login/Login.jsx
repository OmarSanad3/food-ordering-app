import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import * as yup from "yup";

export default function Login() {
  const [isPost, setisPost] = useState(false)
  const [errMessage, seterrMessage] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const { toggleRegistration} = useContext(AppContext);

  const navigate=useNavigate()
  
  

  const mySchema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("enter avalid email"),
    password: yup.string().required("password is required").min(6).max(12),
  });
  const userData = {
    email: "",
    password: "",
  };

  async function sendUserData(values) {
    setIsLoading(true);
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      setisPost(true);
      seterrMessage(undefined);
      toggleRegistration();
      setTimeout(function () {
        navigate("/resturants");
      }, 2000);
    } catch (e) {
      if (e.response && e.response.status === 409) {
        seterrMessage(e.response.data.message);
        setisPost(false);
      } else {
        seterrMessage(e.response.data.message);
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
        <div className="alert alert-success text-center ">Welcome Back !</div>
      ) : (
        ""
      )}
      {errMessage ? (
        <div className="alert alert-danger text-center ">{errMessage}</div>
      ) : (
        ""
      )}
      <h2 className="mb-5">Login Now</h2>
      <form onSubmit={myFormik.handleSubmit}>
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
          value={myFormik.values.password}
          type="password"
          id="password"
          placeholder="Enter your password"
          className="form-control mb-4"
        />
        {myFormik.errors.password && myFormik.touched.password && (
          <div className="alert alert-danger">{myFormik.errors.password}</div>
        )}

        <button
          type="submit"
          className="rounded-4 text-white p-2 bg-warning  w-100"
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
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
