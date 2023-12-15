const mongoose = require("mongoose");
const validator = require("validator");

const DoctorSchema = mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw Error("Invalid Email Address");
				}
			},
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;
