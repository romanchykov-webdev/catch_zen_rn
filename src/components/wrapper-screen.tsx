import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const BASE_SIZE = width * 1.2; // Сделали чуть больше, чтобы перекрытие было красивым

// --- 1. Насыщенные цвета вместо бледных ---
const COLORS = {
	BLUE: "#4A90E2", // насыщенный небесный
	PURPLE: "#9B59B6", // Был бледно-лавандовый, стал мягкий фиолетовый
	BG: "#F0F6FF", // Фон чуть-чуть холоднее
};

const BlurredOrb = ({ color }: { color: string }) => (
	<Svg height="100%" width="100%" viewBox="0 0 100 100">
		<Defs>
			<RadialGradient
				id="grad"
				cx="50%"
				cy="50%"
				rx="50%"
				ry="50%"
				fx="50%"
				fy="50%"
				gradientUnits="userSpaceOnUse"
			>
				{/* --- 2. Усиленное ядро градиента --- */}
				{/* Центр полностью плотный (1) */}
				<Stop offset="0%" stopColor={color} stopOpacity="1" />
				{/* До 40% радиуса цвет все еще довольно плотный */}
				<Stop offset="40%" stopColor={color} stopOpacity="0.8" />
				{/* И только к 100% уходит в ноль */}
				<Stop offset="100%" stopColor={color} stopOpacity="0" />
			</RadialGradient>
		</Defs>
		<Circle cx="50" cy="50" r="50" fill="url(#grad)" />
	</Svg>
);

export const WrapperScreen = ({ children }: { children: React.ReactNode }) => {
	const insets = useSafeAreaInsets();
	const progress1 = useSharedValue(0);
	const progress2 = useSharedValue(0);

	useEffect(() => {
		const config = { duration: 10000, easing: Easing.inOut(Easing.ease) }; // Чуть ускорил (10 сек)
		progress1.value = withRepeat(withTiming(1, config), -1, true);
		progress2.value = withDelay(2000, withRepeat(withTiming(1, { ...config, duration: 12000 }), -1, true));
	}, []);

	const animatedStyle1 = useAnimatedStyle(() => {
		const translateX = interpolate(progress1.value, [0, 1], [0, width * 0.1]);
		const translateY = interpolate(progress1.value, [0, 1], [0, height * 0.1]);

		// --- 3. Анимация прозрачности стала "смелее" ---
		// Теперь минимум 0.7, максимум 1. Сферы всегда видны.
		const opacity = interpolate(progress1.value, [0, 0.5, 1], [0.7, 1, 0.7]);
		const scale = interpolate(progress1.value, [0, 0.5, 1], [1, 1.3, 1]);

		return { transform: [{ translateX }, { translateY }, { scale }], opacity };
	});

	const animatedStyle2 = useAnimatedStyle(() => {
		const translateX = interpolate(progress2.value, [0, 1], [0, -width * 0.15]);
		const translateY = interpolate(progress2.value, [0, 1], [0, -height * 0.1]);

		// Тоже держим высокую прозрачность
		const opacity = interpolate(progress2.value, [0, 0.5, 1], [0.6, 0.9, 0.6]);
		const scale = interpolate(progress2.value, [0, 0.5, 1], [1.2, 0.9, 1.2]);

		return { transform: [{ translateX }, { translateY }, { scale }], opacity };
	});

	return (
		<View style={styles.container}>
			<StatusBar style="dark" />

			<View style={[StyleSheet.absoluteFill, styles.backgroundContainer]}>
				<Animated.View style={[styles.blobContainer, styles.blob1Pos, animatedStyle1]}>
					<BlurredOrb color={COLORS.BLUE} />
				</Animated.View>

				<Animated.View style={[styles.blobContainer, styles.blob2Pos, animatedStyle2]}>
					<BlurredOrb color={COLORS.PURPLE} />
				</Animated.View>

				{/* Вуаль  */}
				<View
					style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(255,255,255,0.1)" }}
					pointerEvents="none"
				/>
			</View>

			<View
				style={{
					flex: 1,
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
					// paddingHorizontal: 10,
					// backgroundColor: "red",
				}}
			>
				{children}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BG,
		paddingHorizontal: 10,
	},
	backgroundContainer: {
		overflow: "hidden",
	},
	blobContainer: {
		position: "absolute",
		width: BASE_SIZE,
		height: BASE_SIZE,
	},
	blob1Pos: {
		top: -BASE_SIZE * 0.25,
		left: -BASE_SIZE * 0.2,
	},
	blob2Pos: {
		bottom: -BASE_SIZE * 0.25,
		right: -BASE_SIZE * 0.2,
	},
});
