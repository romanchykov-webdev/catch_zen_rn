import { AnimatedSphere } from "@/src/components/screens/media-palaer-screen/animated-sphere";
import { PlayerControls } from "@/src/components/screens/media-palaer-screen/player-controls";
import { PlayerHeader } from "@/src/components/screens/media-palaer-screen/player-header";
import { useAudioPlayer } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WrapperScreen } from "../src/components/wrapper-screen";
import { getById } from "../src/services/getItemById";

interface MeditationData {
	id: number;
	title: string;
	duration: number;
	color: string[];
	image?: string;
	sound?: string;
}

export default function MeditationPlayer() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [meditationData, setMeditationData] = useState<MeditationData | null>(null);
	const [loading, setLoading] = useState(true);
	const [soundUri, setSoundUri] = useState<string | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const player = useAudioPlayer(soundUri || "");

	useEffect(() => {
		const loadMeditation = async () => {
			if (!id) return;
			const data = await getById(id);
			if (data) {
				setMeditationData(data as MeditationData);
				setSoundUri(data.sound || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
			}
			setLoading(false);
		};
		loadMeditation();
	}, [id]);

	// Синхронизируем состояние только при изменении soundUri (новый трек)
	useEffect(() => {
		if (soundUri && player) {
			setIsPlaying(false); // Сбрасываем состояние при загрузке нового трека
		}
	}, [soundUri]);

	const togglePlayPause = () => {
		if (!player || !soundUri) {
			console.log("❌ Player или soundUri отсутствуют");
			return;
		}

		try {
			if (isPlaying) {
				// console.log("⏸️ Пауза...");
				player.pause();
				setIsPlaying(false);
			} else {
				// console.log("▶️ Воспроизведение...");
				player.play();
				setIsPlaying(true);
			}
		} catch (error) {
			console.error("❌ Ошибка переключения:", error);
		}
	};

	if (loading)
		return (
			<WrapperScreen>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			</WrapperScreen>
		);

	if (!meditationData) {
		return (
			<WrapperScreen>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			</WrapperScreen>
		);
	}

	return (
		<WrapperScreen>
			<View style={styles.container}>
				<PlayerHeader title={meditationData.title} duration={meditationData.duration} />

				<AnimatedSphere isPlaying={isPlaying} />

				<PlayerControls isPlaying={isPlaying} onToggle={togglePlayPause} />
			</View>
		</WrapperScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 50,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		color: "white",
		marginTop: 20,
		fontSize: 16,
	},
	errorText: {
		color: "red",
		fontSize: 18,
	},
	header: {
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 5,
	},
	subtitle: {
		fontSize: 16,
		color: "rgba(255,255,255,0.8)",
		marginTop: 5,
	},
	sphereContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	mainSphere: {
		width: 200,
		height: 200,
		borderRadius: 100,
		backgroundColor: "white",
		shadowColor: "#FFF",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.5,
		shadowRadius: 20,
		elevation: 10,
	},
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
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 5,
	},
});
