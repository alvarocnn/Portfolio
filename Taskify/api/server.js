const app = require("./app");
const mongoose = require("mongoose");
const port = 3000;

const startServer = async () => {
	try {
		await mongoose.connect(process.env.MONGO_SERVER);
		console.log("Connected to MongoDB");
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		console.error("Error connecting to MongoDB", error);
		process.exit(1);
	}
};

startServer();
