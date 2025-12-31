import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
		<TouchableOpacity style={styles.card} onPress={handlePress}>
			<ImageBackground source={{ uri: item.image }} style={{ ...StyleSheet.absoluteFillObject }} />
			<LinearGradient colors={[...item.color] as [string, string]} style={styles.gradient}></LinearGradient>
			<View style={styles.cardContent}>
				<Text style={styles.cardTitle}>{item.title}</Text>
				<Text style={styles.cardDuration}>{item.duration} минут</Text>
			</View>
			{/* <Text style={styles.playIcon}>▶</Text> */}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		// marginBottom: 15,

		borderRadius: 20,
		overflow: "hidden",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		position: "relative",
		minHeight: 120,
		padding: 25,
	},
	// imageBackground: {
	// 	// width: "100%",
	// 	// height: "100%",

	// 	// bottom: 0,
	// 	...StyleSheet.absoluteFillObject,
	// },
	gradient: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0.2,
	},
	cardContent: {
		gap: 20,
	},
	cardTitle: {
		color: "white",
		fontSize: 20,
		fontWeight: "600",
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 5,
	},
	cardDuration: {
		color: "rgba(255, 255, 255, 0.8)",
		fontSize: 14,
		marginTop: 5,
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 5,
	},

	playIcon: {
		color: "white",
		fontSize: 24,
	},
});
