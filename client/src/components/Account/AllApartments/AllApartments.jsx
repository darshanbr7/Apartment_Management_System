import React, { useEffect } from "react";
import "./AllApartments.css";
import Sidenav from "../sidenav/Sidenav";
import axiosInstance from "../../AxiosInstance/AxiosInstance";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const AllApartments = () => {
  const [apartments, setApartments] = React.useState([]);
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
  }, [apartments]);
  return (
    <div>
      <Sidenav />
      <div>
        <table className="table allApartments-table table-bordered table-striped">
          <thead className="thead-dark">
            <th scope="col">Apartment Name</th>
            <th scope="col">Total Rooms</th>
            <th scope="col"> Address</th>
            <th scope="col"> Edit</th>
            <th scope="col">Remove</th>
          </thead>
          <tbody>
            {apartments.map((apartment, index) => {
              return (
                <tr key={index}>
                  <td>{apartment.building_name}</td>
                  <td>{apartment.rooms}</td>
                  <td>{apartment.buildig_address}</td>
                  <td>
                    <BiEdit
                      size={20}
                      onClick={() => {
                        navigate("/edit_apartment", {
                          state: { apartment },
                        });
                      }}
                    />
                  </td>
                  <td>
                    <MdDelete
                      size={20}
                      onClick={() => {
                        axiosInstance
                          .delete(
                            `http://localhost:8080/delete_apartment/${apartment._id}`
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllApartments;
