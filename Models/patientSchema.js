const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		mobile: {
			type: Number,
			minlength: 10,
			maxlength: 10,
			required: true,
			unique: true,
		},
		age: {
			type: Number,
			required: true,
			min: 1,
			max: 120,
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Others"],
			required: true,
		},
		doctor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Doctor",
		},
	},
	{
		timestamps: true,
	}
);

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
