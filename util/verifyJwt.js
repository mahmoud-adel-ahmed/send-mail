let jwt = require("jsonwebtoken");

let verifyJwt = async (req, res, next) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });
    let payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    // console.log("🚀 ~ verifyJwt ~ error:", error);
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ msg: "Invalid token, authorization denied" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ msg: "Invalid, token Expired!" });
    }
    res.status(500).json({ msg: "Server Error" });
  }
};

function handleRedirect(req, res, next) {
  const token = req.cookies?.auth_token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.redirect("/user/signin");
      }
      req.user = decodedToken;
      next();
    });
  } else {
    return res.redirect("/user/signin");
  }
}

module.exports = { verifyJwt, handleRedirect };
