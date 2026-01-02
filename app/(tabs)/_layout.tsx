import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#4A90E2",
				tabBarInactiveTintColor: "rgba(0,0,0,0.5)",
				headerShown: false,
				// Настройка стиля самой панели
				tabBarStyle: {
					position: "absolute",
					borderTopWidth: 0,
					elevation: 0,
					height: 80,
					backgroundColor: "transparent",
				},
				// Стили текста для всех табов
				tabBarLabelStyle: {
					fontSize: 14,
					fontWeight: "500",
				},

				tabBarBackground: () => <BlurView intensity={100} tint="light" style={StyleSheet.absoluteFill} />,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Медитация",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="meditation" size={30} color={color} />,
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="breathing"
				options={{
					title: "Дыхание",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="weather-windy" size={30} color={color} />,
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="sounds"
				options={{
					title: "Звуки",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="weather-night" size={30} color={color} />,
					headerShown: false,
				}}
			/>
		</Tabs>
	);
}
