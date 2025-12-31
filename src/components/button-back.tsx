import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export const ButtonBack = () => {
	return (
		<TouchableOpacity onPress={() => router.back()} style={styles.button}>
			<Ionicons name="arrow-back" size={24} color="gray" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 100,
		padding: 10,
	},
});
