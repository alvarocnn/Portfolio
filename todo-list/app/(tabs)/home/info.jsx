import {
	Pressable,
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
	BottomModal,
	ModalContent,
	ModalTitle,
	SlideAnimation,
} from "react-native-modals";
import axios from "axios";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
function info() {
	const today = moment().format("DD MMM YY");
	const [pendingTasks, setPendingTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [isModalVisible, setModalVisible] = useState(false);
	const parameters = useLocalSearchParams();
	const inputRef = useRef(null);
	const [task, setTask] = useState("");
	const [marked, setMarked] = useState(false);
	const [newTask, setNewTask] = useState([]);

	const navigation = useNavigation();

	useEffect(() => {
		const title = parameters.title;
		navigation.setOptions({
			headerTitle: title, // Set the desired title here
		});
	}, [navigation]);
	const addTask = async () => {
		try {
			const userId = await AsyncStorage.getItem("userId");
			const taskData = {
				title: task,
				user: userId,
			};

			const idLista = parameters?.id;
			axios
				.post(`http://10.0.2.2:3000/api/task-lists/${idLista}/tasks`, taskData)
				.then((response) => {})
				.catch((error) => {
					console.log("error", error);
				});

			await getUserTasks();
			setModalVisible(false);
			setTask("");
			setNewTask(taskData);
		} catch (error) {
			console.log("error", error);
		}
	};

	const getUserTasks = async () => {
		try {
			const idLista = parameters?.id;
			await AsyncStorage.setItem("idLista", idLista);
			const res = await axios.get(
				`http://10.0.2.2:3000/api/task-lists/${idLista}/tasks`
			);

			setTasks(res.data.tasks);

			const tasksListadas = res.data.tasks || [];

			const pending = tasksListadas.filter(
				(tasks) => tasks.status === "pending"
			);

			const completed = tasksListadas.filter(
				(tasks) => tasks.status === "completed"
			);

			setPendingTasks(pending);
			setCompletedTasks(completed);
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		getUserTasks();
	}, [newTask, marked]);

	const markTaskCompleted = async (task) => {
		task.status = "completed";
		try {
			setMarked(true);
			const response = await axios.patch(
				`http://10.0.2.2:3000/api/tasks/${task._id}/complete`
			);
		} catch (error) {
			console.log(
				"Error marking task as completed:",
				error.response ? error.response.data : error.message
			);
		}
	};

	const handleDeleteTask = async (taskId) => {
		try {
			const response = await axios.delete(
				`http://10.0.2.2:3000/api/tasks/${taskId}`
			);
			console.log(response.data.message);
			await getUserTasks(); // Update task list after deletion
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<>
			<View
				style={{
					marginHorizontal: 10,
					marginVertical: 10,
					flexDirection: "row",
					alignItems: "center",
					gap: 12,
				}}
			></View>
			<ScrollView style={{ flex: 1, backgroundColor: "e8e8e8" }}>
				<View style={{ padding: 10 }}>
					{tasks?.length > 0 ? (
						<View>
							{pendingTasks?.length > 0 && <Text> Task!! {today}</Text>}

							{pendingTasks?.map((item, index) => (
								<Pressable key={item._id} style={styles.pressTask}>
									<View style={styles.viewTask}>
										<Entypo
											onPress={() => markTaskCompleted(item)}
											name="circle"
											size={18}
											color="black"
										/>
										<Text style={{ flex: 1 }}>{item?.title}</Text>
										<FontAwesome6 name="bookmark" size={20} color="black" />
									</View>
								</Pressable>
							))}
							{completedTasks?.length > 0 && (
								<View>
									<View style={styles.viewCompletedTask}></View>
									<View style={styles.viewCompletedTask2}>
										<Text>Completed Task</Text>
										<MaterialIcons
											name="arrow-drop-down"
											size={24}
											color="black"
										/>
									</View>
									{completedTasks?.map((item, index) => (
										<Pressable key={item._id} style={styles.pressTask}>
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
								</View>
							)}
						</View>
					) : (
						<View>
							<Text
								style={{
									display: "flex",
									textAlign: "center",
									color: "#ff5733",
									marginTop: 30,
									fontSize: 17,
								}}
							>
								Start with new tasks!
							</Text>
						</View>
					)}
				</View>
			</ScrollView>
			<Pressable
				onPress={() => setModalVisible(!isModalVisible)}
				style={{
					display: "flex",
					flexDirection: "row",
					height: 52,
					width: 390,
					backgroundColor: "#474b4e",
					padding: 10,
					borderRadius: 6,
					marginLeft: "auto",
					marginRight: "auto",
					marginBottom: 25,
				}}
			>
				<Ionicons name="add" size={32} color="#e8e8e8" style={{}} />
				<Text style={styles.bottomButtonText}>Add a task</Text>
			</Pressable>
			<BottomModal
				onBackdropPress={() => setModalVisible(!isModalVisible)}
				onHardwareBackPress={() => setModalVisible(!isModalVisible)}
				swipeDirection={["up", "down"]}
				swipeThreshold={200}
				modalTitle={<ModalTitle title="Add a task" />}
				modalAnimation={
					new SlideAnimation({
						slideFrom: "bottom",
					})
				}
				visible={isModalVisible}
				onTouchOutside={() => setModalVisible(!isModalVisible)}
			>
				<ModalContent style={styles.modal}>
					<View style={styles.modalView}>
						<TextInput
							ref={inputRef}
							placeholder="Enter a new task"
							style={styles.textInput}
							value={task}
							onChangeText={(text) => setTask(text)}
						/>
						<Ionicons
							onPress={addTask}
							name="send-sharp"
							size={24}
							color="#ff5733"
							style={{}}
						/>
					</View>
				</ModalContent>
			</BottomModal>
		</>
	);
}

export default info;

const styles = StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: "white",
		padding: 10,
	},
	view2: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	viewTask: {
		marginTop: 5,
	},
	textTitle: {
		marginTop: 20,
		fontSize: 17,
		fontWeight: "600",
	},
	modal: {
		width: "100%",
		height: 200,
	},

	textInput: {
		padding: 7,
		borderColor: "#000000",
		borderWidth: 1,
		borderRadius: 5,
		flex: 1,
		color: "black",
	},

	bottomButtonText: {
		color: "#e8e8e8",
		marginLeft: 7,
		bottom: -5,
		fontSize: 16,
	},

	modalView: {
		marginVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	viewTask: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	pressTask: {
		backgroundColor: "#E0E0E0",
		padding: 10,
		borderRadius: 7,
		marginVertical: 10,
	},

	viewCompletedTask: {
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
	},
	viewCompletedTask2: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		marginHorizontal: 10,
	},
});
