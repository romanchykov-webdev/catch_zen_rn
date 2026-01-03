import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { ItemCard } from "./item-card";

interface Props {
	data: any[];

	// Пропсы для infinite scroll
	onEndReached?: () => void;
	onEndReachedThreshold?: number;
	isLoadingMore?: boolean;

	// Pull to refresh
	onRefresh?: () => void;
	isRefreshing?: boolean;
}

export const CardList = ({
	data,

	onEndReached,
	onEndReachedThreshold = 0.5,
	isLoadingMore = false,

	onRefresh,
	isRefreshing = false,
}: Props) => {
	// Футер со спиннером при загрузке следующей страницы
	const renderFooter = () => {
		if (!isLoadingMore) return null;

		return (
			<View style={styles.footer}>
				<ActivityIndicator size="small" color="#0000ff" />
			</View>
		);
	};

	return (
		<FlatList
			data={data}
			renderItem={({ item }) => <ItemCard item={item} />}
			keyExtractor={(item) => item.id}
			contentContainerStyle={styles.list}
			showsVerticalScrollIndicator={false}
			// Infinite scroll props
			onEndReached={onEndReached}
			onEndReachedThreshold={onEndReachedThreshold}
			ListFooterComponent={renderFooter}
			// Pull to refresh
			refreshControl={
				onRefresh ? (
					<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#0000ff" />
				) : undefined
			}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		paddingBottom: 100,
		gap: 16,
	},
	footer: {
		paddingVertical: 20,
		alignItems: "center",
	},
});
