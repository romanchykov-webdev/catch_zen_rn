import { PlayerControls } from "@/src/components/screens/media-palaer-screen/player-controls";
import { PlayerHeader } from "@/src/components/screens/media-palaer-screen/player-header";
import { SkiaAnimatedSphere } from "@/src/components/screens/media-palaer-screen/skia-animated-sphere";
import { useAudioPlayer } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WrapperScreen } from "../src/components/wrapper-screen";
import { getById } from "../src/services/getItemById";

interface MeditationData {
	id: number;
	title: string;
	duration: number;
	color: string[];
	category_id: number;
	image?: string;
	sound?: string;
}

export default function MeditationPlayer() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [meditationData, setMeditationData] = useState<MeditationData | null>(null);
	const [loading, setLoading] = useState(true);
	const [soundUri, setSoundUri] = useState<string | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLooping, setIsLooping] = useState(false);

	const player = useAudioPlayer(soundUri || "");

	// console.log("meditationData", meditationData);

	// Вычисляем название категории через useMemo вместо switch в рендере
	const categoryName = useMemo(() => {
		switch (meditationData?.category_id) {
			case 1:
				return "Медитация";
			case 2:
				return "Дыхание";
			case 3:
				return "Сон";
			default:
				return "";
		}
	}, [meditationData?.category_id]);

	useEffect(() => {
		const loadMeditation = async () => {
			if (!id) return;
			const data = await getById(id);
			if (data) {
				setMeditationData(data as MeditationData);
				setSoundUri(data.sound);
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

	// Устанавливаем зацикливание при изменении isLooping
	useEffect(() => {
		if (player && soundUri) {
			try {
				// В expo-audio зацикливание устанавливается через свойство loop
				// Используем type assertion для доступа к свойству loop
				const audioPlayer = player as any;
				if (typeof audioPlayer.loop !== "undefined") {
					audioPlayer.loop = isLooping;
				}
			} catch (error) {
				console.error("❌ Ошибка установки зацикливания:", error);
			}
		}
	}, [isLooping, player, soundUri]);

	const toggleLooping = () => {
		setIsLooping((prev) => !prev);
	};

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
				<PlayerHeader
					title={meditationData.title}
					duration={meditationData.duration}
					categoryName={categoryName}
				/>
				<SkiaAnimatedSphere isPlaying={isPlaying} />
				<PlayerControls
					isPlaying={isPlaying}
					isLooping={isLooping}
					onToggle={togglePlayPause}
					onToggleLoop={toggleLooping}
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
