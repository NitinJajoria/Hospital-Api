const mongoose = require("mongoose");

const DB = process.env.MONGODB_URL;

mongoose
	.connect(DB, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log("Connected to Database :: MongoDB"))
	.catch((err) => console.log("error", err));
