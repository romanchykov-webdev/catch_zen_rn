import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { PressableSpringCard } from "./pressable-spring-card";

interface Props {
	id: string;
	title: string;
	duration: string;
	color: string[];
	image: string;
}

export const ItemCard = ({ item }: { item: Props }) => {
	const router = useRouter();

	const handlePress = () => {
		router.push({
			pathname: "/meditation-player",
			params: { id: String(item.id) },
		});
	};

	return (
		<PressableSpringCard
			onPress={handlePress}
			android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }}
			style={styles.card}
			containerStyle={styles.shadowContainer}
		>
			<ImageBackground
				source={{ uri: item.image }}
				style={StyleSheet.absoluteFillObject}
				// imageStyle={{ borderRadius: 20 }}
			/>
			<LinearGradient colors={[...item.color] as [string, string]} style={styles.gradient} />
			<View style={styles.cardContent}>
				<Text style={styles.cardTitle}>{item.title}</Text>
				<Text style={styles.cardDuration}>{item.duration} минут</Text>
			</View>
		</PressableSpringCard>
	);
};

const styles = StyleSheet.create({
	shadowContainer: {
		// 	// Тень на внешнем контейнере
		// 	elevation: 5,
		// 	shadowColor: "#000",
		// 	shadowOffset: { width: 0, height: 0 },
		// 	shadowOpacity: 0.6,
		// 	shadowRadius: 25,
		// 	borderRadius: 20,
		// 	overflow: "hidden",
		padding: 5,
	},
	card: {
		// marginBottom: 15,

		borderRadius: 17,
		overflow: "hidden",

		position: "relative",
		minHeight: 120,
		padding: 25,
	},

	gradient: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0.2,
	},
	cardContent: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		padding: 16,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	cardTitle: {
		color: "white",
		fontSize: 20,
		fontWeight: "700",
		// shadow for text
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 5,
	},
	cardDuration: {
		color: "rgba(255, 255, 255, 0.8)",
		fontSize: 16,
		marginTop: 5,
		fontWeight: "500",
		// shadow for text
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 5,
	},
});
