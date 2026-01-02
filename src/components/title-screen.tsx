import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

interface Props {
	title?: string;
	subtitle?: string;
	containerStyle?: StyleProp<ViewStyle>;
	tilleStyle?: StyleProp<TextStyle>;
	subtitleStyle?: StyleProp<TextStyle>;
}

export const TitleScreen = ({ title, subtitle, containerStyle, tilleStyle, subtitleStyle }: Props) => {
	return (
		<View style={[styles.container, containerStyle]}>
			{title && <Text style={[styles.title, tilleStyle]}>{title}</Text>}
			{subtitle && <Text style={[styles.title, subtitleStyle]}>{subtitle}</Text>}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
		marginBottom: 10,
		// shadow for text
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		textAlign: "center",
		// shadow for text
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
	},
});
