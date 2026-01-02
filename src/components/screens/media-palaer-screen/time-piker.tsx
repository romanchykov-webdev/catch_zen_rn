import { Picker } from "@react-native-picker/picker";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

type Props = {
	initialHours?: number; // начальные часы (0-23)
	initialMinutes?: number; // начальные минуты (0-59)
	onTimeChange?: (hours: number, minutes: number) => void;
};

const TimePicker: React.FC<Props> = ({ initialHours = 12, initialMinutes = 0, onTimeChange }) => {
	const [selectedHours, setSelectedHours] = useState(initialHours);
	const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);

	// Генерируем массивы для часов (0-23) и минут (00, 01, ..., 59)
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const minutes = Array.from({ length: 60 }, (_, i) => i);

	const handleHoursChange = (itemValue: number) => {
		// Тактильная вибрация при изменении часов
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

		setSelectedHours(itemValue);
		onTimeChange?.(itemValue, selectedMinutes);
	};

	const handleMinutesChange = (itemValue: number) => {
		// Тактильная вибрация при изменении минут
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

		setSelectedMinutes(itemValue);
		onTimeChange?.(selectedHours, itemValue);
	};

	return (
		<View style={styles.container}>
			{/* <Text style={styles.label}>Выберите время</Text> */}

			<View style={styles.pickerContainer}>
				{/* Часы */}
				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={selectedHours}
						onValueChange={handleHoursChange}
						style={styles.picker}
						itemStyle={styles.pickerItem}
						mode="dialog"
					>
						{hours.map((hour) => (
							<Picker.Item key={hour} label={hour.toString().padStart(2, "0")} value={hour} />
						))}
					</Picker>
				</View>

				<Text style={styles.separator}>:</Text>

				{/* Минуты */}
				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={selectedMinutes}
						onValueChange={handleMinutesChange}
						style={styles.picker}
						itemStyle={styles.pickerItem}
						mode="dialog"
					>
						{minutes.map((minute) => (
							<Picker.Item key={minute} label={minute.toString().padStart(2, "0")} value={minute} />
						))}
					</Picker>
				</View>
			</View>

			{/* Отображение выбранного времени */}
			<Text style={styles.selectedTime}>
				Выбрано: {selectedHours.toString().padStart(2, "0")}:{selectedMinutes.toString().padStart(2, "0")}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		padding: 20,
		backgroundColor: "#f8f8f8",
		// backgroundColor: "red",
		borderRadius: 12,
	},
	label: {
		fontSize: 18,
		marginBottom: 20,
		fontWeight: "600",
	},
	pickerContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 12,
		overflow: "hidden",
		...Platform.select({
			ios: {
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.1,
				shadowRadius: 4,
			},
			android: {
				elevation: 4,
			},
		}),
	},
	pickerWrapper: {
		width: 120,
		height: 180,
	},
	picker: {
		width: 120,
		height: 180,
	},
	pickerItem: {
		fontSize: 32,
		color: "#000",
	},
	separator: {
		fontSize: 40,
		fontWeight: "300",
		paddingHorizontal: 10,
		marginTop: 20,
	},
	selectedTime: {
		marginTop: 30,
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default TimePicker;
