import React from "react";
import Image from "next/image";

type ActivityCardProps = {
  name: string;
  description: string;
  imageSrc: string;
};

export default function ActivityCard({
  name,
  description,
  imageSrc,
}: ActivityCardProps) {
  return (
    <div className="md:grid block grid-cols-[80px_1fr] gap-6 items-center md:items-start py-4">
      {/* Small Image */}
      <div className="relative w-20 h-20">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Content Side */}
      <div className="flex flex-col mt-2">
        <h2 className="font-semibold text-(--red)/80 text-lg">{name}</h2>
        <p className="text-(--red)/40 text-sm mt-1">{description}</p>

        {/* Separator */}
        <div className="border-b border-(--red)/10 mt-4"></div>
      </div>
    </div>
  );
}