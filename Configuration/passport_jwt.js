const Doctor = require("../Models/doctorSchema");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwtSecret = process.env.SECRET_KEY;

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtSecret,
};

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(options, async (jwtPayload, done) => {
			const user = await Doctor.findOne({ _id: jwtPayload._id });
			if (user) {
				return done(null, user);
			} else {
				console.log("Error in JWT User Authentication");
			}

			// Check if the user exists in the database based on the jwtPayload
			// Example: You might query the database to find the user by ID
			// If the user is found, call done(null, user)
			// If the user is not found, call done(null, false)
		})
	);
};
