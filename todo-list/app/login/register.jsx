import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	KeyboardAvoidingView,
	TextInput,
	ImageBackground,
	Pressable,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import axios from "axios";

const register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleRegister = () => {
		const user = {
			name: name,
			email: email,
			password: password,
		};
		axios
			.post("http://10.0.2.2:3000/api/register", user)
			.then((response) => {
				//axios.post("http://127.0.0.1:3000/api/register",user).then((response) =>{
				console.log(response);
				Alert.alert(
					"Registration successfull",
					"Your register has been completed"
				);
				setEmail("");
				setPassword("");
				setName("");
			})
			.catch((error) => {
				Alert.alert(
					"Registration failed",
					"Your registration hasn't been completed"
				);
				console.log("error", error);
			});
	};
	return (
		<SafeAreaView style={styles.safeArea}>
			<View
				style={{
					marginTop: 50,
				}}
			>
				<Text style={styles.logoText}>Welcome to Taskify</Text>
			</View>
			<KeyboardAvoidingView>
				<View
					style={{
						marginTop: 40,
					}}
				>
					<View style={styles.inputViewEmail}>
						<FontAwesome
							style={{ marginLeft: 5 }}
							name="user"
							size={24}
							color="#ff5733"
						/>
						<TextInput
							value={name}
							onChangeText={(text) => setName(text)}
							style={{
								color: "black",
								marginVertical: 10,
								marginLeft: 7,
								width: 300,
								fontSize: email ? 17 : 17,
							}}
							placeholder="Enter username"
						/>
					</View>
					{/** Este es el input del email */}
					<View style={styles.inputViewEmail}>
						<MaterialIcons
							style={{ marginLeft: 5 }}
							name="email"
							size={24}
							color="#ff5733"
						/>
						<TextInput
							value={email}
							onChangeText={(text) => setEmail(text)}
							style={{
								color: "black",
								marginVertical: 10,
								marginLeft: 7,
								width: 300,
								fontSize: email ? 17 : 17,
							}}
							placeholder="Enter email"
						/>
					</View>
					{/** Este es el input del la contraseña */}
					<View style={styles.inputViewPassword}>
						<FontAwesome
							name="lock"
							size={24}
							color="#ff5733"
							style={{ marginLeft: 5 }}
						/>
						<TextInput
							value={password}
							onChangeText={(text) => setPassword(text)}
							secureTextEntry={true}
							style={{
								color: "black",
								marginVertical: 10,
								marginLeft: 7,
								width: 300,
								fontSize: password ? 17 : 17,
							}}
							placeholder="Enter password"
						/>
					</View>

					<Pressable onPress={handleRegister} style={styles.loginButton}>
						<Text style={styles.logintext}>Register</Text>
					</Pressable>
					<View style={{ marginTop: 20 }} />
					<Pressable onPress={() => router.replace("./login")}>
						<Text style={styles.registerText}>Sing up</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default register;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "e8e8e8",
		alignItems: "center",
	},

	logoText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#ff5733",
	},

	loginText: {
		fontSize: 16,
		marginTop: 20,
		fontWeight: "600",
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
		marginTop: 96,
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
