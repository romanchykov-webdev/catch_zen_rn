import { CardList } from "@/src/components/card-list";
import { ItemCard } from "@/src/components/item-card";
import { TitleScreen } from "@/src/components/title-screen";
import { WrapperScreen } from "@/src/components/wrapper-screen";
import { BREATHING } from "@/src/constants/mok-data";
import React from "react";
import { StyleSheet, View } from "react-native";
export default function HomeScreen() {
	return (
		<WrapperScreen>
			<View style={styles.container}>
				<TitleScreen title="Дыхание" />

				<CardList
					data={BREATHING}
					renderItem={({ item }) => <ItemCard item={item} />}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</WrapperScreen>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
		// backgroundColor: "#F0F4F7",
		paddingHorizontal: 20,
		paddingTop: 20,
	},
});
