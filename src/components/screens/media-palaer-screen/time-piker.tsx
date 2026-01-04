import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import WheelPicker from "react-native-wheely";

type Props = {
	initialHours?: number;
	initialMinutes?: number;
	onTimeChange?: (hours: number, minutes: number) => void;
};

const TimePicker: React.FC<Props> = ({ initialHours = 0, initialMinutes = 0, onTimeChange }) => {
	const [selectedHours, setSelectedHours] = useState(initialHours);
	const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);

	const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
	const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

	const handleHoursChange = (index: number) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setSelectedHours(index);
		onTimeChange?.(index, selectedMinutes);
	};

	const handleMinutesChange = (index: number) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setSelectedMinutes(index);
		onTimeChange?.(selectedHours, index);
	};

	return (
		<View style={styles.container}>
			<View style={styles.pickerContainer}>
				<WheelPicker
					selectedIndex={selectedHours}
					options={hours}
					onChange={handleHoursChange}
					containerStyle={styles.wheelPicker}
					itemTextStyle={styles.itemText}
					selectedIndicatorStyle={styles.selectedIndicator}
				/>

				<Text style={styles.separator}>:</Text>

				<WheelPicker
					selectedIndex={selectedMinutes}
					options={minutes}
					onChange={handleMinutesChange}
					containerStyle={styles.wheelPicker}
					itemTextStyle={styles.itemText}
					selectedIndicatorStyle={styles.selectedIndicator}
				/>
			</View>

			{/* <Text style={styles.selectedTime}>
				Выбрано: {hours[selectedHours]}:{minutes[selectedMinutes]}
			</Text> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 12,
	},
	pickerContainer: {
		flexDirection: "row",
		alignItems: "center",
		height: 200,
	},
	wheelPicker: {
		width: 100,
		height: 200,
	},
	itemText: {
		fontSize: 32,
		color: "#000",
	},
	selectedIndicator: {
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		borderRadius: 8,
	},
	separator: {
		fontSize: 40,
		fontWeight: "300",
		paddingHorizontal: 10,
		marginBottom: 10,
		color: "#000",
	},
	selectedTime: {
		marginTop: 20,
		fontSize: 24,
		fontWeight: "bold",
		color: "#000",
	},
});

export default TimePicker;
