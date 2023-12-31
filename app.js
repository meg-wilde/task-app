const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const helmet = require("helmet"); // Import helmet for security
const users = require("./users.json");
const middleware = require("./routes/middleware");
const usersRoute = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3001; //set port to 3001

app.use(helmet()); // Use helmet middleware to set HTTP headers for security
app.use(express.json()); // Parse JSON request using middleware
// Parsing URL-encoded request bodies with extended options using body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", usersRoute); // Using the user-related routes for requests starting with "/users"

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
