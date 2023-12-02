import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProctedRoute/ProtectedRoute";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import Account from "./components/Account/Account";
import Home from "./components/Home/Home";
import Pagenotfound from "./components/PageNotFound/Pagenotfound";
import Navbar from "./components/Navbar/Navbar";
import AddApartment from "./components/Account/AddApartment/AddApartment";
import AddTenant from "./components/Account/AddTenent/AddTenant";
import AllApartments from "./components/Account/AllApartments/AllApartments";
import EditApartment from "./components/Account/EditApartment/EditApartment";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path="/add_appartment" element={<AddApartment />} />
          <Route path="/add_tenant" element={<AddTenant />} />
          <Route path="/all_apartments" element={<AllApartments />} />
          <Route path="/edit_apartment" element={<EditApartment  />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
};

export default App;
