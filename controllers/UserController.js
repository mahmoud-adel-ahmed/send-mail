const Users = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function handleError(err) {
  const error = {};
  if (err?.message.includes("validation") && err.errors) {
    Object.values(err?.errors).forEach(({ properties = {} }) => {
      const { message, path } = properties;
      error[path] = message;
    });
  }

  if (err.code === 11000) {
    error.email = "Email already exists";
  }

  return error;
}

const getMe = async (req, res) => {
  try {
    const { id } = req.payload;
    const user = await Users.findById({ _id: id }).select("-__v +password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const signup_get = (req, res) => {
  res.render("signup", { title: "signup" });
};

const sign_up = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Users.create({ name, email, password });

    const userResponse = user.toObject();
    delete userResponse.__v;

    const token = genTokens({ id: user._id });
    // res.cookie("auth_token", token, { httpOnly: true });
    res.status(201).json({ userResponse, token });
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("validation") || error.code === 11000)
      return res.status(400).json({ errors: handleError(error) });
    res.status(500).json({ msg: "Server Error" });
  }
};

const signin_get = (req, res) => {
  res.render("signin", { title: "Login" });
};

const sign_in = async (req, res) => {
  try {
    const { email, password } = req.body;
    let errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ msg: "User is not Found" });
    }

    if (!(await bcrypt.compare(password, user?.password))) {
      return res.status(401).json({ msg: "Invalid data" });
    }

    const responseUser = user.toObject();
    delete responseUser.__v;

    const token = genTokens({ id: user._id });
    res.cookie("auth_token", token, { httpOnly: true });

    res.status(201).json({ user: responseUser, token });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const log_out = async (req, res) => {
  try {
    res.cookie("auth_token", "", { maxAge: 1 });

    res.status(200).json({ msg: "log_out successful" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

function genTokens(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" });
}

module.exports = { sign_up, sign_in, log_out, getMe, signin_get, signup_get };
