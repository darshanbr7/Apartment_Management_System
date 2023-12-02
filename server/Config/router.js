const express = require("express");
const userController = require("../App/controller/usercontroller/usercontroller");
const auth = require("../App/middleware/auth");
const apartment_Controller = require("../App/controller/apartmentController/apartmentController");
const addTenant = require("../App/controller/tenantController.js/tenantController");
const tenantController = require("../App/controller/tenantController.js/tenantController");
const { upload } = require("../App/middleware/multer");
const route = express.Router();

route.get("/", (req, res) => {
  res.json("Welcom To Home Page");
});
route.post("/register", userController.register);
route.post("/login", userController.login);

route.get("/get_apartments", auth.verify, apartment_Controller.get);
route.post("/add_apartment", auth.verify, apartment_Controller.add);
route.put("/update_apartment/:id", auth.verify, apartment_Controller.update);
route.delete("/delete_apartment/:id", auth.verify, apartment_Controller.delete);

route.post("/add_tenant", auth.verify, upload.single("image"), addTenant.add);
route.get("/get_tenant_by_user", auth.verify, addTenant.getAllTenant);
route.get("/get_By_Apartment/:apartmentName", tenantController.getByApartment);
route.delete("/delete_tenant/:id", auth.verify, tenantController.deletetenant);

module.exports = route;
