import { PressableSpringCard } from "@/src/components/pressable-spring-card";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import FastButtonMinutes from "./fast-button-minutes";
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
	({ 
		initialHours, 
		initialMinutes, 
		isActive, 
		onTimeChange, 
		onStartTimer, 
		onStopTimer }
		, ref
	) => {
		//
	// console.log("initialHours",initialHours)
	// console.log("initialMinutes",initialMinutes)

		const snapPoints = useMemo(() => ["60%", "90%"], []);

		return (
			
			<BottomSheet
				ref={ref}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose={true}
				backgroundStyle={styles.bottomSheetBackground}
				handleIndicatorStyle={styles.handleIndicator}
				// Ключевые настройки для решения конфликта жестов
				enableContentPanningGesture={false}
				enableHandlePanningGesture={true}
				// Настройка чувствительности жестов
				activeOffsetY={[-10, 10]}
				failOffsetX={[-10, 10]}
			>
				{/* <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} > */}
					<BottomSheetView style={styles.contentContainer}>
						<Text style={styles.title}>
							Таймер сна
						</Text>

						<FastButtonMinutes 
							onTimeChange={onTimeChange} 
							onStartTimer={onStartTimer} 
						/>

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
				{/* </BlurView> */}
			</BottomSheet>
		
		);
	},
);

TimePickerBottomSheet.displayName = "TimePickerBottomSheet";

const styles = StyleSheet.create({
	bottomSheetBackground: {
		// backgroundColor: "#f8f8f8",
		backgroundColor: "rgba(0, 0, 0, 0.9)",

		// backgroundColor: "rgba(255, 255, 255, 0.5)",
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
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: "rgba(255, 255, 255, 0.5)",
		textShadowRadius: 5,
		textShadowColor: "rgba(255, 255, 255, 0.5)",
		textShadowOffset: { width: 3, height: 3 },
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
