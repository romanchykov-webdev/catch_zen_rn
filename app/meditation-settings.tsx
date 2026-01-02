import { PressableSpringCard } from "@/src/components/pressable-spring-card";
import TimePicker from "@/src/components/screens/media-palaer-screen/time-piker";
import { useSleepTimerStore } from "@/src/store/sleep-timer-store";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

//
export default function MeditationSettings() {
	//
	const router = useRouter();

	const { setTime, startTimer, stopTimer, isActive, hours, minutes } = useSleepTimerStore();
	//
	const [selectedHours, setSelectedHours] = useState(hours);
	const [selectedMinutes, setSelectedMinutes] = useState(minutes);

	// console.log({ hours });

	// handle timer change
	const handleTimeChange = (hours: number, minutes: number) => {
		setSelectedHours(hours);
		setSelectedMinutes(minutes);
	};
	// start timer
	const handleStartTimer = () => {
		setTime(selectedHours, selectedMinutes);
		startTimer();
		router.back();
	};
	// stop timer
	const handleStopTimer = () => {
		stopTimer();
		router.back();
	};
	//
	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Настройти време через которое приложение остановит воспроизведение автоматически
			</Text>
			<TimePicker initialHours={hours} initialMinutes={minutes} onTimeChange={handleTimeChange} />

			{/* wrapper start/stop buttons */}
			<View style={styles.wrapperButtons}>
				{/* start timer button */}
				<PressableSpringCard
					style={styles.button}
					onPress={handleStartTimer}
					containerStyle={styles.shadowContainer}
				>
					<MaterialIcons name="alarm-add" size={45} color="green" />
				</PressableSpringCard>

				{/*stop timer button */}
				{isActive && (
					<PressableSpringCard
						style={[styles.button]}
						onPress={handleStopTimer}
						containerStyle={styles.shadowContainer}
					>
						<MaterialIcons name="alarm-off" size={45} color="red" />
					</PressableSpringCard>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f8f8f8",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	wrapperButtons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 50,
	},
	button: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		padding: 16,
		borderRadius: 100,
		marginTop: 20,
		alignItems: "center",
	},
	shadowContainer: {
		shadowOpacity: 0.5,
	},
});
