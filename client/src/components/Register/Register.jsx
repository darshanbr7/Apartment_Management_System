import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const formdata = {
    userName: userName,
    email: email,
    password: password,
  };

  const checkCondition = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (userName.length === 0 && password.length === 0 && email.length === 0) {
      toast.warning("please enter data", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else if (userName.length === 0) {
      toast.warning("Please enter userName", {
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
    } else if (password.length < 6 || password.length > 18) {
      toast.warning("password should be in range 6 to 18", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else {
      return true;
    }
  };

  const sendData = () => {
    axios
      .post("http://localhost:8080/register", formdata)
      .then((res) => {
        let result = res.data;
        if (result.hasOwnProperty("error")) {
          toast.warning("user Already exist", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.success("user register succesfuly", {
            position: "top-center",
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/login");
          }, [2000]);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    checkCondition() ? sendData() : console.log("false block");
  };
  return (
    <div className="register-page">
      <div className="w-96 h-96 bg-gray-200 rounded-lg shadow-xl   absolute mt-20 ">
        <p className="  register-header mt-6 uppercase font-bold  text-3xl  block text-red-900 w-auto tracking-wider">
          Register
        </p>
        <form
          onSubmit={submitHandler}
          className="justiy-content-center items-center"
        >
          <label className=" font-bold tracking-wider mt-14 ml-4 absolute">
            UserName :
          </label>
          <input
            type="text"
            className="rounded absolute mt-14 ml-32 shadow-xl font-bold tracking-wider opacity-60 bg-white"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <label className=" font-bold tracking-wider mt-28 ml-10 absolute">
            Email :
          </label>
          <input
            type="text"
            className="rounded absolute mt-28 ml-32 shadow-xl font-bold tracking-wider opacity-60 bg-white"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className=" font-bold tracking-wider mt-40 ml-4 absolute">
            Password :
          </label>
          <input
            type="password"
            className="rounded absolute mt-40 ml-32 shadow-xl font-bold tracking-wider opacity-60 bg-white"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className=" register-button mt-56  p-2 border-1 bg-orange-300 rounded-lg font-bold tracking-wider  text-white hover:bg-green-500 shadow-2xl">
            {" "}
            Register
          </button>
        </form>
        <div className="tracking-wider font-bold  text-black  ml-20 mt-4">
          <p className="opacity-60 inline-block">Already user ?</p>
          <Link
            to={"/login"}
            className="ml-2 tracking-wider text-red-700 hover:text-red-900 shadow-2xl underline"
          >
            Login
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
    </div>
  );
};

export default Register;
