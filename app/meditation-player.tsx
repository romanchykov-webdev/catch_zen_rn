import { PlayerControls } from "@/src/components/screens/media-palaer-screen/player-controls";
import { PlayerHeader } from "@/src/components/screens/media-palaer-screen/player-header";
import { SkiaAnimatedSphere } from "@/src/components/screens/media-palaer-screen/skia-animated-sphere";
import { WrapperScreen } from "@/src/components/wrapper-screen"; // Absolute imports
import { useMeditationLogic } from "@/src/hooks/use-meditation-logic";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function MeditationPlayer() {
	const { data, isLoading, categoryName, playerState, timerState, navigation } = useMeditationLogic();

	// Единый экран загрузки/ошибки
	if (isLoading || !data) {
		return (
			<WrapperScreen>
				<View style={styles.centerContainer}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			</WrapperScreen>
		);
	}

	return (
		<WrapperScreen>
			<View style={styles.container}>
				<PlayerHeader
					title={data.title}
					duration={data.duration}
					categoryName={categoryName}
					onMenuPress={navigation.goToSettings}
					isActiveTimer={timerState.isActive}
				/>

				{/* Анимация получает статус напрямую из логики */}
				<SkiaAnimatedSphere isPlaying={playerState.isPlaying} />

				<PlayerControls
					isPlaying={playerState.isPlaying}
					isLooping={playerState.isLooping}
					onToggle={playerState.togglePlayPause}
					onToggleLoop={playerState.toggleLooping}
				/>
			</View>
		</WrapperScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 50,
	},
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
