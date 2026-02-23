"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  // Star, ShoppingCart,
  PackageX,
} from "lucide-react";
import CategoryFilter, {
  FilterState,
} from "@/components/page_components/CategoryFilter";
import {
  getProductsByCategory,
  getFilterOptionsForCategory,
  Product,
} from "@/lib/products";

// const priceRangeOrder = { Low: 1, Mid: 2, Sale: 3 };

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();

  const rawCategory = params?.category as string;
  const category = decodeURIComponent(rawCategory ?? "");

  const products = useMemo(() => getProductsByCategory(category), [category]);
  const filterOptions = useMemo(
    () => getFilterOptionsForCategory(category),
    [category],
  );

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    brands: [],
    tags: [],
    priceRanges: [],
    inStockOnly: false,
  });

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (
        activeFilters.brands.length > 0 &&
        !activeFilters.brands.includes(p.brand)
      )
        return false;
      if (
        activeFilters.tags.length > 0 &&
        !activeFilters.tags.some((tag) => p.tags.includes(tag))
      )
        return false;
      if (
        activeFilters.priceRanges.length > 0 &&
        !activeFilters.priceRanges.includes(p.priceRange)
      )
        return false;
      if (activeFilters.inStockOnly && !p.inStock) return false;
      return true;
    });
  }, [products, activeFilters]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div
      className="min-h-screen bg-(--cream) text-(--red) w-full"
      style={{ fontFamily: "var(--font-red-rose)" }}
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-(--cream) border-b-2 border-(--red)/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          {/* Top row: back + title */}
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="flex items-center gap-2 text-(--red) hover:opacity-70 transition-opacity font-semibold cursor-pointer"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </motion.button>

            <div className="h-6 w-px bg-(--red)/30" />

            <div>
              <h1
                className="text-2xl md:text-3xl font-bold text-(--red) leading-tight"
                style={{ fontFamily: "var(--font-aboreto)" }}
              >
                {category}
              </h1>
              <p className="text-sm text-(--red)/60 mt-0.5">
                {filteredProducts.length} of {products.length} product
                {products.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Filter row */}
          <CategoryFilter
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            onFiltersChange={setActiveFilters}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            >
              <PackageX size={64} className="text-(--red)/30" />
              <h2
                className="text-2xl font-bold text-(--red)/50"
                style={{ fontFamily: "var(--font-aboreto)" }}
              >
                No products found
              </h2>
              <p className="text-(--red)/40 max-w-xs">
                Try adjusting your filters to see more results.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variants={cardVariants}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  variants,
}: {
  product: Product;
  variants: object;
}) {
  const priceRangeColors: Record<string, string> = {
    Low: "bg-green-100 text-green-700",
    Mid: "bg-amber-100 text-amber-700",
    Sale: "bg-red-100 text-red-700",
  };

  return (
    <motion.div
      layout
      variants={variants}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-backGround rounded-2xl overflow-hidden border-2 border-(--red)/10 hover:border-(--green)/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-(--cream)">
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading="lazy"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-(--red)/10 group-hover:bg-(--red)/5 transition-all duration-300" />

        {/* Out of stock badge */}
        {!product.inStock && (
          <div className="absolute top-2 left-2 bg-gray-800/80 text-white text-xs px-2 py-1 rounded-full font-semibold backdrop-blur-sm">
            Out of Stock
          </div>
        )}

        {/* Price range badge */}
        <div
          className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-semibold ${priceRangeColors[product.priceRange]}`}
        >
          {product.priceRange}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs text-(--red)/50 font-medium">{product.brand}</p>
          <h3 className="text-sm font-bold text-(--red) leading-tight line-clamp-2 mt-0.5">
            {product.name}
          </h3>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-(--red)/10 text-(--red) px-2 py-0.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div>
            <span className="text-lg font-bold text-(--red)">
              N{product.price.toFixed(2)}
            </span>
          </div>
          {/* <div className="flex items-center gap-1 text-(--red)/60">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div> */}
        </div>

        {/* Add to cart button */}
        {/* <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={!product.inStock}
          className="w-full mt-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-(--red) text-(--cream) text-sm font-semibold hover:bg-(--red)/85 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ShoppingCart size={14} />
          <span>{product.inStock ? "Add to Cart" : "Unavailable"}</span>
        </motion.button> */}
      </div>
    </motion.div>
  );
}
