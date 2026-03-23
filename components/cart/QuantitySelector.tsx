// components/cart/QuantitySelector.tsx
"use client";

import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-(--cream) rounded-lg border border-(--red)/20">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onDecrease}
        disabled={quantity <= min}
        className="p-2 hover:bg-(--red)/10 rounded-md transition-colors disabled:opacity-30"
      >
        <Minus size={14} className="text-(--red)" />
      </motion.button>
      <span className="text-sm font-bold text-(--red) w-8 text-center">
        {quantity}
      </span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onIncrease}
        disabled={quantity >= max}
        className="p-2 hover:bg-(--red)/10 rounded-md transition-colors disabled:opacity-30"
      >
        <Plus size={14} className="text-(--red)" />
      </motion.button>
    </div>
  );
}