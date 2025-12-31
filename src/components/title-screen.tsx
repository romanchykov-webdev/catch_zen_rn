import { StyleSheet, Text, View } from "react-native";

export const TitleScreen = ({ title }: { title: string }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Найди свой дзен </Text>
			<Text style={styles.title}>{title} </Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
		marginBottom: 10,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		// marginBottom: 10,
		// marginTop: 10,
		textAlign: "center",
	},
});
