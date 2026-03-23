"use client";

import { Suspense } from "react";
import { OrderSuccessContent } from "./OrderSuccess";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}