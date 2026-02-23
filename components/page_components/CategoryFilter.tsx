"use client";

import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type FilterState = {
  brands: string[];
  tags: string[];
  priceRanges: string[];
  inStockOnly: boolean;
};

type FilterOptions = {
  brands: string[];
  tags: string[];
  priceRanges: string[];
};

type CategoryFilterProps = {
  filterOptions: FilterOptions;
  activeFilters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
};

export default function CategoryFilter({
  filterOptions,
  activeFilters,
  onFiltersChange,
}: CategoryFilterProps) {
  const totalActive =
    activeFilters.brands.length +
    activeFilters.tags.length +
    activeFilters.priceRanges.length +
    (activeFilters.inStockOnly ? 1 : 0);

  const toggle = (key: keyof Omit<FilterState, "inStockOnly">, value: string) => {
    const current = activeFilters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...activeFilters, [key]: updated });
  };

  const removeFilter = (key: keyof Omit<FilterState, "inStockOnly">, value: string) => {
    const current = activeFilters[key] as string[];
    onFiltersChange({
      ...activeFilters,
      [key]: current.filter((v) => v !== value),
    });
  };

  const clearAll = () => {
    onFiltersChange({ brands: [], tags: [], priceRanges: [], inStockOnly: false });
  };

  const chipVariants = {
    initial: { opacity: 0, scale: 0.8, x: -10 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.8, x: -10 },
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-wrap items-center gap-2">
        {/* Filter Dropdown Trigger */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-2 border-(--red) text-(--red) bg-transparent hover:bg-(--red) hover:text-(--cream) transition-all duration-200 rounded-full font-semibold px-4 py-2 cursor-pointer"
              style={{ fontFamily: "var(--font-red-rose)" }}
            >
              <SlidersHorizontal size={16} />
              <span>Filter</span>
              {totalActive > 0 && (
                <span className="ml-1 bg-(--red) text-(--cream) group-hover:bg-(--cream) group-hover:text-(--red) rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalActive}
                </span>
              )}
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 bg-(--cream) border-2 border-(--red) rounded-xl shadow-xl p-2"
            style={{ fontFamily: "var(--font-red-rose)" }}
          >
            {/* Price Range */}
            {filterOptions.priceRanges.length > 0 && (
              <>
                <DropdownMenuLabel className="text-(--red) font-bold text-xs uppercase tracking-wider px-2 py-1">
                  Price Range
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  {filterOptions.priceRanges.map((range) => (
                    <DropdownMenuCheckboxItem
                      key={range}
                      checked={activeFilters.priceRanges.includes(range)}
                      onCheckedChange={() => toggle("priceRanges", range)}
                      className="text-(--red) focus:bg-(--red)/10 focus:text-(--red) rounded-lg cursor-pointer"
                    >
                      {range} Price
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-(--red)/20 my-1" />
              </>
            )}

            {/* Brands */}
            {filterOptions.brands.length > 0 && (
              <>
                <DropdownMenuLabel className="text-(--red) font-bold text-xs uppercase tracking-wider px-2 py-1">
                  Brand
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  {filterOptions.brands.map((brand) => (
                    <DropdownMenuCheckboxItem
                      key={brand}
                      checked={activeFilters.brands.includes(brand)}
                      onCheckedChange={() => toggle("brands", brand)}
                      className="text-(--red) focus:bg-(--red)/10 focus:text-(--red) rounded-lg cursor-pointer"
                    >
                      {brand}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-(--red)/20 my-1" />
              </>
            )}

            {/* Tags */}
            {filterOptions.tags.length > 0 && (
              <>
                <DropdownMenuLabel className="text-(--red) font-bold text-xs uppercase tracking-wider px-2 py-1">
                  Tags
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  {filterOptions.tags.map((tag) => (
                    <DropdownMenuCheckboxItem
                      key={tag}
                      checked={activeFilters.tags.includes(tag)}
                      onCheckedChange={() => toggle("tags", tag)}
                      className="text-(--red) focus:bg-(--red)/10 focus:text-(--red) rounded-lg cursor-pointer"
                    >
                      {tag}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-(--red)/20 my-1" />
              </>
            )}

            {/* In Stock */}
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem
                checked={activeFilters.inStockOnly}
                onCheckedChange={(checked) =>
                  onFiltersChange({ ...activeFilters, inStockOnly: checked })
                }
                className="text-(--red) focus:bg-(--red)/10 focus:text-(--red) rounded-lg cursor-pointer font-semibold"
              >
                In Stock Only
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Active Filter Chips */}
        <AnimatePresence mode="popLayout">
          {activeFilters.priceRanges.map((range) => (
            <motion.button
              key={`price-${range}`}
              variants={chipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              onClick={() => removeFilter("priceRanges", range)}
              className="flex items-center gap-1.5 bg-(--red) text-(--cream) px-3 py-1.5 rounded-full text-sm font-medium hover:bg-(--red)/80 transition-all duration-200 cursor-pointer"
              style={{ fontFamily: "var(--font-red-rose)" }}
            >
              {range} Price
              <X size={12} strokeWidth={2.5} />
            </motion.button>
          ))}

          {activeFilters.brands.map((brand) => (
            <motion.button
              key={`brand-${brand}`}
              variants={chipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              onClick={() => removeFilter("brands", brand)}
              className="flex items-center gap-1.5 bg-(--red) text-(--cream) px-3 py-1.5 rounded-full text-sm font-medium hover:bg-(--red)/80 transition-all duration-200 cursor-pointer"
              style={{ fontFamily: "var(--font-red-rose)" }}
            >
              {brand}
              <X size={12} strokeWidth={2.5} />
            </motion.button>
          ))}

          {activeFilters.tags.map((tag) => (
            <motion.button
              key={`tag-${tag}`}
              variants={chipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              onClick={() => removeFilter("tags", tag)}
              className="flex items-center gap-1.5 bg-(--red) text-(--cream) px-3 py-1.5 rounded-full text-sm font-medium hover:bg-(--red)/80 transition-all duration-200 cursor-pointer"
              style={{ fontFamily: "var(--font-red-rose)" }}
            >
              {tag}
              <X size={12} strokeWidth={2.5} />
            </motion.button>
          ))}

          {activeFilters.inStockOnly && (
            <motion.button
              key="instock"
              variants={chipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              onClick={() =>
                onFiltersChange({ ...activeFilters, inStockOnly: false })
              }
              className="flex items-center gap-1.5 bg-(--red) text-(--cream) px-3 py-1.5 rounded-full text-sm font-medium hover:bg-(--red)/80 transition-all duration-200 cursor-pointer"
              style={{ fontFamily: "var(--font-red-rose)" }}
            >
              In Stock Only
              <X size={12} strokeWidth={2.5} />
            </motion.button>
          )}

          {totalActive > 1 && (
            <motion.button
              key="clear-all"
              variants={chipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              onClick={clearAll}
              className="flex items-center gap-1.5 border-2 border-(--red) text-(--red) px-3 py-1.5 rounded-full text-sm font-medium hover:bg-(--red)/10 transition-all duration-200 cursor-pointer underline underline-offset-2"
              style={{ fontFamily: "var(--font-red-rose)" }}
            >
              Clear all
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}