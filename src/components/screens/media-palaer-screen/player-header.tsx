import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { PressableSpringCard } from "../../pressable-spring-card";

interface PlayerHeaderProps {
	title: string;
	duration: number;
	categoryName: string;
	onMenuPress: () => void;
}

export const PlayerHeader = ({ title, duration, categoryName, onMenuPress }: PlayerHeaderProps) => {
	return (
		<View style={styles.wrapperHeader}>
			{/* button menu */}
			<View style={styles.buttonMenuContainer}>
				<PressableSpringCard
					android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }}
					style={styles.buttonMenu}
					containerStyle={styles.shadowContainer}
					onPressOut={onMenuPress}
				>
					<Ionicons name="settings-outline" size={25} color="white" />
				</PressableSpringCard>
			</View>

			{/* header */}
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.subtitle}>
					{categoryName} • {duration} мин
				</Text>
			</View>

			{/* buttom menu */}
			{/* <PressableSpringCard
				android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }}
				style={styles.buttonMenu}
				containerStyle={styles.shadowContainer}
				onPressOut={onMenuPress}
			>
				<Ionicons name="settings-outline" size={25} color="white" />
			</PressableSpringCard> */}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapperHeader: {
		flexDirection: "column",
		width: "100%",

		alignItems: "center",
	},
	buttonMenuContainer: {
		alignSelf: "flex-end",
		paddingRight: 15,
	},

	header: { alignItems: "center", gap: 10, width: "100%" },
	buttonMenu: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		alignSelf: "flex-end",
		borderRadius: 100,
		padding: 10,
	},
	shadowContainer: {
		shadowOpacity: 0.5,
	},
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
