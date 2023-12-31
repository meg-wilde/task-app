const express = require("express");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const users = require("../users.json");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const secretKey = "your-secret-key";

// File path to the JSON file containing user data
const usersFilePath = path.join(__dirname, "../users.json");

//handle login
router.post("/login", (req, res) => {
  // Extracting username and password from the request body
  const { username, password } = req.body;

  // Find user in the users.json file
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  console.log("Identified user:", user);

  //check if a matching user as found
  if (!user) {
    // Responding with a 401 Unauthorized status and a JSON message
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token with the username
  const token = jwt.sign({ username: user.username }, secretKey, {
    expiresIn: "1h",
  });

  // Responding with the generated token
  res.json({ token });
});

// Route handler for user registration
router.post("/register", (req, res) => {
  try {
    // Extracting username and password from the request body
    const { username, password } = req.body;

    // Check if the username already exists
    const isUserExists = users.some((user) => user.username === username);

    //if the user exists
    if (isUserExists) {
      //return 400 with user already exists messsage
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if the username ends with "@gmail.com"
    if (!username.endsWith("@gmail.com")) {
      return res
        .status(403) //send 403 with error message
        .json({ message: "Username must end with @gmail.com" });
    }

    // Add the new user to users.json
    const newUser = { username, password };
    fs.writeFileSync(usersFilePath, JSON.stringify([...users, newUser]));
    //respond with success message
    res.json({ message: "Registration successful" });
  } catch (error) {
    //handle errors in registration
    console.error("Registration failed:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;
