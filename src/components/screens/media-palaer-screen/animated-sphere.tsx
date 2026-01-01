import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export const AnimatedSphere = ({ isPlaying }: { isPlaying: boolean }) => {
	const pulse = useSharedValue(1);

	useEffect(() => {
		pulse.value = withRepeat(withTiming(1.2, { duration: 4000, easing: Easing.inOut(Easing.ease) }), -1, true);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: pulse.value }],
		opacity: isPlaying ? 0.8 : 0.5,
	}));

	return (
		<View style={styles.sphereContainer}>
			<Animated.View style={[styles.mainSphere, animatedStyle]} />
		</View>
	);
};

const styles = StyleSheet.create({
	sphereContainer: { justifyContent: "center", alignItems: "center" },
	mainSphere: {
		width: 200,
		height: 200,
		borderRadius: 100,
		backgroundColor: "white",
		shadowColor: "#FFF",
		shadowOpacity: 0.5,
		shadowRadius: 20,
		elevation: 10,
	},
});
