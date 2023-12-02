import React from "react";
import "./AddApartment.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidenav from "../sidenav/Sidenav";
import axios from "axios";

const AddApartment = () => {
  const Navigate = useNavigate();
  const [apartmentName, setApartmentName] = React.useState("");
  const [rooms, setRooms] = React.useState("");
  const [apartmentAddress, setApartmentAddress] = React.useState("");
  const formdata = {
    building_name: apartmentName,
    rooms: rooms,
    buildig_address: apartmentAddress,
  };

  const formValidate = () => {
    if (
      apartmentName.length === 0 ||
      rooms.length === 0 ||
      apartmentAddress.length === 0
    ) {
      toast.warning("please  fill all the fields", {
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
      .post("http://localhost:8080/add_apartment", formdata, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        let result = res.data;
        if (result.hasOwnProperty("error")) {
          toast.warning("Server Error", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.success("Apartment Added Succesfully", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const trueBlock = () => {
    sendData();
    setApartmentName("");
    setRooms("");
    setApartmentAddress("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formdata);
    formValidate() ? trueBlock() : console.log("Validation Failed");
  };

  return (
    <div>
      <Sidenav />
      <div className="addApartment">
        <div className="addApartment-form ">
          <form onSubmit={submitHandler}>
            <h1 className="addApartment-header"> Add Apartment</h1>
            <div className=" form-group">
              <label className="inline-block text-lg font-bold ml-4 mt-2">
                Apartment Name :
              </label>
              <input
                type="text"
                className=" form-control ml-10  w-1/2 font-bold tracking-wider"
                value={apartmentName}
                onChange={(e) => {
                  setApartmentName(e.target.value);
                }}
              />
            </div>
            <div className=" form-group">
              <label className="inline-block text-lg font-bold ml-4 mt-2">
                Rooms :
              </label>
              <input
                type="Number"
                className=" form-control ml-10  w-1/2 font-bold tracking-wider"
                value={rooms}
                onChange={(e) => {
                  setRooms(e.target.value);
                }}
              />
            </div>
            <div className=" form-group">
              <label className="inline-block text-lg font-bold ml-4 mt-2">
                Apartment Address :
              </label>
              <textarea
                rows={2}
                cols={20}
                className=" form-control ml-10  w-1/2 font-bold tracking-wider"
                value={apartmentAddress}
                onChange={(e) => {
                  setApartmentAddress(e.target.value);
                }}
              />
            </div>
            <button
              className=" text-white absolute  p-2 uppercase font-bold   opacity-80 mt-2 ml-32 border-1 border-yellow-300 rounded-lg shadow-xl bg-blue-500 tracking-wider hover:bg-blue-700  hover:text-yellow-400 "
              onClick={() => {
                Navigate("/account");
              }}
            >
              Back
            </button>
            <button className=" text-white absolute  p-2 uppercase font-bold   opacity-80 mt-2 ml-60 border-1 border-yellow-300 rounded-lg shadow-xl bg-green-500 tracking-wider hover:bg-green-700  hover:text-white ">
              Add
            </button>
          </form>
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
    </div>
  );
};

export default AddApartment;
