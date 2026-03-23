// components/cart/CartIcon.tsx
"use client";

import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 text-(--red) hover:bg-(--red)/10 rounded-full transition-colors"
    >
      <ShoppingBag size={24} />
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-(--red) text-(--cream) text-xs font-bold rounded-full flex items-center justify-center"
        >
          {totalItems > 9 ? "9+" : totalItems}
        </motion.span>
      )}
    </motion.button>
  );
}