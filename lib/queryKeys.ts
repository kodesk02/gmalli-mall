const products = ["products"] as const;

export const queryKeys = {
  products: {
    all: products,
    list: (filters: object) => [...products, "list", filters] as const,
    detail: (id: string) => [...products, "detail", id] as const,
    categories: [...products, "categories"] as const,
    filters: (category: string) => [...products, "filters", category] as const,
  },
};