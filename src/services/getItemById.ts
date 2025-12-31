import { supabase } from "../lib/supabase";

/**
 * Функция для получения одной конкретной подкатегории по ID
 * пригодится для экрана плеера
 */
export const getById = async (itemId: number | string) => {
	try {
		const id = typeof itemId === "string" ? parseInt(itemId, 10) : itemId;

		if (isNaN(id)) {
			console.error("❌ Некорректный ID:", itemId);
			return null;
		}

		// console.log("🔍 Запрос элемента с ID:", id);

		const { data, error } = await supabase.from("subcategories").select("*").eq("id", id).single();

		if (error) {
			console.error("❌ Ошибка при получении элемента:", error);
			console.error("   Код:", error.code);
			console.error("   Сообщение:", error.message);
			return null;
		}

		// console.log("✅ Элемент успешно получен:", data);
		return data;
	} catch (err) {
		console.error("❌ Непредвиденная ошибка:", err);
		return null;
	}
};
