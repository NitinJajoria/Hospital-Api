const { Router } = require("express");
const router = Router();
const passport = require("passport");
const jwtMiddleware = require("../Configuration/jwtMiddleware");

const { Register, Login } = require("../Controllers/doctor");
const {
	RegisterPatient,
	CreateReport,
	AllReports,
} = require("../Controllers/patient");

const { GetReports } = require("../Controllers/report");

router.get("/", function (req, res) {
	return res.status(200).json({
		message:
			"Feel free to hit any API for checking the functionality. Please use '/doctor/register' for registering doctor, '/doctor/login' for logining doctor, '/patient/Register' for registering patient, '/patient/create_report/:id' for creating report of patient, '/patient/all_reports/:id' for all reports of patient, and '/report/:status/ for filtering all reports with status",
	});
});

// Routes for Doctor
router.post("/doctor/register", Register);
router.post("/doctor/login", Login);

// Routes for Patient
router.post("/patient/Register", jwtMiddleware, RegisterPatient);
router.post("/patient/create_report/:id", jwtMiddleware, CreateReport);
router.get("/patient/all_reports/:id", jwtMiddleware, AllReports);

// Routes for reports
router.get("/report/:status", jwtMiddleware, GetReports);

module.exports = router;
