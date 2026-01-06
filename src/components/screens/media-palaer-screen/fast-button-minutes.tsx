import { PressableSpringCard } from "@/src/components/pressable-spring-card";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
	onTimeChange: (hours: number, minutes: number) => void;
	onStartTimer: () => void;
};

const FastButtonMinutes = ({ onTimeChange, onStartTimer }: Props) => {
	const minArray = [10, 15, 20, 30];

	const changeTimeHandler = (minutes: number) => {
		onTimeChange?.(0, minutes);
		onStartTimer();
		console.log("changeTimeHandler", minutes);
	};

	return (
		<View style={styles.wrapperButtonsMinut}>
			{minArray.map((item, index) => {
				return (
					<PressableSpringCard onPress={() => changeTimeHandler(item)} key={index} style={styles.buttonMinut}>
						<Text style={styles.textButtonMinut}>{item}</Text>
					</PressableSpringCard>
				);
			})}
		</View>
	);
};
const styles = StyleSheet.create({
	wrapperButtonsMinut: {
		width: "100%",
		// backgroundColor: "red",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		gap: 10,
		marginBottom: 20,
	},
	buttonMinut: {
		backgroundColor: "rgba(33, 23, 228, 0.9)",
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	textButtonMinut: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "bold",
	},
});

export default FastButtonMinutes;
