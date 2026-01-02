import TimePicker from "@/src/components/screens/media-palaer-screen/time-piker";
import { StyleSheet, Text, View } from "react-native";
export default function MeditationSettings() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Настройти време через которое приложение остановит воспроизведение автоматически
			</Text>
			<TimePicker
				initialHours={1}
				initialMinutes={30}
				onTimeChange={(hours, minutes) => {
					console.log(hours, minutes);
				}}
			/>
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
	},
});
