// app/checkout/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Copy, 
  MapPin, 
  Store, 
  Truck, 
  Clock, 
  Package,
  ArrowRight,
  QrCode
} from "lucide-react";
import { getNextWeekDate } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const { clearCart } = useCart();
  
  const type = searchParams.get("type") as "walkin" | "delivery";
  const pickupCode = searchParams.get("code");
  const orderId = searchParams.get("order");

  useEffect(() => {
    if (!type) {
      router.push("/");
    } else {
      // Clear cart on successful payment
      clearCart();
    }
  }, [type, router, clearCart]);

  const handleCopyCode = () => {
    if (pickupCode) {
      navigator.clipboard.writeText(pickupCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!type) return null;

  return (
    <div className="min-h-screen bg-(--cream) text-(--red) flex items-center justify-center p-4" style={{ fontFamily: "var(--font-red-rose)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white rounded-3xl p-8 md:p-12 border-2 border-(--red)/10 shadow-2xl shadow-(--red)/5 text-center space-y-6"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="text-green-600" size={48} />
        </motion.div>

        <div>
          <h1 
            className="text-3xl font-bold text-(--red) mb-2"
            style={{ fontFamily: "var(--font-aboreto)" }}
          >
            Payment Successful!
          </h1>
          <p className="text-(--red)/60">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {type === "walkin" ? (
          /* Walk-in Pickup Content */
          <div className="space-y-6">
            <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200 space-y-4">
              <div className="flex items-center justify-center gap-2 text-amber-800 font-bold mb-4">
                <Store size={20} />
                <span>Walk-in Pickup</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-amber-700">Your Pickup Code</p>
                <div className="flex items-center justify-center gap-3">
                  <code className="text-4xl font-bold text-amber-900 tracking-widest bg-white px-6 py-3 rounded-xl border-2 border-amber-300">
                    {pickupCode}
                  </code>
                  <button
                    onClick={handleCopyCode}
                    className="p-3 bg-amber-200 rounded-xl hover:bg-amber-300 transition-colors text-amber-800"
                  >
                    <Copy size={20} />
                  </button>
                </div>
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-600 font-medium"
                  >
                    Copied to clipboard!
                  </motion.p>
                )}
              </div>

              <div className="flex justify-center">
                <div className="w-32 h-32 bg-white rounded-xl p-2 border-2 border-amber-300">
                  {/* Placeholder for QR Code - in production, generate actual QR */}
                  <div className="w-full h-full bg-amber-100 rounded-lg flex items-center justify-center">
                    <QrCode className="text-amber-800" size={48} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-left bg-(--cream) rounded-xl p-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-(--red) flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-(--red)">Pickup Location</p>
                  <p className="text-sm text-(--red)/60">
                    123 Store Street, Lagos, Nigeria<br />
                    Mon-Sat: 9AM - 6PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-(--red) flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-(--red)">Valid Until</p>
                  <p className="text-sm text-(--red)/60">
                    {getNextWeekDate()}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-(--red)/60">
              Present this code or QR at the counter to collect your order.
            </p>
          </div>
        ) : (
          /* Delivery Content */
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200 space-y-4">
              <div className="flex items-center justify-center gap-2 text-blue-800 font-bold mb-4">
                <Truck size={20} />
                <span>Home Delivery</span>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-blue-700">Order ID</p>
                <code className="text-2xl font-bold text-blue-900 tracking-widest">
                  #{orderId}
                </code>
              </div>

              {/* Tracking Timeline */}
              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="text-white" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-blue-900">Order Confirmed</p>
                    <p className="text-sm text-blue-600">Just now</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                    <Package className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-blue-900">Processing</p>
                    <p className="text-sm text-blue-600">Estimated: Tomorrow</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Truck className="text-blue-400" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-blue-400">Out for Delivery</p>
                    <p className="text-sm text-blue-300">Pending</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-blue-400" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-blue-400">Delivered</p>
                    <p className="text-sm text-blue-300">Pending</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-(--cream) rounded-xl p-4 text-left space-y-3">
              <p className="font-semibold text-(--red)">Delivery Updates</p>
              <p className="text-sm text-(--red)/60">
                We&apos;ll send you SMS and email updates at each step. You can also track your order in real-time.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Track Order
              <ArrowRight size={18} />
            </motion.button>
          </div>
        )}

        <div className="pt-6 border-t-2 border-(--red)/10">
          <button
            onClick={() => router.push("/")}
            className="text-(--red) font-semibold hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
}