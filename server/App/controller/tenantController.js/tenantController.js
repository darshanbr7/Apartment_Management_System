const tenant = require("../../module/tenant/tenant");
const tenantController = {};
tenantController.add = async (req, res) => {
  const { tenantName, ph_no, id_type, id_number, apartment_name, room_No } =
    req.body;
  const data = req.user;
  const imagePath = req.file.filename;
  const addtenant = new tenant({
    tenantName,
    ph_no,
    id_type,
    id_number,
    image: imagePath,
    apartment_name,
    room_No,
    userId: data.user_Id,
  });
  try {
    await addtenant.save();
    res.json({ data: addtenant, message: "Tenant added successfully" });
  } catch (error) {
    res.json({ error: "Internal server error" });
  }
};

tenantController.getAllTenant = (req, res) => {
  const data = req.user;
  tenant
    .find({ userId: data.user_Id })
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.json({ error: e });
    });
};

tenantController.getByApartment = (req, res) => {
  const apartmentName = req.params.apartmentName;
  tenant
    .find({ apartment_name: apartmentName })
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.json({ error: e });
    });
};

tenantController.deletetenant = (req, res) => {
  const id = req.params.id;
  tenant
    .findByIdAndDelete(id)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.json({ error: e });
    });
};

module.exports = tenantController;
