import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { WrapperScreen } from "../src/components/wrapper-screen";

export default function MeditationPlayer() {
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	// Анимация пульсации центральной сферы
	const pulse = useSharedValue(1);

	useEffect(() => {
		pulse.value = withRepeat(withTiming(1.2, { duration: 4000, easing: Easing.inOut(Easing.ease) }), -1, true);
		return () => {
			if (sound) sound.unloadAsync();
		};
	}, [sound]);

	const animatedSphereStyle = useAnimatedStyle(() => ({
		transform: [{ scale: pulse.value }],
		opacity: isPlaying ? 0.8 : 0.5,
	}));

	async function togglePlayPause() {
		if (!sound) {
			// Здесь будет загрузка файла, пока для примера:
			const { sound: newSound } = await Audio.Sound.createAsync({
				uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
			});
			setSound(newSound);
			await newSound.playAsync();
			setIsPlaying(true);
		} else {
			if (isPlaying) {
				await sound.pauseAsync();
			} else {
				await sound.playAsync();
			}
			setIsPlaying(!isPlaying);
		}
	}

	return (
		<WrapperScreen>
			<View style={styles.container}>
				{/* Верхняя часть: Название */}
				<View style={styles.header}>
					<Text style={styles.title}>Утреннее спокойствие</Text>
					<Text style={styles.subtitle}>Медитация • 10 мин</Text>
				</View>

				{/* Центр: Пульсирующая сфера */}
				<View style={styles.sphereContainer}>
					<Animated.View style={[styles.mainSphere, animatedSphereStyle]} />
				</View>

				{/* Низ: Управление плеером */}
				<View style={styles.controls}>
					<TouchableOpacity onPress={() => {}}>
						<Ionicons name="play-back-outline" size={40} color="white" />
					</TouchableOpacity>

					<TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
						<Ionicons name={isPlaying ? "pause" : "play"} size={50} color="#4A90E2" />
					</TouchableOpacity>

					<TouchableOpacity onPress={() => {}}>
						<Ionicons name="play-forward-outline" size={40} color="white" />
					</TouchableOpacity>
				</View>
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
