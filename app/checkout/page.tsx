// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  MapPin, 
  Store, 
  CreditCard, 
  Truck, 
  ShieldCheck,
  ChevronRight,
  Package
} from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type FulfillmentType = "delivery" | "walkin" | null;
type PaymentMethod = "paystack" | "transfer" | null;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalItems } = useCart();
  const [step, setStep] = useState<"review" | "fulfillment" | "payment" | "processing">("review");
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    state: "",
    phone: "",
  });

  const subtotal = totalPrice;
  const deliveryFee = fulfillmentType === "delivery" ? 2500 : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-(--cream) flex items-center justify-center">
        <div className="text-center space-y-4">
          <Package size={64} className="text-(--red)/20 mx-auto" />
          <h2 className="text-2xl font-bold text-(--red)" style={{ fontFamily: "var(--font-aboreto)" }}>
            Your cart is empty
          </h2>
          <button
            onClick={() => router.push("/")}
            className="text-(--red) font-semibold hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setStep("processing");
    // Simulate Paystack integration
    setTimeout(() => {
      if (fulfillmentType === "walkin") {
        router.push(`/checkout/success?type=walkin&code=${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
      } else {
        router.push(`/checkout/success?type=delivery&order=${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-(--cream) text-(--red)" style={{ fontFamily: "var(--font-red-rose)" }}>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-(--cream) border-b-2 border-(--red)/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="flex items-center gap-2 text-(--red) hover:opacity-70 transition-opacity font-semibold"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </motion.button>
            
            <div className="h-6 w-px bg-(--red)/30" />
            
            <div>
              <h1 
                className="text-2xl md:text-3xl font-bold text-(--red)"
                style={{ fontFamily: "var(--font-aboreto)" }}
              >
                Checkout
              </h1>
              <div className="flex items-center gap-2 text-sm text-(--red)/60 mt-1">
                <span className={step === "review" ? "font-bold text-(--red)" : ""}>Review</span>
                <ChevronRight size={14} />
                <span className={step === "fulfillment" ? "font-bold text-(--red)" : ""}>Delivery</span>
                <ChevronRight size={14} />
                <span className={step === "payment" ? "font-bold text-(--red)" : ""}>Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {step === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-(--red)" style={{ fontFamily: "var(--font-aboreto)" }}>
                    Review Items ({totalItems})
                  </h2>
                  
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        className="flex gap-4 bg-white rounded-xl p-4 border-2 border-(--red)/10"
                      >
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-(--cream) flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-(--red)/50 font-medium">{item.brand}</p>
                          <h3 className="font-bold text-(--red)">{item.name}</h3>
                          <p className="text-lg font-bold text-(--red) mt-2">N{item.price} × {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-(--red)">N{item.price * item.quantity}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep("fulfillment")}
                    className="w-full py-4 bg-(--red) text-(--cream) rounded-xl font-bold text-lg hover:bg-(--red)/90 transition-colors shadow-lg shadow-(--red)/20"
                  >
                    Continue to Delivery Options
                  </motion.button>
                </motion.div>
              )}

              {step === "fulfillment" && (
                <motion.div
                  key="fulfillment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-(--red)" style={{ fontFamily: "var(--font-aboreto)" }}>
                    Choose Fulfillment Method
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Walk-in Option */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFulfillmentType("walkin")}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${
                        fulfillmentType === "walkin"
                          ? "border-(--red) bg-(--red)/5 shadow-lg shadow-(--red)/10"
                          : "border-(--red)/10 bg-white hover:border-(--red)/30"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-(--red)/10 flex items-center justify-center mb-4">
                        <Store className="text-(--red)" size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-(--red) mb-2">Walk-in Pickup</h3>
                      <p className="text-sm text-(--red)/60 mb-4">
                        Pick up your order at our store. No delivery fee.
                      </p>
                      <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                        <ShieldCheck size={16} />
                        <span>Free</span>
                      </div>
                    </motion.button>

                    {/* Delivery Option */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFulfillmentType("delivery")}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${
                        fulfillmentType === "delivery"
                          ? "border-(--red) bg-(--red)/5 shadow-lg shadow-(--red)/10"
                          : "border-(--red)/10 bg-white hover:border-(--red)/30"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-(--red)/10 flex items-center justify-center mb-4">
                        <Truck className="text-(--red)" size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-(--red) mb-2">Home Delivery</h3>
                      <p className="text-sm text-(--red)/60 mb-4">
                        We&apos;ll deliver to your doorstep within 2-4 business days.
                      </p>
                      <div className="flex items-center gap-2 text-(--red) font-semibold text-sm">
                        <MapPin size={16} />
                        <span>N2,500</span>
                      </div>
                    </motion.button>
                  </div>

                  {fulfillmentType === "delivery" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-white rounded-2xl p-6 border-2 border-(--red)/10 space-y-4"
                    >
                      <h3 className="font-bold text-(--red) flex items-center gap-2">
                        <MapPin size={18} />
                        Delivery Address
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Street Address"
                          value={deliveryAddress.street}
                          onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-(--red)/20 focus:border-(--red) outline-none bg-(--cream) text-(--red) placeholder:text-(--red)/40"
                        />
                        <input
                          type="text"
                          placeholder="City"
                          value={deliveryAddress.city}
                          onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-(--red)/20 focus:border-(--red) outline-none bg-(--cream) text-(--red) placeholder:text-(--red)/40"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={deliveryAddress.state}
                          onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-(--red)/20 focus:border-(--red) outline-none bg-(--cream) text-(--red) placeholder:text-(--red)/40"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={deliveryAddress.phone}
                          onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-(--red)/20 focus:border-(--red) outline-none bg-(--cream) text-(--red) placeholder:text-(--red)/40"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep("review")}
                      className="px-6 py-4 rounded-xl border-2 border-(--red)/20 text-(--red) font-semibold hover:bg-(--red)/5 transition-colors"
                    >
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep("payment")}
                      disabled={!fulfillmentType || (fulfillmentType === "delivery" && (!deliveryAddress.street || !deliveryAddress.phone))}
                      className="flex-1 py-4 bg-(--red) text-(--cream) rounded-xl font-bold text-lg hover:bg-(--red)/90 transition-colors shadow-lg shadow-(--red)/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Payment
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-(--red)" style={{ fontFamily: "var(--font-aboreto)" }}>
                    Payment Method
                  </h2>

                  <div className="space-y-4">
                    {/* Paystack Option */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setPaymentMethod("paystack")}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                        paymentMethod === "paystack"
                          ? "border-(--red) bg-(--red)/5 shadow-lg shadow-(--red)/10"
                          : "border-(--red)/10 bg-white hover:border-(--red)/30"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="text-blue-600" size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-(--red)">Pay with Paystack</h3>
                        <p className="text-sm text-(--red)/60">Card, Bank Transfer, USSD, or Mobile Money</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "paystack" ? "border-(--red) bg-(--red)" : "border-(--red)/30"
                      }`}>
                        {paymentMethod === "paystack" && <div className="w-3 h-3 rounded-full bg-white" />}
                      </div>
                    </motion.button>

                    {/* Bank Transfer Option */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setPaymentMethod("transfer")}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                        paymentMethod === "transfer"
                          ? "border-(--red) bg-(--red)/5 shadow-lg shadow-(--red)/10"
                          : "border-(--red)/10 bg-white hover:border-(--red)/30"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="text-green-600" size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-(--red)">Bank Transfer</h3>
                        <p className="text-sm text-(--red)/60">Transfer to our corporate account</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "transfer" ? "border-(--red) bg-(--red)" : "border-(--red)/30"
                      }`}>
                        {paymentMethod === "transfer" && <div className="w-3 h-3 rounded-full bg-white" />}
                      </div>
                    </motion.button>
                  </div>

                  {paymentMethod === "transfer" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200 space-y-3"
                    >
                      <h3 className="font-bold text-amber-800">Bank Account Details</h3>
                      <div className="space-y-2 text-amber-900">
                        <p><span className="font-semibold">Bank:</span> First Bank of Nigeria</p>
                        <p><span className="font-semibold">Account Number:</span> 0123456789</p>
                        <p><span className="font-semibold">Account Name:</span> Your Store Name Ltd</p>
                      </div>
                      <p className="text-sm text-amber-700 mt-4">
                        Please use your order ID as reference. Your order will be processed after payment confirmation.
                      </p>
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep("fulfillment")}
                      className="px-6 py-4 rounded-xl border-2 border-(--red)/20 text-(--red) font-semibold hover:bg-(--red)/5 transition-colors"
                    >
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      disabled={!paymentMethod}
                      className="flex-1 py-4 bg-(--red) text-(--cream) rounded-xl font-bold text-lg hover:bg-(--red)/90 transition-colors shadow-lg shadow-(--red)/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CreditCard size={20} />
                      {paymentMethod === "transfer" ? "I've Made the Transfer" : "Pay Now"}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 space-y-6"
                >
                  <div className="w-16 h-16 border-4 border-(--red)/20 border-t-(--red) rounded-full animate-spin" />
                  <p className="text-xl font-bold text-(--red)">Processing your order...</p>
                  <p className="text-(--red)/60">Please do not close this window</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border-2 border-(--red)/10 space-y-4">
              <h3 
                className="text-lg font-bold text-(--red) pb-4 border-b-2 border-(--red)/10"
                style={{ fontFamily: "var(--font-aboreto)" }}
              >
                Order Summary
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-(--red)/60">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>N{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-(--red)/60">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? "Free" : `N${deliveryFee.toLocaleString()}`}</span>
                </div>
                {fulfillmentType === "walkin" && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Pickup Discount</span>
                    <span>-N500</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t-2 border-(--red)/10">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-(--red)">Total</span>
                  <span 
                    className="text-2xl font-bold text-(--red)"
                    style={{ fontFamily: "var(--font-aboreto)" }}
                  >
                    N{(fulfillmentType === "walkin" ? total - 500 : total).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-(--red)/40 mt-2">Including VAT where applicable</p>
              </div>

              {fulfillmentType && (
                <div className="pt-4 border-t-2 border-(--red)/10 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-(--red)/60">
                    {fulfillmentType === "walkin" ? <Store size={16} /> : <Truck size={16} />}
                    <span className="capitalize">{fulfillmentType === "walkin" ? "Walk-in Pickup" : "Home Delivery"}</span>
                  </div>
                  {paymentMethod && (
                    <div className="flex items-center gap-2 text-sm text-(--red)/60">
                      <CreditCard size={16} />
                      <span className="capitalize">{paymentMethod === "paystack" ? "Paystack" : "Bank Transfer"}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
