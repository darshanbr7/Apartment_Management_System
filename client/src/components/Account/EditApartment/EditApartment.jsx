import React, { useState } from "react";
import Sidenav from "../sidenav/Sidenav";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EditApartment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(
    location.state.apartment ? location.state.apartment : {}
  );
  const [apartmentName, setApartmentName] = useState(data.building_name ?? "");
  const [rooms, setRooms] = useState(data.rooms ?? "");
  const [apartmentAddress, setApartmentAddress] = useState(
    data.buildig_address ?? ""
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputData = {
      building_name: apartmentName,
      rooms: rooms,
      buildig_address: apartmentAddress,
    };
    axios
      .put(`http://localhost:8080/update_apartment/${data._id}`, inputData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        console.log(result);
        toast.success("Apartment data updated", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          setData({});
          setApartmentName("");
          setRooms("");
          setApartmentAddress("");
          navigate("/all_apartments");
        }, [2000]);
      })
      .catch((e) => {
        toast.warning("Error while updating Apartment Data", {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  return (
    <div>
      <Sidenav />
      <div className="addApartment">
        <div className="addApartment-form ">
          <form onSubmit={handleSubmit}>
            <h1 className="addApartment-header"> Edit Apartment</h1>
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
              onClick={() => {}}
            >
              Cancel
            </button>
            <button className=" text-white absolute  p-2 uppercase font-bold   opacity-80 mt-2 ml-60 border-1 border-yellow-300 rounded-lg shadow-xl bg-green-500 tracking-wider hover:bg-green-700  hover:text-white ">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditApartment;
