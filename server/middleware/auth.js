const jwt = require("jsonwebtoken");


// =============================================
// AUTH MIDDLEWARE
// =============================================
const auth = async (req, res, next) => {

  try {

    const authheader =
      req.headers.authorization;


    // check token
    if (
      !authheader ||
      !authheader.startsWith("Bearer ")
    ) {

      return res.status(401).json({
        success: false,
        message: "token missing"
      });
    }


    // extract token
    const token =
      authheader.split(" ")[1];


    // verify token
    const decoded = jwt.verify(
      token,
      "secret"
    );


    // attach user
    req.user = decoded;


    next();

  } catch (err) {

    console.log(
      "AUTH ERROR:",
      err.message
    );

    return res.status(401).json({

      success: false,

      message: "invalid token"

    });
  }
};


module.exports = auth;