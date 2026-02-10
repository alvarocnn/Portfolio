import {
	Pressable,
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
	Animated,
	useWindowDimensions,
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
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";

const index = () => {
	const today = moment().format("DD MMM YY");
	const [isModalVisible, setModalVisible] = useState(false);
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const inputRef = useRef(null);
	const [pendingTasks, setPendingTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [marked, setMarked] = useState(false);
	const swipeListViewRef = useRef(null);

	const addTask = async () => {
		try {
			const taskData = { title: task };
			const userId = await AsyncStorage.getItem("userId");
			await axios.post(
				`http://10.0.2.2:3000/api/users/${userId}/task-lists`,
				taskData
			);
			await getUserTasks();
			setModalVisible(false);
			setTask("");
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		if (isModalVisible) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 50);
		}
	}, [isModalVisible]);

	useEffect(() => {
		getUserTasks();
	}, [marked, isModalVisible]);

	const getUserTasks = async () => {
		try {
			const userId = await AsyncStorage.getItem("userId");
			const res = await axios.get(
				`http://10.0.2.2:3000/api/users/${userId}/task-lists`
			);
			setTasks(res.data.taskLists);

			const tasksListadas = res.data.taskLists || [];
			const pending = tasksListadas.filter(
				(task) => task.status !== "completed"
			);
			const completed = tasksListadas.filter(
				(task) => task.status === "completed"
			);

			setPendingTasks(pending);
			setCompletedTasks(completed);
		} catch (error) {
			console.log("error", error);
		}
	};

	const router = useRouter();

	const deleteTaskList = async (taskListId) => {
		try {
			await swipeListViewRef.current?.closeAllOpenRows();
			const response = await axios.delete(
				`http://10.0.2.2:3000/api/task-lists/${taskListId}`
			);
			console.log(response.data.message);
			await getUserTasks();
		} catch (error) {
			console.log("error", error);
		}
	};

	const closeRow = (rowMap, rowKey) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	};

	const deleteRow = async (rowMap, rowKey) => {
		closeRow(rowMap, rowKey);
		await deleteTaskList(rowKey);
		swipeListViewRef.current?.closeAllOpenRows();
	};

	const renderItem = (data) => (
		<Pressable
			key={data.item._id}
			style={styles.pressTask}
			onPress={() => {
				router.push({
					pathname: "/home/info",
					params: {
						id: data.item._id,
						title: data.item.title,
					},
				});
			}}
		>
			<View style={styles.viewTask}>
				<Feather name="list" size={24} color="black" />
				<Text style={{ flex: 1 }}>{data.item.title}</Text>
			</View>
		</Pressable>
	);

	const renderHiddenItem = (data, rowMap) => (
		<View style={styles.hiddenContainer}>
			<Pressable
				style={[styles.hiddenButton, styles.deleteButton]}
				onPress={() => deleteRow(rowMap, data.item._id)}
			>
				<AntDesign name="delete" size={24} color="black" />
			</Pressable>
		</View>
	);

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

			<SwipeListView
				ref={swipeListViewRef}
				data={pendingTasks}
				renderItem={renderItem}
				renderHiddenItem={renderHiddenItem}
				rightOpenValue={-50}
			/>

			{completedTasks.length > 0 && (
				<View>
					<View style={styles.viewCompletedTask}>
						<Text>Completed Task</Text>
						<MaterialIcons name="arrow-drop-down" size={24} color="black" />
					</View>
					<SwipeListView
						ref={swipeListViewRef}
						data={completedTasks}
						renderItem={renderItem}
						renderHiddenItem={renderHiddenItem}
						leftOpenValue={75}
						rightOpenValue={-150}
					/>
				</View>
			)}

			{/* ✅ Botón corregido */}
			<Pressable
				onPress={() => setModalVisible(!isModalVisible)}
				style={styles.addButton}
			>
				<Ionicons name="add" size={32} color="#e8e8e8" />
				<Text style={styles.bottomButtonText}>Add a new list</Text>
			</Pressable>

			{/* ✅ Modal corregido */}
			<BottomModal
				visible={isModalVisible}
				onBackdropPress={() => setModalVisible(!isModalVisible)}
				onHardwareBackPress={() => setModalVisible(!isModalVisible)}
				swipeDirection={["up", "down"]}
				swipeThreshold={200}
				modalTitle={<ModalTitle title="Add list" />}
				modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
				onTouchOutside={() => setModalVisible(!isModalVisible)}
			>
				<ModalContent style={styles.modal}>
					<View style={styles.modalView}>
						<TextInput
							ref={inputRef}
							placeholder="Enter a new list"
							style={styles.textInput}
							value={task}
							onChangeText={(text) => setTask(text)}
						/>
						<Ionicons
							onPress={addTask}
							name="send-sharp"
							size={24}
							color="#ff5733"
						/>
					</View>
				</ModalContent>
			</BottomModal>
		</>
	);
};

export default index;

const styles = StyleSheet.create({
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
		marginVertical: 8,
	},
	viewCompletedTask: {
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
	},
	hiddenContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: "#f2f2f2",
		height: 30,
		borderRadius: 25,
		top: 15,
	},
	hiddenButton: {
		justifyContent: "center",
		alignItems: "center",
		width: 49,
		height: 41.5,
		borderRadius: 5,
	},
	deleteButton: {
		backgroundColor: "#E74C3C",
	},
	addButton: {
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
	},
});
