import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#6200ee", // Цвет активной иконки
				headerShown: true, // Показывать заголовок сверху
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Медитация",
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="meditation" size={24} color="black" />,
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
