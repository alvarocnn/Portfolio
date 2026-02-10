import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import axios from "axios";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const index = () => {
	const today = moment().format("YYYY-MM-DD");
	const [selectedDate, setSelectDate] = useState(today);
	const [task, setTask] = useState([]);

	useFocusEffect(
		useCallback(() => {
			const fetchCompletedTask = async () => {
				try {
					const idLista = await AsyncStorage.getItem("idLista");
					const userId = await AsyncStorage.getItem("userId"); // Asegúrate de almacenar y obtener el userId
					console.log("ha entrado en el callback", idLista);
					console.log("date", selectedDate);
					console.log("userId", userId); // Log para verificar que userId se obtiene correctamente

					if (!userId) {
						throw new Error("User ID not found");
					}
					const response = await axios.get(
						`http://10.0.2.2:3000/api/users/${userId}/tasks/complete/${today}`
					);
					const completedTasks = response.data.completedTasks || [];
					console.log("completedTasks", completedTasks);
					setTask(completedTasks);
				} catch (error) {
					console.log("error", error);
				}
			};

			fetchCompletedTask();
			return () => {};
		}, [])
	);
	/*
    const fetchCompletedTask = async () => {
      try {
        const idLista= await AsyncStorage.getItem("idLista");
         console.log("idLista", idLista);
         console.log("date", selectedDate); 
        const response = await axios.get(`http://192.168.1.159:3000/api/tasks/complete/${selectedDate}/${idLista}`);
        const completedTasks = response.data.completedTask || [];
        console.log("completedTasks", completedTasks);
        setTask(completedTasks);
      } catch (error) {
        console.log("error", error);
      }
    };*/
	const fetchCompletedTask = async () => {
		try {
			const idLista = await AsyncStorage.getItem("idLista");
			const userId = await AsyncStorage.getItem("userId"); // Asegúrate de almacenar y obtener el userId
			console.log("idLista", idLista);
			console.log("date", selectedDate);
			console.log("userId", userId); // Log para verificar que userId se obtiene correctamente

			if (!userId) {
				throw new Error("User ID not found");
			}
			const response = await axios.get(
				`http://10.0.2.2:3000/api/users/${userId}/tasks/complete/${selectedDate}`
			);
			const completedTasks = response.data.completedTasks || [];
			console.log("completedTasks", completedTasks);
			setTask(completedTasks);
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		fetchCompletedTask();
	}, [selectedDate]);

	console.log(task);

	const hadleDayPress = (day) => {
		setSelectDate(day.dateString);
	};
	return (
		<View style={{ backgroundColor: "white", flex: 1 }}>
			<Calendar
				theme={{
					arrowColor: "#ff5733",
					todayTextColor: "#ff5733",
				}}
				style={styles.calendar}
				onDayPress={hadleDayPress}
				markedDates={{
					[selectedDate]: { selected: true, selectedColor: "#ff5733" },
				}}
			/>

			<View style={styles.viewCalendar} />
			<View style={styles.viewCompletedTask2}>
				<Text>Completed Task</Text>
				<MaterialIcons name="arrow-drop-down" size={24} color="black" />
			</View>
			<ScrollView>
				{task?.map((item, index) => (
					<Pressable key={index._id} style={styles.pressTask}>
						<View style={styles.viewTask}>
							<FontAwesome name="circle" size={18} color="black" />
							<Text
								style={{
									flex: 1,
									textDecorationLine: "line-through",
									color: "gray",
								}}
							>
								{item?.title}
							</Text>
							<FontAwesome6 name="bookmark" size={20} color="black" />
						</View>
					</Pressable>
				))}
			</ScrollView>
		</View>
	);
};

export default index;

const styles = StyleSheet.create({
	calendar: {
		color: "#ff5733",
	},

	viewCalendar: {
		marginTop: 20,
	},
	viewTask: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginHorizontal: 12,
	},

	pressTask: {
		backgroundColor: "#E0E0E0",
		padding: 10,
		borderRadius: 7,
		marginVertical: 10,
	},

	viewCompletedTask2: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		marginHorizontal: 10,
		marginVertical: 10,
	},
});
