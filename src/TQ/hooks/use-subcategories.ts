import { getSubcategoriesByCategoryId } from "@/src/services/getSubcategoriesByCategoryId";
import { queryKeys } from "@/src/TQ/query-keys";
import { CardListProps } from "@/src/types/types-screen";
import { useQuery } from "@tanstack/react-query";

/**
 * Хук для получения списка подкатегорий по ID категории
 * Автоматически управляет состояниями loading, error и кэшированием
 */
export const useSubcategoriesByCategory = (categoryId: number) => {
	return useQuery({
		queryKey: queryKeys.subcategories.byCategory(categoryId),
		queryFn: async () => {
			const data = await getSubcategoriesByCategoryId(categoryId);
			return data as unknown as CardListProps[];
		},
		// Данные редко меняются, держим их свежими дольше
		staleTime: 10 * 60 * 1000, // 10 минут
		// Показываем старые данные пока загружаются новые
		placeholderData: (previousData) => previousData,
	});
};
