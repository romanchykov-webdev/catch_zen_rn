// import { useSleepTimerStore } from "@/src/store/sleep-timer-store";
import { useAudioPlayer } from "expo-audio";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useItemById } from "../TQ/hooks/use-item-by-id";

//
export interface MeditationData {
	id: number;
	title: string;
	duration: number;
	color: string[];
	category_id: number;
	image?: string;
	sound?: string;
}

const CATEGORY_NAMES: Record<number, string> = {
	1: "Медитация",
	2: "Дыхание",
	3: "Сон",
};

export const useMeditationLogic = () => {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();

	//  Используем React Query вместо useState + useEffect
	const { data, isLoading, error } = useItemById(id);

	// Sleep Timer Store
	// const { isActive, remainingSeconds } = useSleepTimerStore();

	// Audio Player
	// Инициализируем плеер только если есть soundUri.
	// Если data.sound еще нет, хук вернет null или дефолтное состояние, но не ошибку.
	const player = useAudioPlayer(data?.sound ?? null);

	// Локальное состояние UI,
	// Примечание: В expo-audio (beta) состояние лучше читать из свойств плеера,
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLooping, setIsLooping] = useState(false);

	// Логика таймера сна
	// useEffect(() => {
	// 	// Если таймер активен и дошел до 0
	// 	if (isActive && remainingSeconds === 0 && player?.playing) {
	// 		player.pause();
	// 		setIsPlaying(false);
	// 	}
	// }, [remainingSeconds, isActive, player]);

	// Управление Loop
	useEffect(() => {
		if (player) {
			player.loop = isLooping;
		}
	}, [isLooping, player]);

	// Обработка завершения воспроизведения
	useEffect(() => {
		if (!player) return;

		const checkPlaybackStatus = () => {
			// Если трек закончился (currentTime >= duration) и раньше играл
			if (player.currentTime >= player.duration && isPlaying) {
				setIsPlaying(false);
			}
		};

		const interval = setInterval(checkPlaybackStatus, 200);

		return () => clearInterval(interval);
	}, [player, isPlaying]);

	// Play/Pause Handler
	const togglePlayPause = useCallback(() => {
		if (!player) return;

		if (player.playing) {
			// Используем свойство плеера для проверки истины
			player.pause();
			setIsPlaying(false);
		} else {
			player.play();
			setIsPlaying(true);
		}
	}, [player]);

	const toggleLooping = useCallback(() => {
		setIsLooping((prev) => !prev);
	}, []);

	// Category Name
	const categoryName = useMemo(() => {
		return data?.category_id ? CATEGORY_NAMES[data.category_id] : "";
	}, [data?.category_id]);

	return {
		data,
		isLoading,
		error,
		categoryName,
		playerState: {
			isPlaying,
			isLooping,
			togglePlayPause,
			toggleLooping,
		},
		// timerState: {
		// 	isActive,
		// },
		navigation: {
			goBack: router.back,
			goToSettings: () => router.push("/meditation-settings"),
		},
	};
};
