require("dotenv/config");
const { join } = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const { db, connectDb } = require("./util/connectDb");
const { router: userRouter } = require("./routes/userRoute");
const { router: emailRouter } = require("./routes/emailRoute");
const app = express();

app.set("view engine", "ejs");
app.use("/", express.static(join(__dirname, "public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDb();
db.once("open", () =>
  app.listen(process.env.PORT || 3000, () => {
    console.log("connected to Mongoose");
    console.log("Listening on port " + process.env.PORT);
  })
);

db.on("error", (err) => {
  console.log(err.message);
});

app.use("/user", userRouter);
app.use("/", emailRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Page not found" });
});
