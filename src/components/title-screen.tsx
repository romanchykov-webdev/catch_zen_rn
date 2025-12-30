import { StyleSheet, Text, View } from "react-native";

export const TitleScreen = ({ title }: { title: string }) => {
	return (
		<View>
			<Text style={styles.title}>Найди свой дзен </Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 20,
		marginTop: 10,
		textAlign: "center",
	},
});
