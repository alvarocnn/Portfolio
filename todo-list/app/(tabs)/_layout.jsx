import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function Layout() {
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardVisible(true); // or some other action
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardVisible(false); // or some other action
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return (
		<Tabs
			screenOptions={{
				tabBarHideOnKeyboard: true,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					tabBarLabel: "Home",
					tabBarLabelStyle: { color: "#ff5733" },
					tabBarStyle: { color: "#ff5733" },
					headerShown: false,
					tabBarIcon: ({ focused }) =>
						focused ? (
							<FontAwesome name="tasks" size={24} color="#ff5733" />
						) : (
							<FontAwesome name="tasks" size={24} color="black" />
						),
				}}
			/>

			<Tabs.Screen
				name="calendar"
				options={{
					tabBarLabel: "Calendar",
					tabBarLabelStyle: { color: "#ff5733" },
					tabBarStyle: { color: "#ff5733" },
					headerShown: false,
					tabBarIcon: ({ focused }) =>
						focused ? (
							<FontAwesome5 name="calendar-alt" size={24} color="#ff5733" />
						) : (
							<FontAwesome5 name="calendar-alt" size={24} color="black" />
						),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					tabBarLabel: "Profile ",
					tabBarLabelStyle: { color: "#ff5733" },
					tabBarStyle: { color: "#ff5733" },
					headerShown: false,
					tabBarIcon: ({ focused }) =>
						focused ? (
							<MaterialCommunityIcons
								name="account"
								size={24}
								color="#ff5733"
							/>
						) : (
							<MaterialCommunityIcons name="account" size={24} color="black" />
						),
				}}
			/>
		</Tabs>
	);
}
