import React, { useEffect } from "react";
import "./AddTenant.css";
import axiosInstance from "../../AxiosInstance/AxiosInstance";
import Sidenav from "../sidenav/Sidenav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddTenant = () => {
  const [apartments, setApartments] = React.useState([]);
  const [tenantName, setTenantName] = React.useState("");
  const [phonenumber, setphonenumber] = React.useState("");
  const [idtype, setIdType] = React.useState("");
  const [image, setImage] = React.useState({});
  const [idNumber, setIdNumber] = React.useState("");
  const [selectApartment, setSelectApartment] = React.useState("");
  const [roomNo, setRoomNo] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/get_apartments")
      .then((res) => {
        setApartments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formData = {
    tenantName: tenantName,
    ph_no: phonenumber,
    id_type: idtype,
    id_number: idNumber,
    image: image,
    apartment_name: selectApartment,
    room_No: roomNo,
  };

  const formValidate = () => {
    if (
      tenantName.length === 0 ||
      phonenumber.length === 0 ||
      idtype === 0 ||
      idNumber.length === 0 ||
      selectApartment.length === 0 ||
      roomNo.length === 0
    ) {
      toast.warning("please  fill all the fields", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else if (phonenumber.length < 10 || phonenumber.length > 10) {
      toast.warning("Phone number should be in 10 degit", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else if (
      (idtype === "aadhar" && idNumber.length < 12) ||
      (idtype === "aadhar" && idNumber.length > 12)
    ) {
      toast.warning("Aadhar should be in 12 degit", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else if (
      (idtype === "ration card" && idNumber.length < 12) ||
      (idtype === "ration card" && idNumber.length > 12)
    ) {
      toast.warning("Ration Card be in 12 degit", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else {
      return true;
    }
  };
  const selecHandler = () => {
    if (apartments.length === 0) {
      toast.warning("please add your apartment", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  const sendData = () => {
    axiosInstance
      .post("http://localhost:8080/add_tenant", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        let result = res.data;
        if (result.hasOwnProperty("error")) {
          toast.warning("Server Error", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.success("Tenant Added Succesfully", {
            position: "top-center",
            autoClose: 2000,
          });

          setTimeout(() => {
            navigate("/account");
          }, [2000]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const trueBlock = () => {
    sendData();
    setImage({});
    setTenantName("");
    setphonenumber("");
    setIdType("");
    setIdNumber("");
    setSelectApartment("");
    setRoomNo("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    formValidate() ? trueBlock() : console.error("validation failed");
  };
  return (
    <div>
      <Sidenav />

      <div className="addTenant-form">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <h2 className="addTenant-header ">Add Tenant</h2>
          <div className=" addTenant-field">
            <label className="addTenant-label">Tenant Name :</label>
            <input
              type="text"
              className="addTenant-input"
              value={tenantName}
              onChange={(e) => {
                setTenantName(e.target.value);
              }}
              autoFocus
            />
          </div>
          <div className=" addTenant-field">
            <label className="addTenant-label">Phone No :</label>
            <input
              type="number"
              className="addTenant-input"
              value={phonenumber}
              onChange={(e) => {
                setphonenumber(e.target.value);
              }}
            />
          </div>
          <div className="addTenant-field">
            <label className="addTenant-label">ID Type :</label>
            <select
              className="addTenant-input"
              value={idtype}
              onChange={(e) => {
                setIdType(e.target.value);
              }}
            >
              <option value="">-- Please select --</option>
              <option value="aadhar">Aadhar</option>
              <option value="pan card">Pan Card</option>
              <option value="ration card">Ration Card</option>
            </select>
          </div>
          <div className=" addTenant-field">
            <label className="addTenant-label">ID No :</label>
            <input
              type="text"
              className=" addTenant-input"
              value={idNumber}
              onChange={(e) => {
                setIdNumber(e.target.value);
              }}
            />
          </div>
          <div className=" addTenant-field">
            <label className="addTenant-label">Image :</label>
            <input
              type="file"
              className="addTenant-image"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div className="addTenant-field">
            <label className="addTenant-label">Select Apartment :</label>
            <select
              className="ml-8"
              value={selectApartment}
              onChange={(e) => {
                setSelectApartment(e.target.value);
              }}
              onClick={selecHandler}
            >
              <option value="">-- Please select --</option>
              {apartments.map((apartment, index) => {
                return (
                  <option value={apartment.building_name} key={index}>
                    {apartment.building_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className=" addTenant-field">
            <label className="addTenant-label"> Room Number :</label>
            <input
              type="text"
              className=" addTenant-input"
              value={roomNo}
              onChange={(e) => {
                setRoomNo(e.target.value);
              }}
            />
          </div>
          <button
            className="addTenant-back"
            onClick={() => {
              navigate("/account");
            }}
          >
            Back
          </button>
          <button className=" addTenat-add ">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddTenant;
