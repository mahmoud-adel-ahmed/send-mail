const express = require("express");
const {
  sign_up,
  sign_in,
  log_out,
  getMe,
  signup_get,
  signin_get,
} = require("../controllers/UserController");
const { verifyJwt, handleRedirect } = require("../util/verifyJwt");
const router = express.Router();

router
  .get("/signup", signup_get)
  .post("/signup", sign_up)
  .get("/signin", signin_get)
  .post("/signin", sign_in)
  .get("/logout", log_out);

router.get("/me", verifyJwt, getMe);
module.exports = { router };
