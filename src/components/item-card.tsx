import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
	id: string;
	title: string;
	duration: string;
	color: string[];
}

export const ItemCard = ({ item }: { item: Props }) => {
	return (
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
};

const styles = StyleSheet.create({
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
