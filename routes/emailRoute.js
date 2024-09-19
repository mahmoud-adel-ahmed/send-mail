const express = require("express");

const { sendMail } = require("../controllers/EmailController");
const { handleRedirect } = require("../util/verifyJwt");
const router = express.Router();

router.get("/", handleRedirect, (req, res) => {
  res.render("main", { title: "Main" });
});

router.post("/sendmail", sendMail);
module.exports = { router };
