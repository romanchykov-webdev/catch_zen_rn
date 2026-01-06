import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props  {
    remainingSeconds: number;
}



const TimerIndicator = ({remainingSeconds}: Props) => {
 
	const formatTime = (totalSeconds: number): string => {
		const h = Math.floor(totalSeconds / 3600);
		const m = Math.floor((totalSeconds % 3600) / 60);
		const s = totalSeconds % 60;

		const pad = (num: number) => num.toString().padStart(2, '0');

		if (h > 0) {
			return `${pad(h)}:${pad(m)}:${pad(s)}`;
		}
		return `${pad(m)}:${pad(s)}`;
	};
 
    return (
   <View style={styles.timerContainer}>
		<View style={styles.textIconContainer}>
			<Ionicons name="moon-outline" size={16} color="rgba(255,255,255,0.9)" />

			<Text style={styles.timerText}>Таймер сна:</Text>
			<Text style={[styles.timerText, styles.timerValue]}>
				{formatTime(remainingSeconds ||0)}
			</Text>
		</View>
	</View>
  )
}
const styles = StyleSheet.create({
    // timer container
	timerContainer: {
		// backgroundColor: "red",
		width: "80%",
		position: "absolute",
		bottom: -35,
		// width: 230,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		marginTop: 10,
		paddingHorizontal: 16,
		// paddingLeft: 5,
		paddingVertical: 8,
		backgroundColor: "rgba(0, 0, 0, 0.15)",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.3)",
	},
	textIconContainer: {
		flexDirection: "row",
		alignItems: "center",

		gap: 8,
	},
    timerText: {
		// width: 95,
		// backgroundColor: "red",
		fontSize: 14,
		fontWeight: "600",
		color: "rgba(255,255,255,0.9)",
		letterSpacing: 0.5,
	},
	timerValue: {
		width: 95,
		marginTop: 3,
	},
})
export default TimerIndicator;