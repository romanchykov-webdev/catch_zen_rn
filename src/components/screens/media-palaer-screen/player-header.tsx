import { useSleepTimerStore } from "@/src/store/sleep-timer-store";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { PressableSpringCard } from "../../pressable-spring-card";
import { TitleScreen } from "../../title-screen";

interface PlayerHeaderProps {
	title: string;
	duration: number;
	categoryName: string;
	onMenuPress: () => void;

	isActiveTimer: boolean;
}

// Функция для форматирования времени в чч:мм:сс
const formatTime = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export const PlayerHeader = ({
	title,
	duration,
	categoryName,
	onMenuPress,

	isActiveTimer,
}: PlayerHeaderProps) => {
	const { remainingSeconds } = useSleepTimerStore();

	// const totalSeconds = hours * 3600 + minutes * 60;
	console.log(remainingSeconds);

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
				<TitleScreen
					title={title}
					tilleStyle={{ fontWeight: "900" }}
					subtitle={`${categoryName} • ${duration} мин`}
					subtitleStyle={styles.subtitle}
				/>

				{/* Отображение таймера сна */}
				{isActiveTimer && (
					<View style={styles.timerContainer}>
						<Ionicons name="moon-outline" size={16} color="rgba(255,255,255,0.9)" />
						{/* <Text style={styles.timerText}>Таймер сна: {formatTime(sleepTimer)}</Text> */}
						<Text style={styles.timerText}>Таймер сна: {formatTime(remainingSeconds || 0)}</Text>
					</View>
				)}
			</View>
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
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		textShadowRadius: 5,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 16,
		color: "rgba(255,255,255,0.8)",
		marginTop: 5,
	},
	// timer container
	timerContainer: {
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
	timerText: {
		width: 170,
		// backgroundColor: "red",
		fontSize: 14,
		fontWeight: "600",
		color: "rgba(255,255,255,0.9)",
		letterSpacing: 0.5,
	},
});
