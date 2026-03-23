// components/cart/PriceBreakdown.tsx
"use client";

interface PriceBreakdownProps {
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  total: number;
}

export default function PriceBreakdown({
  subtotal,
  deliveryFee,
  discount = 0,
  total,
}: PriceBreakdownProps) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between text-(--red)/60">
        <span>Subtotal</span>
        <span>N{subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-(--red)/60">
        <span>Delivery Fee</span>
        <span>{deliveryFee === 0 ? "Free" : `N${deliveryFee.toLocaleString()}`}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600 font-medium">
          <span>Discount</span>
          <span>-N{discount.toLocaleString()}</span>
        </div>
      )}
      <div className="pt-3 border-t-2 border-(--red)/10 flex justify-between items-center">
        <span className="font-bold text-(--red) text-base">Total</span>
        <span 
          className="text-2xl font-bold text-(--red)"
          style={{ fontFamily: "var(--font-aboreto)" }}
        >
          N{total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}