import { CardList } from "@/src/components/card-list";
import { ItemCard } from "@/src/components/item-card";
import { TitleScreen } from "@/src/components/title-screen";
import { WrapperScreen } from "@/src/components/wrapper-screen";
import { getSubcategoriesByCategoryId } from "@/src/services/getSubcategoriesByCategoryId";
import { CardListProps } from "@/src/types/types-screen";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	const [data, setData] = useState<CardListProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const result = await getSubcategoriesByCategoryId(1);
				// console.log("Полученные данные:", result);
				setData(result as unknown as CardListProps[]);
			} catch (err) {
				console.error("Ошибка загрузки данных:", err);
				setError("Не удалось загрузить данные");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return (
			<WrapperScreen>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			</WrapperScreen>
		);
	}

	if (error) {
		return (
			<WrapperScreen>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text style={{ color: "red" }}>{error}</Text>
				</View>
			</WrapperScreen>
		);
	}

	return (
		<WrapperScreen>
			<View style={styles.container}>
				<TitleScreen title="Дыхание" />

				<CardList
					data={data}
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
