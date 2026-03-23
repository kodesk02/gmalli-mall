// components/cart/EmptyCart.tsx
"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function EmptyCart() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center space-y-6"
    >
      <div className="w-24 h-24 rounded-full bg-(--red)/5 flex items-center justify-center">
        <ShoppingBag size={48} className="text-(--red)/20" />
      </div>
      <div>
        <h3 
          className="text-xl font-bold text-(--red) mb-2"
          style={{ fontFamily: "var(--font-aboreto)" }}
        >
          Your cart is empty
        </h3>
        <p className="text-(--red)/60 max-w-xs mx-auto">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-(--red) font-bold hover:gap-3 transition-all"
      >
        Start Shopping
        <ArrowRight size={18} />
      </motion.button>
    </motion.div>
  );
}