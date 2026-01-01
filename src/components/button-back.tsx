import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { PressableSpringCard } from "./pressable-spring-card";

export const ButtonBack = () => {
	const router = useRouter();

	return (
		<PressableSpringCard
			// scaleTo={0.5}
			android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }}
			onPressOut={() => router.back()}
			style={styles.button}
			containerStyle={styles.shadowContainer}
		>
			<Ionicons name="arrow-back" size={40} color="gray" />
		</PressableSpringCard>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 100,
		padding: 10,
	},
	shadowContainer: {
		shadowOpacity: 0.5,
	},
});
