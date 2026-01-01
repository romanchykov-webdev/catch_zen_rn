import { StyleSheet, Text, View } from "react-native";

export const TitleScreen = ({ title }: { title: string }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Найди свой дзен</Text>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
		marginBottom: 10,
		// shadow for text
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		textAlign: "center",
		// shadow for text
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
	},
});
