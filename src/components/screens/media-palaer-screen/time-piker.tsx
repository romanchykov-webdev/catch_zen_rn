import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import WheelPicker from "react-native-wheely";

type Props = {
	initialHours?: number;
	initialMinutes?: number;
	onTimeChange?: (hours: number, minutes: number) => void;
};

const TimePicker: React.FC<Props> = ({ initialHours = 0, initialMinutes = 0, onTimeChange }) => {
	const [selectedHours, setSelectedHours] = useState(initialHours);
	const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);

	useEffect(() => {
		setSelectedHours(initialHours);
		setSelectedMinutes(initialMinutes);
	}, [initialHours, initialMinutes]);

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
				<View style={styles.pickerWrapper}/>				
					<WheelPicker

						selectedIndex={selectedHours}
						options={hours}
						onChange={handleHoursChange}
						containerStyle={styles.wheelPicker}
						itemTextStyle={styles.itemText}
						selectedIndicatorStyle={styles.selectedIndicator}
						// itemHeight={60}
					/>

					<Text style={styles.separator}>:</Text>

					<WheelPicker

						selectedIndex={selectedMinutes}
						options={minutes}
						onChange={handleMinutesChange}
						containerStyle={styles.wheelPicker}
						itemTextStyle={styles.itemText}
						selectedIndicatorStyle={styles.selectedIndicator}
						// itemHeight={60}
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
		// backgroundColor: "#fff",
		// backgroundColor: "rgba(0, 0, 0, 0.1)",
		borderRadius: 12,
	},
	pickerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 250,				
		position: "relative",
	},
	pickerWrapper:{
		position: "absolute",
		width: "100%",
		height: 100,		
		justifyContent: "center",
		alignItems: "center",
		backgroundColor:"rgba(85, 65, 234, 0.41)",
		borderWidth: 5,
		borderColor: "rgba(0, 0, 0, 0.1)",
		borderRadius:25,
		...Platform.select({
			ios: {
				shadowColor: "#fff",
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: 0.25,
				shadowRadius: 8,
			},
		}),
	},
	wheelPicker: {
		width: 100,
		height: 200,
		// backgroundColor: "red",
	},
	itemText: {
		fontSize: 34,
		// color: "#000",
		// borderColor: "red",

		// lineHeight: 70,
		color: "#fff",
		fontWeight: "bold",
		letterSpacing: 5,
		textShadowRadius: 5,
		textShadowColor: "rgba(0, 0, 0, 0.5)",
		textShadowOffset: { width: 1, height: 1 },
		// padding: 10,	
		
	},
	selectedIndicator: {
		// backgroundColor: "rgba(0, 0, 0, 0.1)",
		backgroundColor: "transparent",
		borderRadius: 8,
		// gap:10,
	},
	separator: {
		fontSize: 40,
		fontWeight: "300",
		paddingHorizontal: 10,
		lineHeight: 60,
		// marginBottom: 10,
		// color: "#000",
		color: "#fff",
		textShadowRadius: 5,
		textShadowColor: "rgba(0, 0, 0, 0.5)",
		textShadowOffset: { width: 1, height: 1 },
	},
	selectedTime: {
		marginTop: 20,
		fontSize: 24,
		fontWeight: "bold",
		color: "#000",
	},
});

export default TimePicker;
