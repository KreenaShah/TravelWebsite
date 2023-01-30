const express = require('express');
const {login , register} = require("../controller/userController.js");
const auth = require("../middlewares/jwtAuth.js");
// import {
//   addUser,
//   getUsers,
//   getUser,
//   editUser,
//   deleteUser,
// } from "../controller/userController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/all", (req, res) => {
  console.log("Hey!");
  res.send("Hey , Kreena here!");
});

router.get("/home", auth, (req, res) => {
    console.log('Welcome');
  res.status(200).send("Welcome 🙌 ");
});

// router.post("/add", addUser);
// router.get("/all", getUsers);
// router.get("/:id", getUser);
// router.put("/:id", editUser);
// router.delete("/:id", deleteUser);

module.exports = router;
