const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const user = require("../models/user");
const auth = require("../utils/auth");

// Log user in and get token
router.post("/login", function (req, res) {
  const { username, password } = req.body;

  user
    .getUserWithUsernamePassword(username, password)
    .then((result) => {
      console.log(result);
      if (result) {
        delete result["password"]; //clear the password in json data
        // Sign the user result and get token
        jwt.sign(result, process.env.JWTSECRET, (err, token) => {
          if (err) {
            return res.status(500).send({ err: "An error had occurred." });
          }
          res.status(200).json({
            user: { ...result },
            token: token,
            message: "You are successfully logged in!",
          });
        });
      } else {
        res.status(400).json({ err: "Wrong username or password." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

// Sign user up
router.post("/signup", function (req, res) {
  const { fullName, username, email, password } = req.body;

  // Create user
  user
    .insertIntoUser(fullName, username, email, password)
    .then((result) => {
      console.log(result);
      res
        .status(200)
        .json({ message: "Sign up is successful!", id: result.insertedId });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

// Get specific user by username
router.get("/:username", auth, function (req, res) {
  const { username } = req.params;
  user
    .getUser(username)
    .then((result) => {
      console.log(result);
      res.status(200).json({ user: result });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

module.exports = router;
