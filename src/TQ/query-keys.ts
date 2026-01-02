/**
 * Централизованное хранилище всех query keys
 * Это помогает избежать опечаток и упрощает инвалидацию кэша
 */
// export const queryKeys = {
// 	subcategories: {
// 		all: ["subcategories"] as const,
// 		byCategory: (categoryId: number) => [...queryKeys.subcategories.all, "by-category", categoryId] as const,
// 		byId: (id: number | string) => [...queryKeys.subcategories.all, "by-id", id] as const,
// 	},
// } as const;
/**
 * Централизованное хранилище всех query keys
 * Это помогает избежать опечаток и упрощает инвалидацию кэша
 */
export const queryKeys = {
	subcategories: {
		all: ["subcategories"] as const,
		byCategory: (categoryId: number) => [...queryKeys.subcategories.all, "by-category", categoryId] as const,
		byCategoryInfinite: (categoryId: number) =>
			[...queryKeys.subcategories.all, "by-category-infinite", categoryId] as const,
		byId: (id: number | string) => [...queryKeys.subcategories.all, "by-id", id] as const,
	},
} as const;
