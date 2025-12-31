import { ButtonBack } from "@/src/components/button-back";
import { StyleSheet, Text, View } from "react-native";

interface PlayerHeaderProps {
	title: string;
	duration: number;
}

export const PlayerHeader = ({ title, duration }: PlayerHeaderProps) => {
	return (
		<View style={styles.header}>
			<View style={styles.buttonBackContainer}>
				<ButtonBack />
			</View>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subtitle}>Медитация • {duration} мин</Text>
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
	title: { fontSize: 24, fontWeight: "bold", color: "white", textShadowRadius: 5 },
	subtitle: { fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 5 },
});
