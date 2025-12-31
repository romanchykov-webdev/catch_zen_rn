import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#4A90E2",
				tabBarInactiveTintColor: "gray",
				headerShown: false,
				// Настройка стиля самой панели
				tabBarStyle: {
					position: "absolute",
					borderTopWidth: 0,
					elevation: 0,
					height: 80,
					backgroundColor: "transparent",
				},

				tabBarBackground: () => <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Медитация",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="meditation" size={24} color={color} />,
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="breathing"
				options={{
					title: "Дыхание",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="weather-windy" size={26} color={color} />,
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="sounds"
				options={{
					title: "Звуки",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="weather-night" size={26} color={color} />,
					headerShown: false,
				}}
			/>
		</Tabs>
	);
}
