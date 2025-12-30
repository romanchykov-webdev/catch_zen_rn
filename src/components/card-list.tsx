import { FlatList, StyleSheet } from "react-native";
import { ItemCard } from "./item-card";

interface Props {
	data: any[];
	renderItem: (item: any) => React.ReactNode;
	keyExtractor: (item: any) => string;

	showsVerticalScrollIndicator: boolean;
}

export const CardList = ({ data, renderItem, keyExtractor, showsVerticalScrollIndicator }: Props) => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => <ItemCard item={item} />}
			keyExtractor={(item) => item.id}
			contentContainerStyle={styles.list}
			showsVerticalScrollIndicator={false}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		// paddingBottom: 20,
		gap: 16,
	},
});
