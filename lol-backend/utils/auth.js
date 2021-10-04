const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Check headers for authorization field
  let headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authentication is required." });
  }

  // Get token from headers
  let token = headers.replace("Bearer ", "");

  // Verify token validity
  jwt.verify(token, process.env.JWTSECRET, (err, user) => {
    if (err) {
      return res.status(401).send({ message: "Token is invalid." });
    }
    req.entity = user;
    next();
  });
};
