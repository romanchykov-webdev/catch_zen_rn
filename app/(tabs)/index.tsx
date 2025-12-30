import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// Моковые данные для сессий (позже заменим на реальные)
const SESSIONS = [
	{ id: "1", title: "Утреннее спокойствие", duration: "10 мин", color: ["#4c669f", "#3b5998"] },
	{ id: "2", title: "Снятие стресса", duration: "15 мин", color: ["#bc4e9c", "#f80759"] },
	{ id: "3", title: "Глубокое погружение", duration: "20 мин", color: ["#00b09b", "#96c93d"] },
];

interface Session {
	id: string;
	title: string;
	duration: string;
	color: string[];
}

export default function HomeScreen() {
	const renderItem = ({ item }: { item: Session }) => (
		<TouchableOpacity style={styles.card}>
			<LinearGradient colors={[...item.color] as [string, string]} style={styles.gradient}>
				<View>
					<Text style={styles.cardTitle}>{item.title}</Text>
					<Text style={styles.cardDuration}>{item.duration}</Text>
				</View>
				<Text style={styles.playIcon}>▶</Text>
			</LinearGradient>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Найди свой дзен </Text>

			<FlatList
				data={SESSIONS}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0F4F7",
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	header: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 20,
		marginTop: 10,
	},
	list: {
		paddingBottom: 20,
	},
	card: {
		marginBottom: 15,
		borderRadius: 20,
		overflow: "hidden",
		elevation: 5, // Тень для Android
		shadowColor: "#000", // Тень для iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
	},
	gradient: {
		padding: 25,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	cardTitle: {
		color: "white",
		fontSize: 20,
		fontWeight: "600",
	},
	cardDuration: {
		color: "rgba(255, 255, 255, 0.8)",
		fontSize: 14,
		marginTop: 5,
	},
	playIcon: {
		color: "white",
		fontSize: 24,
	},
});
