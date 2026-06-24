"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Cookies from "js-cookie";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  in_stock: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// -----------------------------------------------
// Point to fast_server
// -----------------------------------------------
const API = process.env.NEXT_PUBLIC_API_URL;

// -----------------------------------------------
// Session ID — stored in a cookie for 7 days
// -----------------------------------------------
const getOrCreateSessionId = (): string => {
  let sessionId = Cookies.get("gmalli_session");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    Cookies.set("gmalli_session", sessionId, { expires: 7 });
  }
  return sessionId;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = useRef<string>("");
  const hasLoaded = useRef(false);

  // -----------------------------------------------
  // On mount: get session, load cart from fast_server
  // -----------------------------------------------
  useEffect(() => {
    sessionId.current = getOrCreateSessionId();

    const loadCart = async () => {
      try {
        const res = await fetch(
          `${API}/cart?sessionId=${sessionId.current}`  // ✅ fast_server
        );
        if (!res.ok) throw new Error("Failed to load cart");
        const data = await res.json();
        if (data.items?.length) setItems(data.items);
      } catch (err) {
        console.error("Cart load error:", err);
      } finally {
        hasLoaded.current = true;
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // -----------------------------------------------
  // Save cart to fast_server whenever items change
  // Debounced 500ms to avoid hammering the API
  // -----------------------------------------------
  useEffect(() => {
    if (!hasLoaded.current) return;

    const timeout = setTimeout(async () => {
      try {
        await fetch(
          `${API}/cart?sessionId=${sessionId.current}`, // ✅ fast_server
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items }),
          }
        );
      } catch (err) {
        console.error("Cart save error:", err);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [items]);

  // -----------------------------------------------
  // Cart actions
  // -----------------------------------------------
  const addToCart = useCallback((product: Omit<CartItem, "quantity">) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(async () => {
    setItems([]);
    try {
      await fetch(
        `${API}/cart?sessionId=${sessionId.current}`, // ✅ fast_server
        { method: "DELETE" }
      );
    } catch (err) {
      console.error("Cart clear error:", err);
    }
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}