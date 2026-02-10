import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
import { useFocusEffect } from "@react-navigation/native";
const index = () => {
	const [completedTask, setCompletedTasks] = useState(0);
	const [pendingTasks, setPendingTasks] = useState(0);
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await AsyncStorage.removeItem("authToken");
			await AsyncStorage.removeItem("userId");
			router.push("/login/login");
		} catch (error) {
			console.log("Error during logout:", error);
		}
	};
	useFocusEffect(
		useCallback(() => {
			const fetchTaskData = async () => {
				try {
					const userId = await AsyncStorage.getItem("userId");
					const response = await axios.get(
						`http://10.0.2.2:3000/api/task/count/${userId}`
					);
					const { totalCompletedTask, totalPendingTask } = response.data;
					setCompletedTasks(totalCompletedTask);
					setPendingTasks(totalPendingTask);
				} catch (error) {
					console.log("error", error);
				}
			};
			fetchTaskData();
		}, [])
	);

	const fetchTaskData = async () => {
		try {
			const userId = await AsyncStorage.getItem("userId");
			const response = await axios.get(
				`http://10.0.2.2:3000/api/task/count/${userId}`
			);
			const { totalCompletedTask, totalPendingTask } = response.data;
			setCompletedTasks(totalCompletedTask);
			setPendingTasks(totalPendingTask);
		} catch (error) {
			-console.log("error", error);
		}
	};
	useEffect(() => {
		fetchTaskData();
	}, []);
	console.log("comp", completedTask);
	console.log("pending", pendingTasks);
	return (
		<View style={styles.view}>
			<View style={styles.view2}></View>
			<View style={{ marginVertical: 12 }}>
				<Text>Overview</Text>
				<View style={styles.viewTask}>
					<View style={styles.viewTask1}>
						<Text style={styles.textTask}>{completedTask}</Text>
						<Text style={styles.textTask1}>Completed task</Text>
					</View>

					<View style={styles.viewTask1}>
						<Text style={styles.textTask}>{pendingTasks}</Text>
						<Text style={styles.textTask1}>Pending task</Text>
					</View>
				</View>
			</View>

			<LineChart
				data={{
					labels: ["Pending Tasks", "Completed Tasks"],
					datasets: [
						{
							data: [pendingTasks, completedTask],
						},
					],
				}}
				width={Dimensions.get("window").width - 20} // from react-native
				height={220}
				// yAxisLabel="$"
				// yAxisSuffix="k"
				yAxisInterval={2} // optional, defaults to 1
				chartConfig={{
					backgroundColor: "#e26a00",
					backgroundGradientFrom: "#fb8c00",
					backgroundGradientTo: "#ffa726",
					decimalPlaces: 2, // optional, defaults to 2dp
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 16,
					},
					propsForDots: {
						r: "6",
						strokeWidth: "2",
						stroke: "#ffa726",
					},
				}}
				bezier
				style={{
					borderRadius: 16,
				}}
			/>
			<Pressable style={styles.pressable} onPress={handleLogout}>
				<View style={styles.view3}>
					<Feather name="log-out" size={24} color="white" />
					<Text style={styles.textTask2}>Log out </Text>
				</View>
			</Pressable>
		</View>
	);
};

export default index;

const styles = StyleSheet.create({
	view3: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start", // Alinea el contenido a la izquierda
		width: "100%",
	},
	view: {
		padding: 10,
		flex: 1,
		backgroundColor: "white",
	},
	view2: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	text: {
		fontSize: 15,
		color: "gray",
		marginTop: 4,
	},
	viewTask: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginVertical: 8,
	},
	viewTask1: {
		backgroundColor: "#ff5733",
		padding: 10,
		borderRadius: 8,
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
	},
	textTask: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
	},
	textTask1: {
		textAlign: "center",
		fontSize: 16,
	},
	textTask2: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
	},
	pressable: {
		width: "100%",
		padding: 10,
		backgroundColor: "#ff5733",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
		borderRadius: 12,
		backGroundColor: "#ff5733",
	},
});
