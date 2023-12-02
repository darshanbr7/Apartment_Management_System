import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidenav.css";
import { BsBuildingAdd } from "react-icons/bs";
import { IoIosPersonAdd } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidenav = () => {
  const navigate = useNavigate();
  const logout = () => {
    toast.success("Logout succesfuly", {
      position: "top-center",
      autoClose: 2000,
    });
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/");
    }, [2000]);
  };
  return (
    <div className="sidenav">
      <Link to={"/account"}>
        <FaUsers size={30} color={"white"} />
      </Link>
      <Link to={"/add_appartment"}>
        <BsBuildingAdd size={30} color={"white"} />
      </Link>
      <Link to={"/add_tenant"}>
        <IoIosPersonAdd size={30} color={"white"} />
      </Link>
      <Link to={"/all_apartments"}>
        <HiMiniBuildingOffice2 size={30} color={"white"} />
      </Link>
      <Link onClick={logout}>
        <TbLogout2 size={30} color={"white"} />
      </Link>
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

export default Sidenav;
