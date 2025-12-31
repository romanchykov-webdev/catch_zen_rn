import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ControlsProps {
	isPlaying: boolean;
	isLooping: boolean;
	onToggle: () => void;
	onToggleLoop: () => void;
}

export const PlayerControls = ({ isPlaying, isLooping, onToggle, onToggleLoop }: ControlsProps) => (
	<View style={styles.controls}>
		<TouchableOpacity>
			<Ionicons name="play-back-outline" size={40} color="white" />
		</TouchableOpacity>
		<TouchableOpacity style={styles.playButton} onPress={onToggle}>
			<Ionicons name={isPlaying ? "pause" : "play"} size={50} color="#4A90E2" />
		</TouchableOpacity>
		<TouchableOpacity onPress={onToggleLoop}>
			<Ionicons name="repeat" size={40} color={isLooping ? "#4A90E2" : "white"} />
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
	playButton: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
	},
});
