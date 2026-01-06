import { PlayerControls } from "@/src/components/screens/media-palaer-screen/player-controls";
import { PlayerHeader } from "@/src/components/screens/media-palaer-screen/player-header";
import { SkiaAnimatedSphere } from "@/src/components/screens/media-palaer-screen/skia-animated-sphere";
import TimePickerBottomSheet from "@/src/components/screens/media-palaer-screen/time-picker-bottom-sheet";
import { WrapperScreen } from "@/src/components/wrapper-screen"; // Absolute imports
import { useMeditationLogic } from "@/src/hooks/use-meditation-logic";
import { useTimerCountdown } from "@/src/hooks/use-timer-countdown";
import { selectEndTime, selectHours, selectIsActive, selectMinutes, useSleepTimerStore } from "@/src/store/sleep-timer-store";
// import { useSleepTimerStore } from "@/src/store/sleep-timer-store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function MeditationPlayer() {
	const { data, isLoading, categoryName, playerState } = useMeditationLogic();

	const bottomSheetRef = useRef<BottomSheetModal>(null);
	
	// ✅ Используем селекторы - подписываемся только на нужные части store
	const isActive = useSleepTimerStore(selectIsActive);
	const endTime = useSleepTimerStore(selectEndTime);
	const hours = useSleepTimerStore(selectHours);
	const minutes = useSleepTimerStore(selectMinutes);
	const { setTime, startTimer, stopTimer } = useSleepTimerStore();

		// ✅ Локальный обратный отсчет (не вызывает перерисовки других компонентов)
		const remainingSeconds = useTimerCountdown({ 
			endTime, 
			isActive,
			onTimerEnd: () => {
				// Здесь можно остановить воспроизведение
				if (playerState.isPlaying) {
					playerState.togglePlayPause();
				}
				stopTimer();
			}
		});

	// Открыть Bottom Sheet
	const handleOpenSettings = () => {
		bottomSheetRef.current?.expand();
	};

	// Изменение времени
	const handleTimeChange = (newHours: number, newMinutes: number) => {
		setTime(newHours, newMinutes);
	};

	// Запуск таймера
	const handleStartTimer = () => {
		startTimer();
		bottomSheetRef.current?.close();
	};

	// Остановка таймера
	const handleStopTimer = () => {
		stopTimer();
		bottomSheetRef.current?.close();
	};

	// Остановка таймера при размонтировании
	useEffect(() => {
		return () => {
			stopTimer();
		};
	}, [stopTimer]);

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
					onMenuPress={handleOpenSettings}
					isActiveTimer={isActive}
					remainingSeconds={remainingSeconds}
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
			{/* Bottom Sheet для настроек таймера */}
			<TimePickerBottomSheet
				ref={bottomSheetRef}
				initialHours={hours}
				initialMinutes={minutes}
				isActive={isActive}
				onTimeChange={handleTimeChange}
				onStartTimer={handleStartTimer}
				onStopTimer={handleStopTimer}
			/>
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
