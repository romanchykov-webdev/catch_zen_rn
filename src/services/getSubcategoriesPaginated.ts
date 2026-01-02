import { supabase } from "../lib/supabase";

export interface PaginatedResponse<T> {
	data: T[];
	nextCursor: number | null;
	hasMore: boolean;
}

/**
 * Функция для получения подкатегорий с пагинацией
 * @param categoryId - ID категории
 * @param pageParam - Номер страницы (начинается с 0)
 * @param pageSize - Количество элементов на странице
 */
export const getSubcategoriesPaginated = async (
	categoryId: number,
	pageParam: number = 0,
	pageSize: number = 10,
): Promise<PaginatedResponse<any>> => {
	try {
		const from = pageParam * pageSize;
		const to = from + pageSize - 1;

		// console.log(`🔍 Запрос данных: категория ${categoryId}, страница ${pageParam}, диапазон ${from}-${to}`);

		const { data, error, count } = await supabase
			.from("subcategories")
			.select("id, title, duration, color, image", { count: "exact" })
			.eq("category_id", categoryId)
			.order("id", { ascending: true })
			.range(from, to);

		if (error) {
			console.error("❌ Ошибка Supabase:", error);
			throw new Error(error.message);
		}

		const hasMore = count ? from + pageSize < count : false;
		const nextCursor = hasMore ? pageParam + 1 : null;

		// console.log(`✅ Получено ${data?.length || 0} из ${count} элементов. Есть еще: ${hasMore}`);

		return {
			data: data || [],
			nextCursor,
			hasMore,
		};
	} catch (err) {
		console.error("❌ Непредвиденная ошибка:", err);
		throw err;
	}
};
