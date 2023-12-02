import React from "react";
import "./Home.css";
import pic4 from "../images/image4.jpg";

const Home = () => {
  return (
    <React.Fragment>
      <div>
        <div className="text-animation-container">
          <div className="animated-text">
            You don't worry about your Apartment Tenant detail, We will manage!
          </div>
        </div>
        <div className="image-container">
          <img src={pic4} alt="pic" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
