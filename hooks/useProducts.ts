import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { Product, ProductFilters } from "@/lib/products";

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () =>
      apiGet<Product[]>("/products", {
        category: filters.category,
        brand: filters.brand,
        tag: filters.tag,
        priceRange: filters.priceRange,
        inStock: filters.inStock ? "true" : undefined,
      }),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => apiGet<Product>(`/products/${id}`),
    enabled: !!id, 
  });
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.products.categories,
    queryFn: () => apiGet<string[]>("/products/categories"),
    staleTime: 10 * 60 * 1000,
  });
}

interface FilterOptions {
  brands: string[];
  priceRanges: string[];
  tags: string[];
}

export function useProductFilters(category?: string) {
  return useQuery({
    queryKey: queryKeys.products.filters(category ?? ""),
    queryFn: () => apiGet<FilterOptions>("/products/filters", { category }),
    enabled: !!category,
  });
}