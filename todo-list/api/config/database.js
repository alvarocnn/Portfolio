const mongoose = require("mongoose");
const { eventNames } = require("../models/user");

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log("MongoDB connected");
	} catch (error) {
		console.error("MongoDB connection failed", error);
		process.exit(1);
	}
};

module.exports = connectDB;
