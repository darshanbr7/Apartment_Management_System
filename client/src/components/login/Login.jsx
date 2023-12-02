import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const formdata = {
    email: email,
    password: password,
  };
  const checkCondition = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (password.length === 0 && email.length === 0) {
      toast.warning("please enter data", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else if (email.length === 0) {
      toast.warning("Please enter email", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else if (!email.match(emailPattern)) {
      toast.warning("Please enter proper Email", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else if (password.length === 0) {
      toast.warning("Please enter password", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else if (password.includes(" ")) {
      console.log("passowrd error");
      toast.warning("password should not contain a white space", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else {
      return true;
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    checkCondition();
    axios
      .post("http://localhost:8080/login", formdata, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        let result = res.data;
        if (result.hasOwnProperty("error")) {
          toast.warning("Email/Password not matched", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.success("login succesfully", {
            position: "top-center",
            autoClose: 2000,
          });
          localStorage.setItem("token", result.token);
          setTimeout(() => {
            navigate("/");
          }, [2000]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <React.Fragment>
      <div className="login-page">
        <div className="login-header">
          <p>Login</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="form-label mt-10">
            <input
              type="text"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="form-label">
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <IoMdEyeOff
              className="form-label-toggle"
              onClick={togglePasswordVisibility}
            />
          </div>

          <button className="login-submit">SUBMIT</button>
        </form>
        <div className="login-register">
          <p className="login-register-text"> new user? </p>
          <Link to={"/register"} className="login-register-link">
            Register
          </Link>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  );
};

export default Login;
