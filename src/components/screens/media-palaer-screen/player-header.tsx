import { StyleSheet, Text, View } from "react-native";

interface PlayerHeaderProps {
	title: string;
	duration: number;
	categoryName: string;
}

export const PlayerHeader = ({ title, duration, categoryName }: PlayerHeaderProps) => {
	return (
		<View style={styles.header}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subtitle}>
				{categoryName} • {duration} мин
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: { alignItems: "center", gap: 10, width: "100%" },
	buttonBackContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		width: "100%",
		paddingHorizontal: 20,
		paddingVertical: 10,
		// backgroundColor: "red",
	},
	title: { fontSize: 24, fontWeight: "bold", color: "white", textShadowRadius: 5, textAlign: "center" },
	subtitle: { fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 5 },
});
