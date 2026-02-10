import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	KeyboardAvoidingView,
	TextInput,
	Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const token = await AsyncStorage.getItem("authToken");
				const userId = await AsyncStorage.getItem("userId");

				console.log("Verificando login. Token:", token, "UserId:", userId);

				if (token && userId) {
					router.replace("/(tabs)/home");
				}
			} catch (error) {
				console.log("Error verificando login:", error);
			}
		};
		checkLoginStatus();
	}, []);

	const handleLogin = async () => {
		try {
			const user = { email, password };

			// 🔥 Usa una sola llamada con await
			const response = await axios.post("http://10.0.2.2:3000/api/login", user);

			const token = response.data.token;
			const userId = response.data.userId;

			if (!token || !userId) {
				console.log("Error: No se recibió token o userId");
				return;
			}

			await AsyncStorage.setItem("authToken", token);
			await AsyncStorage.setItem("userId", userId);

			console.log("Login exitoso, userId:", userId);
			router.replace("/(tabs)/home");
		} catch (error) {
			console.log("Error en login:", error.response?.data || error.message);
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={{ marginTop: 50 }}>
				<Text style={styles.logoText}>Welcome to Taskify</Text>
			</View>

			<KeyboardAvoidingView>
				<View style={{ marginTop: 40 }}>
					{/* Email input */}
					<View style={styles.inputViewEmail}>
						<MaterialIcons
							style={{ marginLeft: 5 }}
							name="email"
							size={24}
							color="#ff5733"
						/>
						<TextInput
							value={email}
							onChangeText={setEmail}
							placeholder="Enter email"
							style={styles.textInput}
						/>
					</View>

					{/* Password input */}
					<View style={styles.inputViewPassword}>
						<FontAwesome
							name="lock"
							size={24}
							color="#ff5733"
							style={{ marginLeft: 5 }}
						/>
						<TextInput
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							placeholder="Enter password"
							style={styles.textInput}
						/>
					</View>

					<View style={styles.bottomInput}>
						<Text>Keep me logged in</Text>
						<Text style={styles.forgotPassword}>Forgot password</Text>
					</View>

					<View style={{ marginTop: 65 }} />

					<Pressable onPress={handleLogin} style={styles.loginButton}>
						<Text style={styles.logintext}>Login</Text>
					</Pressable>

					<View style={{ marginTop: 20 }} />

					<Pressable onPress={() => router.replace("./register")}>
						<Text style={styles.registerText}>Don't have an account?</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Login;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#e8e8e8",
		alignItems: "center",
	},
	logoText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#ff5733",
	},
	inputViewEmail: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		backgroundColor: "#CDCDCD",
		paddingVertical: 2.5,
		borderRadius: 5,
		marginTop: 20,
	},
	inputViewPassword: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		backgroundColor: "#CDCDCD",
		paddingVertical: 2.5,
		borderRadius: 5,
		marginTop: 20,
	},
	textInput: {
		color: "black",
		marginVertical: 10,
		marginLeft: 7,
		width: 300,
		fontSize: 17,
	},
	bottomInput: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 12,
		justifyContent: "space-between",
	},
	forgotPassword: {
		color: "#00A3EE",
		fontWeight: "500",
	},
	loginButton: {
		width: 270,
		backgroundColor: "#ff5733",
		padding: 15,
		borderRadius: 6,
		marginLeft: "auto",
		marginRight: "auto",
	},
	logintext: {
		textAlign: "center",
		color: "white",
		fontWeight: "500",
		fontSize: 15,
	},
	registerText: {
		textAlign: "center",
		color: "#00A3EE",
		fontWeight: "500",
		fontSize: 15,
		marginTop: 10,
	},
});
