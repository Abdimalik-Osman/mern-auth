const express = require("express");
const {
  registerUser,
  login,
  getSingleUser,
  verify
} = require("./controller.js");

const router = express.Router();

router.get("/:id", getSingleUser);
router.post("/",  registerUser);
router.post("/login",  login);
router.get("/verify",  verify);

module.exports =  router;
