const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Doctor = require("../Models/doctorSchema");
const passport = require("passport");
const jwtSecret = process.env.SECRET_KEY;

//Register the doctor
module.exports.Register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!email) {
			return res.status(400).json({
				msg: "Email is required",
			});
		}
		if (!name) {
			return res.status(400).json({
				msg: "Name is required",
			});
		}
		if (!password || password.length < 4) {
			return res.status(400).json({
				msg: "Password is required and it should be of length 4",
			});
		}

		let doctor = await Doctor.findOne({ email: email });

		//if doctor exists
		if (doctor) {
			return res.status(409).json({
				success: false,
				message: "Doctor already exists!",
			});
		} else {
			let hashPassword = await bcrypt.hash(password, 10);
			doctor = await Doctor.create({
				name: name,
				email: email,
				password: hashPassword,
			});
			return res.status(201).json({
				success: true,
				message: "Doctor created successfully!",
				doctor: {
					id: doctor._id,
					name: doctor.name,
					email: doctor.email,
				},
			});
		}
	} catch (error) {
		//catching errors
		console.log("Internal server error!!");
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error,
		});
	}
};

//Doctor Login
module.exports.Login = async (req, res) => {
	try {
		// if no password or email is provided
		let { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "No email or password found",
			});
		}

		// No doctor found with given email
		let doctor = await Doctor.findOne({ email: email });
		if (!doctor) {
			return res.status(401).json({
				success: false,
				message: "No Doctor found with this email!",
			});
		}

		//Incorrect password
		const isMatched = await bcrypt.compare(password, doctor.password);
		if (!isMatched) {
			return res.status(401).json({
				success: false,
				message: "Incorrect Credentials",
			});
		}

		// Get JWT token
		const payload = {
			_id: doctor._id,
			name: doctor.name,
			email: doctor.email,
		};

		jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err, token) => {
			if (err) {
				return res.json({
					message: "Error in generating token",
				});
			}
			return res.status(200).json({
				success: true,
				message: `Logged In Sucessful! Keep the Token safely  ${doctor.name}!`,
				token: token,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: "Error Occoured!",
			error: error,
		});
	}
};
