const mongoose = require("mongoose");
const dbconnection = () => {
  mongoose
    .connect("mongodb+srv://darsan:123456d@cluster0.ac3q66d.mongodb.net/APM")
    .then(() => {
      console.log("connected to server");
    })
    .catch(() => {
      console.log("not connected");
    });
};

module.exports = dbconnection;
