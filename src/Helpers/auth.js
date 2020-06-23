const jwt = require("jsonwebtoken");
const MiscHelper = require("../Helpers/helpers");
const Models = require('../Models/users')

const allowedAccess = process.env.REQUEST_HEADERS;

module.exports = {
  authInfo: (req, res, next) => {
    const headerAuth = req.headers["authorization"];
    const headerSecret = req.headers["x-access-token"];

    if (headerAuth !== allowedAccess) {
      return MiscHelper.response(
        res,
        null,
        401,
        "Unauthorized, Need Authentication!"
      );
    } else if (typeof headerSecret === "undefined") {
      console.log("Authentication Valid!");
      next();
    } else {
      const bearerToken = headerSecret.split(" ");
      const token = bearerToken[0];
      req.token = token;
      console.log("Token stored!");
      next();
    }
  },

  accesstoken: (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    const accessToken = req.params.token;
    const userToken = req.headers["x-control-user"];

    console.log(accessToken);
    console.log(userToken);


    jwt.verify(accessToken, secretKey, (err, decoded) => {
      if (err && err.name === "TokenExpiredError")
        return MiscHelper.response(res, null, 200, "Token expired");

      if (err && err.name === "JsonWebTokenError")
        return MiscHelper.response(res, null, 200, "Invalid Token");

      if (parseInt(userToken) !== parseInt(decoded.userid))
        return MiscHelper.response(res, null, 200, "Invalid User Token");

      console.log("Access Granted!");
      // Models.getById(parseInt(decoded.userid)).then(result => {
      //   return MiscHelper.response(res, result, 200)
      //   console.log(result);

      // }).catch(err =>
      //   console.log(err)
      // )
      next();
    });
  }
};
