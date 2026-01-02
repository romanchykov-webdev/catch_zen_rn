import * as Haptics from "expo-haptics";
import React, { useRef } from "react";
import { Animated, Platform, Pressable, PressableProps, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface PressableSpringCardProps extends PressableProps {
	children: React.ReactNode;
	/**
	 * Масштаб при нажатии (по умолчанию 0.97)
	 */
	scaleTo?: number;
	/**
	 * Дополнительный стиль для контейнера (можно переопределить тень и т.п.)
	 */
	containerStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<ViewStyle>;
}

export const PressableSpringCard = ({
	children,
	scaleTo = 0.95,
	containerStyle,
	style,
	onPressIn: externalOnPressIn,
	onPressOut: externalOnPressOut,
	android_ripple = { color: "rgba(255, 255, 255, 0.3)", borderless: false },
	...pressableProps
}: PressableSpringCardProps) => {
	const scaleValue = useRef(new Animated.Value(1)).current;

	const animateTo = (toValue: number) => {
		Animated.spring(scaleValue, {
			toValue,
			useNativeDriver: true,
			friction: 8,
			tension: 100,
		}).start();
	};

	const handlePressIn = (e: any) => {
		animateTo(scaleTo);
		externalOnPressIn?.(e);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};

	const handlePressOut = (e: any) => {
		animateTo(1);
		externalOnPressOut?.(e);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};

	return (
		<View style={[styles.shadowContainer, containerStyle]}>
			<Pressable
				{...pressableProps}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				android_ripple={android_ripple}
				style={{ borderRadius: StyleSheet.flatten(style || {})?.borderRadius || 20 }}
			>
				<Animated.View
					style={[
						{
							transform: [{ scale: scaleValue }],
						},
						style,
					]}
				>
					{children}
				</Animated.View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	shadowContainer: {
		elevation: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1,
		shadowRadius: 3,
		borderRadius: 5,
		overflow: Platform.OS === "android" ? "hidden" : "visible", // важно для тени на iOS
		// marginBottom: 16,
	},
});
