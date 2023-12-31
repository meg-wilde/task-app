const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";

// Middleware function for authenticating incoming requests using JWT
function authenticate(req, res, next) {
  // Extract the token from the 'Authorization' header in the request
  const token = req.headers["authorization"];

  // Checking if the token is missing in the request headers
  if (!token) {
    // Responding with a 401 Unauthorized status and a JSON message
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verifying the authenticity of the token using the secret key
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      //handle errors
      return res.status(403).json({ message: "Forbidden" });
    }
    // If verification is successful, attaching the user information to the request
    req.user = user;

    // Proceed to next middleware or route handler
    next();
  });
}

module.exports = { authenticate };
