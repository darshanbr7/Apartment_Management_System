import React, { useEffect } from "react";
import Sidenav from "./sidenav/Sidenav";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "./Account.css";
import axiosInstance from "../AxiosInstance/AxiosInstance";

const Account = () => {
  const [tenants, setTenants] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const filterData = tenants.filter((tenant) => {
    return (
      tenant.tenantName.toLowerCase().includes(search) ||
      tenant.room_No.includes(search)
    );
  });
  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/get_tenant_by_user")
      .then((res) => {
        setTenants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="getTenant-page">
      <Sidenav />
      <div>
        <input
          type="search"
          className="searchBar"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search Tenant By Name or Room No"
        />
      </div>
      <div className="getTenant-table">
        <table className="table  getTenant-table-page table-bordered table-striped">
          <thead className="thead-dark">
            <th scope="col">Tenant Name</th>
            <th scope="col">Phone No</th>
            <th scope="col"> Id Type</th>
            <th scope="col">Id No</th>
            <th scope="col">Image</th>
            <th scope="col">Apartment Name</th>
            <th scope="col">Room No</th>
            <th scope="col">Stayed From</th>
            <th scope="col">Remove</th>
          </thead>
          <tbody>
            {filterData.map((tenant, index) => {
              return (
                <tr key={index}>
                  <td>{tenant.tenantName}</td>
                  <td>{tenant.ph_no}</td>
                  <td>{tenant.id_type}</td>
                  <td>{tenant.id_number}</td>
                  <td>
                    <img
                      src={`http://localhost:8080/Images/${tenant.image}`}
                      alt="Not found"
                      style={{ height: "200px", width: "200px" }}
                    />{" "}
                  </td>
                  <td>{tenant.apartment_name}</td>
                  <td>{tenant.room_No}</td>
                  <td>{tenant.Date.slice(0, 10)}</td>
                  <td
                    onClick={() => {
                      axiosInstance
                        .delete(
                          `http://localhost:8080/delete_tenant/${tenant._id}`
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                  >
                    <MdOutlineDeleteOutline size={20} />
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

export default Account;
