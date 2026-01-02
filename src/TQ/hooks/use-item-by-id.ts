import { MeditationData } from "@/src/hooks/use-meditation-logic";
import { getById } from "@/src/services/getItemById";
import { queryKeys } from "@/src/TQ/query-keys";
import { useQuery } from "@tanstack/react-query";

/**
 * Хук для получения одного элемента по ID
 * Используется в плеере
 */
export const useItemById = (id: string | number | undefined) => {
	return useQuery({
		queryKey: queryKeys.subcategories.byId(id ?? ""),
		queryFn: async () => {
			if (!id) throw new Error("ID is required");
			const data = await getById(id);
			if (!data) throw new Error("Item not found");
			return data as MeditationData;
		},
		// Запрос выполняется только если есть ID
		enabled: !!id,
		// Данные плеера можно кэшировать дольше
		// staleTime: 15 * 60 * 1000, // 15 минут
		staleTime: Infinity,
		gcTime: Infinity,
	});
};
