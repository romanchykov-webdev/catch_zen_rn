import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Данные считаются свежими  (для редко меняющегося контента)
			// staleTime: 60 * 60 * 1000, // 1 час
			staleTime: Infinity,
			// Кэш живет 24 часа в памяти
			gcTime: 24 * 60 * 60 * 1000, // 24 часа
			// Повторные запросы при ошибке
			retry: 2,
			// НЕ рефетчить при фокусе - данные редко меняются
			refetchOnWindowFocus: false,
			// Рефетч при переподключении сети (на случай если были офлайн)
			refetchOnReconnect: true,
			// НЕ перезапрашивать при каждом монтировании компонента
			refetchOnMount: false,
		},
	},
});
