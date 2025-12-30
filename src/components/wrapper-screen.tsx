import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export const WrapperScreen = ({ children }: { children: React.ReactNode }) => {
	const insets = useSafeAreaInsets();
	return (
		<View
			style={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right,
				// backgroundColor: "red",
				flex: 1,
			}}
		>
			<StatusBar style="auto" />
			{children}
		</View>
	);
};
const styles = StyleSheet.create({});
