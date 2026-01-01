import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ButtonBack } from "../../button-back";

interface ControlsProps {
	isPlaying: boolean;
	isLooping: boolean;
	onToggle: () => void;
	onToggleLoop: () => void;
}

export const PlayerControls = ({ isPlaying, isLooping, onToggle, onToggleLoop }: ControlsProps) => (
	<View style={styles.controls}>
		{/* <TouchableOpacity>
			<Ionicons name="play-back-outline" size={40} color="white" />
		</TouchableOpacity> */}
		{/* <View style={styles.buttonBackContainer}> */}
		<ButtonBack />
		{/* </View> */}
		<TouchableOpacity style={styles.playButton} onPress={onToggle}>
			<Ionicons name={isPlaying ? "pause" : "play"} size={50} color="#4A90E2" style={styles.playButtonIcon} />
		</TouchableOpacity>
		<TouchableOpacity onPress={onToggleLoop} style={styles.buttonRepeat}>
			<Ionicons name="repeat" size={40} color={isLooping ? "#4A90E2" : "gray"} />
		</TouchableOpacity>
	</View>
);

const styles = StyleSheet.create({
	controls: {
		flexDirection: "row",
		alignItems: "center",
		width: "80%",
		justifyContent: "space-around",
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
