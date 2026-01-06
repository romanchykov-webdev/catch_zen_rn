import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { PressableSpringCard } from "../../pressable-spring-card";
import { TitleScreen } from "../../title-screen";
import TimerIndicator from "./timer-indicator";

interface PlayerHeaderProps {
	title: string;
	duration: number;
	categoryName: string;
	onMenuPress: () => void;

	isActiveTimer: boolean;
	remainingSeconds: number;
}



export const PlayerHeader = ({
	title,
	duration,
	categoryName,
	onMenuPress,
	isActiveTimer,
	remainingSeconds,
}: PlayerHeaderProps) => {
	

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
					<Ionicons name="settings-outline" size={25} color="rgba(0,0,0,0.5)" />
				</PressableSpringCard>
			</View>

			{/* header */}
			<View style={styles.header}>
				<TitleScreen
					title={title}
					tilleStyle={{ fontWeight: "900" }}
					subtitle={`${categoryName} • ${duration} мин`}
					subtitleStyle={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 5 }}
				/>

				{/* Отображение таймера сна */}
				{isActiveTimer && remainingSeconds > 0 && (
					<TimerIndicator 
						remainingSeconds={remainingSeconds} 
					/>
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
	buttonMenu: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		alignSelf: "flex-end",
		borderRadius: 100,
		padding: 10,
	},
	shadowContainer: {
		shadowOpacity: 0.5,
	},
	header: {
		position: "relative",
		alignItems: "center",
		gap: 10,
		width: "100%",
		// paddingBottom: 30,
	},
	
	
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		textShadowRadius: 5,
		textAlign: "center",
	},
});
