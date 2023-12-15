const jwt = require("jsonwebtoken");
const Patient = require("../Models/patientSchema");
const Doctor = require("../Models/doctorSchema");
const Report = require("../Models/reportSchema");

module.exports.RegisterPatient = async function (req, res) {
	const receivedToken = req.headers.authorization;
	// console.log(receivedToken);
	const token = receivedToken.split(" ")[1];
	// console.log(token);
	const decoded = jwt.verify(token, process.env.SECRET_KEY);
	// console.log(decoded);
	try {
		// console.log(decoded._id);
		const doctor = await Doctor.findById(decoded._id);
		if (!doctor) {
			return res.status(401).json({
				success: false,
				message: "Doctor does not exist in database!",
			});
		} else {
			let patient = await Patient.findOne({ phone: req.body.mobile });
			if (patient) {
				return res.status(201).json({
					success: false,
					message: "Patient already exists",
				});
			} else {
				patient = await Patient.create(req.body);
				return res.status(200).json({
					success: true,
					message: "Patient created successfully",
					patient: patient,
				});
			}
		}
	} catch (error) {
		console.log("Internal server error!!");
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error,
		});
	}
};

module.exports.CreateReport = async function (req, res) {
	const receivedToken = req.headers.authorization;
	const token = receivedToken.split(" ")[1];
	const decoded = jwt.verify(token, process.env.SECRET_KEY);

	try {
		const doctor = await Doctor.findById(decoded._id);
		if (!doctor) {
			return res.status(401).json({
				success: false,
				message: "Doctor does not exist in database!",
			});
		} else {
			let patient = await Patient.findById(req.params.id);
			if (patient) {
				let report = await Report.create({
					doctor: decoded._id,
					patient: patient._id,
					status: req.body.status,
				});
				return res.status(201).json({
					success: true,
					message: "Report created successfully'",
					data: report,
				});
			} else {
				return res.status(401).json({
					success: false,
					message: "Patient does not exist in database!",
				});
			}
		}
	} catch (error) {
		//checking for errors
		console.log("Internal server error!!");
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error,
		});
	}
};

module.exports.AllReports = async function (req, res) {
	const receivedToken = req.headers.authorization;
	const token = receivedToken.split(" ")[1];
	const decoded = jwt.verify(token, process.env.SECRET_KEY);

	try {
		const doctor = await Doctor.findById(decoded._id);
		if (!doctor) {
			return res.status(401).json({
				success: false,
				message: "Doctor does not exist in database!",
			});
		} else {
			let patient = await Patient.findById(req.params.id);
			if (patient) {
				let reports = await Report.find({ patient: patient._id }).sort({
					date: -1,
				});
				return res.status(201).json({
					success: true,
					message: "Reports fetched successfully",
					data: reports,
				});
			} else {
				return res.status(401).json({
					success: false,
					message: "Patient does not exist in database!",
				});
			}
		}
	} catch (error) {
		//checking for errors
		console.log("Internal server error!!");
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error,
		});
	}
};
