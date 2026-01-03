import { PressableSpringCard } from "@/src/components/pressable-spring-card";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import type { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, { forwardRef, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import TimePicker from "./time-piker";

type Props = {
	initialHours: number;
	initialMinutes: number;
	isActive: boolean;
	onTimeChange: (hours: number, minutes: number) => void;
	onStartTimer: () => void;
	onStopTimer: () => void;
};

const TimePickerBottomSheet = forwardRef<BottomSheet, Props>(
	({ initialHours, initialMinutes, isActive, onTimeChange, onStartTimer, onStopTimer }, ref) => {
		const snapPoints = useMemo(() => ["60%", "85%"], []);

		// Backdrop для затемнения фона
		const renderBackdrop = (props: BottomSheetDefaultBackdropProps) => (
			<BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
		);

		return (
			<BottomSheet
				ref={ref}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose={true}
				backgroundStyle={styles.bottomSheetBackground}
				handleIndicatorStyle={styles.handleIndicator}
				// backdropComponent={renderBackdrop}
				// Ключевые настройки для решения конфликта жестов
				enableContentPanningGesture={false}
				enableHandlePanningGesture={true}
				// Настройка чувствительности жестов
				activeOffsetY={[-10, 10]}
				failOffsetX={[-10, 10]}
			>
				<BottomSheetView style={styles.contentContainer}>
					<Text style={styles.title}>
						Настройте время через которое приложение остановит воспроизведение автоматически
					</Text>

					<TimePicker
						initialHours={initialHours}
						initialMinutes={initialMinutes}
						onTimeChange={onTimeChange}
					/>

					{/* wrapper start/stop buttons */}
					<View style={styles.wrapperButtons}>
						{/* start timer button */}
						<PressableSpringCard
							style={styles.button}
							onPress={onStartTimer}
							containerStyle={styles.shadowContainer}
						>
							<MaterialIcons name="alarm-add" size={45} color="green" />
						</PressableSpringCard>

						{/*stop timer button */}
						{isActive && (
							<PressableSpringCard
								style={[styles.button]}
								onPress={onStopTimer}
								containerStyle={styles.shadowContainer}
							>
								<MaterialIcons name="alarm-off" size={45} color="red" />
							</PressableSpringCard>
						)}
					</View>
				</BottomSheetView>
			</BottomSheet>
		);
	},
);

TimePickerBottomSheet.displayName = "TimePickerBottomSheet";

const styles = StyleSheet.create({
	bottomSheetBackground: {
		backgroundColor: "#f8f8f8",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	handleIndicator: {
		// backgroundColor: "#999",
		width: 40,
	},
	contentContainer: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: "#000",
	},
	wrapperButtons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 50,
		marginTop: 20,
	},
	button: {
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		padding: 16,
		borderRadius: 100,
		alignItems: "center",
	},
	shadowContainer: {
		shadowOpacity: 0.5,
	},
});

export default TimePickerBottomSheet;
