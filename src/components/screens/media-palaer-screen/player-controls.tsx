import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { ButtonBack } from "../../button-back";
import { PressableSpringCard } from "../../pressable-spring-card";

interface ControlsProps {
	isPlaying: boolean;
	isLooping: boolean;
	onToggle: () => void;
	onToggleLoop: () => void;
}

export const PlayerControls = ({ isPlaying, isLooping, onToggle, onToggleLoop }: ControlsProps) => (
	<View style={styles.controls}>
		{/* button back */}

		<ButtonBack />

		{/* button play/pause */}
		<PressableSpringCard
			android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }}
			style={styles.playButton}
			onPressOut={onToggle}
			containerStyle={styles.shadowContainer}
		>
			<Ionicons name={isPlaying ? "pause" : "play"} size={50} color="#4A90E2" style={styles.playButtonIcon} />
		</PressableSpringCard>

		{/* button repeat */}
		<PressableSpringCard
			android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }}
			style={styles.buttonRepeat}
			onPressOut={onToggleLoop}
			containerStyle={styles.shadowContainer}
		>
			<Ionicons name="repeat" size={40} color={isLooping ? "#4A90E2" : "gray"} />
		</PressableSpringCard>
	</View>
);

const styles = StyleSheet.create({
	controls: {
		flexDirection: "row",
		alignItems: "center",
		width: "80%",
		justifyContent: "space-around",
	},
	shadowContainer: {
		shadowOpacity: 0.5,
	},
	playButtonIcon: {
		// marginLeft: 10,
	},
	playButton: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "white",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
	},
	buttonRepeat: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 100,
		padding: 10,
	},
});
