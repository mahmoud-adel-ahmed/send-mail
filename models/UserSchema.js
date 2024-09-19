let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    validate: {
      validator: function (value) {
        return /^[a-z\sA-Z]+$/.test(value);
      },
      message: "Please enter a valid name",
    },
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(12);
  let hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

module.exports = mongoose.models.users || mongoose.model("User", UserSchema);
