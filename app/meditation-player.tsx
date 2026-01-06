import { PlayerControls } from "@/src/components/screens/media-palaer-screen/player-controls";
import { PlayerHeader } from "@/src/components/screens/media-palaer-screen/player-header";
import { SkiaAnimatedSphere } from "@/src/components/screens/media-palaer-screen/skia-animated-sphere";
import TimePickerBottomSheet from "@/src/components/screens/media-palaer-screen/time-picker-bottom-sheet";
import { WrapperScreen } from "@/src/components/wrapper-screen"; // Absolute imports
import { useMeditationLogic } from "@/src/hooks/use-meditation-logic";
import { useSleepTimerStore } from "@/src/store/sleep-timer-store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function MeditationPlayer() {
	const { data, isLoading, categoryName, playerState, timerState, navigation } = useMeditationLogic();

	const bottomSheetRef = useRef<BottomSheetModal>(null);
	// Sleep Timer Store
	const { hours, minutes, isActive, setTime, startTimer, stopTimer } = useSleepTimerStore();

	// Локальное состояние для выбранного времени
	const [selectedHours, setSelectedHours] = useState(hours);
	const [selectedMinutes, setSelectedMinutes] = useState(minutes);

	// Открыть Bottom Sheet
	const handleOpenSettings = () => {
		bottomSheetRef.current?.expand();
	};

	// Изменение времени
	const handleTimeChange = (newHours: number, newMinutes: number) => {
		setSelectedHours(newHours);
		setSelectedMinutes(newMinutes);
	};

	// Запуск таймера
	const handleStartTimer = () => {
		setTime(selectedHours, selectedMinutes);
		startTimer();
		bottomSheetRef.current?.close();
	};

	// Остановка таймера
	const handleStopTimer = () => {
		stopTimer();
		bottomSheetRef.current?.close();
	};

	// Остановка таймера при размонтировании компонента
	useEffect(() => {
		return () => {
			// console.log("Компонент плеера размонтирован");
			stopTimer();
		};
	}, []);

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
					// onMenuPress={navigation.goToSettings}
					onMenuPress={handleOpenSettings}
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
