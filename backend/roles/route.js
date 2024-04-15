const express = require("express");
const {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
  getSingleRole,
} = require("./controller.js");

const router = express.Router();

router.get("/", getRoles);
router.get("/:id", getSingleRole);
router.post("/",  createRole);
router.patch("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports =  router;
