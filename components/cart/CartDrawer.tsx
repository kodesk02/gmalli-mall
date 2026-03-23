// components/cart/CartDrawer.tsx
"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const router = useRouter();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-(--cream) z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-2 border-(--red)/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-(--red)" size={24} />
                <div>
                  <h2 
                    className="text-xl font-bold text-(--red)"
                    style={{ fontFamily: "var(--font-aboreto)" }}
                  >
                    Your Cart
                  </h2>
                  <p className="text-sm text-(--red)/60">{totalItems} items</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-(--red)/10 rounded-full transition-colors"
              >
                <X size={24} className="text-(--red)" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <ShoppingBag size={64} className="text-(--red)/20" />
                  <p className="text-(--red)/50 font-medium">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-(--red) font-semibold hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 bg-white rounded-xl p-3 border-2 border-(--red)/10"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-(--cream) flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-(--red)/50 font-medium">{item.brand}</p>
                      <h3 className="text-sm font-bold text-(--red) truncate">{item.name}</h3>
                      <p className="text-lg font-bold text-(--red) mt-1">N{item.price * item.quantity}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 bg-(--cream) rounded-lg border border-(--red)/20">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-(--red)/10 rounded-md transition-colors"
                          >
                            <Minus size={14} className="text-(--red)" />
                          </button>
                          <span className="text-sm font-bold text-(--red) w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-(--red)/10 rounded-md transition-colors"
                          >
                            <Plus size={14} className="text-(--red)" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-(--red)/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t-2 border-(--red)/10 p-6 space-y-4 bg-white">
                <div className="flex items-center justify-between text-(--red)">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-aboreto)" }}>
                    N{totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-(--red)/50">Shipping & taxes calculated at checkout</p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/checkout");
                  }}
                  className="w-full py-4 bg-(--red) text-(--cream) rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-(--red)/90 transition-colors shadow-lg shadow-(--red)/20"
                >
                  Checkout
                  <ArrowRight size={20} />
                </motion.button>
                
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-sm text-(--red)/60 hover:text-(--red) font-medium transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}