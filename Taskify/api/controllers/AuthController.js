const User = require("../models/user");
const TaskList = require("../models/TaskList");
const jwt = require("jsonwebtoken");
const generateSecretKey = require("../utils/generateSecretKey");

const secretKey = generateSecretKey(); // In production, use process.env.JWT_SECRET

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		console.log(req.body);
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res
				.status(400)
				.json({ message: "El correo electrónico ya existe" });
		}

		const newUser = new User({ name, email, password });
		await newUser.save();

		res.status(201).json({ message: "Usuario registrado con éxito" });
	} catch (error) {
		res.status(500).json({ message: "Error al registrar el usuario", error });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user || user.password !== password) {
			return res
				.status(401)
				.json({ message: "Correo electrónico o contraseña inválidos" });
		}

		const token = jwt.sign({ userId: user._id }, secretKey);
		res.status(200).json({ token, userId: user._id });
	} catch (error) {
		res.status(500).json({ message: "Error al iniciar sesión", error });
	}
};

exports.register = register;
exports.login = login;
