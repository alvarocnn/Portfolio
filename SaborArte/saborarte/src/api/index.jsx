import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import axios from "axios";

const firebaseConfig = {
	apiKey: process.env.FIREBASE,
	authDomain: "tfg-daw-comida.firebaseapp.com",
	projectId: "tfg-daw-comida",
	storageBucket: "tfg-daw-comida.firebasestorage.app",
	messagingSenderId: "367759095182",
	appId: "1:367759095182:web:98b2cb5fe3a1a2956960df",
	measurementId: "G-YHW2LNXLFD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db };

// Cambiamos la función para aceptar parámetros dinámicos
export const fetchRecipes = async (from = 0, size = 20) => {
	const options = {
		method: "GET",
		url: "https://tasty.p.rapidapi.com/recipes/list",
		params: {
			from: from.toString(),
			size: size.toString(),
			tags: "under_30_minutes",
		},
		headers: {
			"x-rapidapi-key": "19dc8d01cdmsh19b3830599da18dp1700e8jsn5efff237790c",
			"x-rapidapi-host": "tasty.p.rapidapi.com",
		},
		timeout: 10000,
	};

	try {
		const response = await axios.request(options);
		if (response && response.data && response.data.results) {
			return response.data;
		} else {
			throw new Error("No recipes found");
		}
	} catch (error) {
		console.error("Error fetching recipes:", error.message);
		throw new Error("Error fetching recipes");
	}
};

export const autoCompleteRecipes = async (prefix) => {
	const options = {
		method: "GET",
		url: "https://tasty.p.rapidapi.com/recipes/auto-complete",
		params: { prefix },
		headers: {
			"x-rapidapi-key": "19dc8d01cdmsh19b3830599da18dp1700e8jsn5efff237790c",
			"x-rapidapi-host": "tasty.p.rapidapi.com",
		},
		timeout: 10000,
	};

	try {
		const response = await axios.request(options);
		console.log("Autocompletado API:", response); // Debugging
		if (response && response.data && response.data.results) {
			return response.data.results; // Retorna los resultados de autocompletado
		} else {
			throw new Error("No suggestions found");
		}
	} catch (error) {
		console.error("Error fetching autocomplete results:", error.message);
		throw new Error("Error fetching autocomplete results");
	}
};

// api/index.js

export const fetchRecipeDetails = async (recipeId) => {
	const options = {
		method: "GET",
		url: "https://tasty.p.rapidapi.com/recipes/get-more-info",
		params: { id: recipeId },
		headers: {
			"x-rapidapi-key": "19dc8d01cdmsh19b3830599da18dp1700e8jsn5efff237790c",
			"x-rapidapi-host": "tasty.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		console.log(response.data); // Aquí puedes manejar la respuesta de la receta
		return response.data; // Retorna la receta detallada
	} catch (error) {
		console.error("Error fetching recipe:", error);
		throw error; // Lanza el error para que lo manejes donde se llame a la función
	}
};
