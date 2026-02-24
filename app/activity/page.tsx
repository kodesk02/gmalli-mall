import React from "react";
import Image from "next/image";
import ActivityCard from "@/components/cards/ActivityCard";
import { ACTIVITIES } from "@/lib/products";

export default function page() {
  return (
    <div>
      <div className="relative w-full h-60 ">
        <Image
          src={"/images/snooker.jpg"}
          alt={""}
          fill
          priority
          className="object-cover"
        />

        <div className="inset-0 absolute backdrop-blur-lg bg-(--red)/20"></div>

        <div className="inset-0 absolute flex items-center justify-center">
          <h1 className="font-bold text-6xl text-(--cream)">Activities</h1>
        </div>
      </div>

      <div className="md:p-20 p-10 space-y-6">
        {ACTIVITIES.map((activity, index) => (
          <ActivityCard
            key={index}
            name={activity.name}
            description={activity.description}
            imageSrc={activity.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}
