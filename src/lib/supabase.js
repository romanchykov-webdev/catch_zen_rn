import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	console.error("❌ Ошибка: Переменные окружения Supabase не настроены!");
	console.error("Создайте файл .env с EXPO_PUBLIC_SUPABASE_URL и EXPO_PUBLIC_SUPABASE_ANON_KEY");
	console.error("Текущие значения:");
	console.error("  URL:", supabaseUrl ? "✅" : "❌");
	console.error("  Key:", supabaseAnonKey ? "✅ (скрыт)" : "❌");
}
// else {
// 	console.log("✅ Supabase клиент инициализирован");
// 	console.log("🔗 URL:", supabaseUrl.substring(0, 30) + "...");
// }

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
