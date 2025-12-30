import { WrapperScreen } from "@/src/components/wrapper-screen";
import { Text, View } from "react-native";
export default function BreathingScreen() {
	return (
		<WrapperScreen>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Экран в разработке</Text>
			</View>
		</WrapperScreen>
	);
}
