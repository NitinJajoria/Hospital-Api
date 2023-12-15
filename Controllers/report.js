const jwt = require("jsonwebtoken");
const Doctor = require("../Models/doctorSchema");
const Report = require("../Models/reportSchema");

module.exports.GetReports = async function (req, res) {
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
			let reports = await Report.find({ status: req.params.status });
			console.log(reports);
			return res.status(200).json({
				success: true,
				message: "Reports fetched successfully",
				data: reports,
			});
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
