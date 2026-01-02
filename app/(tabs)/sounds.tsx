import { CardList } from "@/src/components/card-list";
import { TitleScreen } from "@/src/components/title-screen";
import { WrapperScreen } from "@/src/components/wrapper-screen";
import { useInfiniteSubcategories } from "@/src/TQ/hooks/use-infinite-subcategories";
import { ActivityIndicator, Text, View } from "react-native";

export default function SoundsScreen() {
	//
	const {
		flatData: data,
		isLoading,
		error,
		hasMore,
		loadMore,
		isLoadingMore,
		refetch,
		isRefetching,
	} = useInfiniteSubcategories(3, 3);
	// Обработчик прокрутки до конца списка
	const handleEndReached = () => {
		if (hasMore && !isLoadingMore) {
			// console.log("📥 Загружаем следующую страницу...");
			loadMore();
		}
	};

	// Обработчик pull-to-refresh
	const handleRefresh = () => {
		// console.log("🔄 Обновление данных по запросу пользователя...");
		refetch();
	};

	if (isLoading) {
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
					<Text style={{ color: "red" }}>
						{error instanceof Error ? error.message : "Не удалось загрузить данные"}
					</Text>
				</View>
			</WrapperScreen>
		);
	}
	return (
		<WrapperScreen>
			<TitleScreen title="Найди свой дзен" subtitle="Звуки для сна" />

			<CardList
				data={data}
				// Infinite scroll пропсы
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.5}
				isLoadingMore={isLoadingMore}
				// Pull to refresh
				onRefresh={handleRefresh}
				isRefreshing={isRefetching}
			/>
		</WrapperScreen>
	);
}
