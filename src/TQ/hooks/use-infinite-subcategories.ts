import { getSubcategoriesPaginated } from "@/src/services/getSubcategoriesPaginated";
import { queryKeys } from "@/src/TQ/query-keys";
import { CardListProps } from "@/src/types/types-screen";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

/**
 * Хук для бесконечной прокрутки подкатегорий
 * @param categoryId - ID категории
 * @param pageSize - Количество элементов на странице (по умолчанию 10)
 */
export const useInfiniteSubcategories = (categoryId: number, pageSize: number = 10) => {
	const query = useInfiniteQuery({
		queryKey: queryKeys.subcategories.byCategoryInfinite(categoryId),
		queryFn: ({ pageParam = 0 }) => getSubcategoriesPaginated(categoryId, pageParam, pageSize),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		initialPageParam: 0,

		// Настройки для редко меняющегося контента
		staleTime: Infinity,
		gcTime: 24 * 60 * 60 * 1000, // 24 часа - кэш живет целый день
		refetchOnMount: false, // НЕ перезапрашивать при каждом открытии экрана
		refetchOnWindowFocus: false, // НЕ перезапрашивать при возврате в приложение

		// Показываем закэшированные данные пока обновляем в фоне (если вдруг обновляем)
		placeholderData: (previousData) => previousData,
	});

	// Объединяем все страницы в один массив для удобства
	const flatData = useMemo(() => {
		return query.data?.pages.flatMap((page) => page.data) ?? [];
	}, [query.data]);

	return {
		...query,
		flatData: flatData as CardListProps[],
		// Удобные флаги
		hasMore: query.hasNextPage ?? false,
		loadMore: query.fetchNextPage,
		isLoadingMore: query.isFetchingNextPage,
	};
};
