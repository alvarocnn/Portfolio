import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Layout() {
	const [username, setUsername] = useState("");

	useEffect(() => {
		const fetchUsername = async () => {
			try {
				const userId = await AsyncStorage.getItem("userId");
				if (!userId) return;

				const response = await axios.get(
					`http://10.0.2.2:3000/api/users/${userId}`
				);
				setUsername(response.data.name);
			} catch (error) {
				console.error("Error fetching user name:", error);
			}
		};

		fetchUsername();
	}, []);

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Profile",
					headerStyle: {
						height: 60, // Cambia esta altura según sea necesario
					},
					headerTitleStyle: {
						alignSelf: "center", // Centra el título si es necesario
					},
				}}
			/>
		</Stack>
	);
}
