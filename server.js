// Create an instance of the Express app
const express = require("express");
const server = express();
require("dotenv").config();
require("./Configuration/db_connection");
const passport = require("passport");
const port = process.env.port || 5000;
const router = require("./Routes/router");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Passport middleware
server.use(passport.initialize());
require("./Configuration/passport_jwt")(passport);

// Routes middleware
server.use(router);

// Start the server
server.listen(port, (err) => {
	if (err) {
		console.log("Error", err);
		return;
	}
	console.log(`Server is running at http://localhost:${port}`);
});
