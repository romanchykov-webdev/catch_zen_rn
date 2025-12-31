import { supabase } from "../lib/supabase";

/**
 * Универсальная функция для получения подкатегорий по ID категории
 * @param categoryId - ID основной категории (например, 1 для медитации, 2 для дыхания)
 */
export const getSubcategoriesByCategoryId = async (categoryId: number) => {
	try {
		// console.log("🔍 Запрос данных для category_id:", categoryId);
		// console.log("🔗 Supabase URL:", process.env.EXPO_PUBLIC_SUPABASE_URL ? "✅ Настроен" : "❌ Не настроен");

		const { data, error, status, statusText } = await supabase
			.from("subcategories")
			.select("id, title, duration, color, image")
			.eq("category_id", categoryId)
			.order("id", { ascending: true });

		// console.log("📊 Статус ответа:", status, statusText);

		if (error) {
			console.error("❌ Ошибка Supabase:", error);
			console.error("   Код:", error.code);
			console.error("   Сообщение:", error.message);
			console.error("   Детали:", error.details);
			console.error("   Подсказка:", error.hint);
			return [];
		}

		// console.log("✅ Данные успешно получены:", data);
		// console.log("📦 Количество записей:", data?.length || 0);

		return data || [];
	} catch (err) {
		console.error("❌ Непредвиденная ошибка:", err);
		if (err instanceof Error) {
			console.error("   Сообщение:", err.message);
			console.error("   Стек:", err.stack);
		}
		return [];
	}
};
