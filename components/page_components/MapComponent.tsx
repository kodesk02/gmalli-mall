"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../buttons/Button";
import { Icon } from "@iconify/react";

export default function StoreHero() {
  const [showMap, setShowMap] = useState(false);

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <Image
        src="/images/shoppingcart.jpg"
        alt="Gmailli Store"
        fill
        priority
        className={`object-cover transition-opacity duration-700 ${
          showMap ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-(--red)/40" />

      <Image
        src="/images/go.png"
        alt="Store Map"
        fill
        className={`object-cover transition-opacity duration-700 ${
          showMap ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Content Layer */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        {/* Welcome State */}
        <div
          className={`text-center text-white transition-all duration-500 ${
            showMap
              ? "opacity-0 translate-y-4 pointer-events-none"
              : "opacity-100 translate-y-0"
          }`}
        >
          <h1 className="text-3xl md:text-5xl font-light tracking-wide">
            Come to Gmalli Stores
          </h1>

          <p className="mt-3 text-base md:text-lg opacity-90">
            Everything you need, in one place
          </p>

          <Button size="md" onClick={() => setShowMap(true)} className="mt-6">
            Visit Our Store
          </Button>
        </div>

        {/* Map State – Back Button */}
        <div
          className={`absolute top-4 left-4 transition-opacity duration-500 ${
            showMap ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Icon
            onClick={() => setShowMap(false)}
            icon={"material-symbols-light:arrow-back-ios-rounded"}
            width="24"
            height="24"
            className="text-(--cream)"
          />
        </div>
      </div>
    </section>
  );
}
