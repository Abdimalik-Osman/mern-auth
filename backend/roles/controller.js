const Role = require("./model.js");

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.send({ status: "success", roles });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
exports.getSingleRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findById(id);
    res.send({ status: "success", data: role });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.createRole = async (req, res) => {
  try {

    const role = await Role.create(req.body);

    res.status(201).send({
      status: "success",
      message: "role created successfully",
      data: role,
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;


    const updateRole= await Role.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (!updateRole)
      return res
        .status(400)
        .json({ status: false, message: "Invalid action, Nothing to update" });

    res.status(201).send({
      status: "success",
      message: "role updated successfully",
      data: updateRole,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {


    const deletedRole= await Role.findOneAndDelete(
      { _id: id },
      { new: true }
    );
    if (!deletedRole)
      return res
        .status(400)
        .json({ status: false, message: "Invalid action, Nothing to delete" });

    res.send({
      status: "success",
      message: "role deleted successfully",
      data: deletedRole,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
