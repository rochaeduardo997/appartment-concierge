const jwt = require("jsonwebtoken");
const { superSecretPasswordJWT } = require("../../config/security.json");

module.exports = async (req, res, next) => {
  const authToken = req.headers['authorization'];

  if(authToken) {
    const [ _, token ] = authToken.split(" ");

    const decoded = await jwt.verify(token, superSecretPasswordJWT);

    if(decoded.id > 0) {
      req.id      = decoded.id;
      req.email   = decoded.email;
      req.profile = decoded.profile;

      return next();
    }
  } else {
    return res.status(400).json({ status: false, error: "Failed on authentication" });
  }
}
