import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { queryClient } from "@/src/TQ/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="meditation-player"
						options={{
							presentation: "card",
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="meditation-settings"
						options={{
							presentation: "modal",
							title: "Настройки",
							headerShown: true,
						}}
					/>
					<Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
				</Stack>
				<StatusBar style="auto" />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
