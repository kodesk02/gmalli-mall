import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function ExploreComponent() {
  const houseHold = [
    {
      id: 1,
      image: "/images/fryingpan.jpg",
      name: "frying pan",
    },
    {
      id: 2,
      name: "airfryer",
      image: "/images/airfryer.jpg",
    },
    {
      id: 3,
      name: "iron",
      image: "/images/iron.png",
    },
  ];

  const skinCare = [
    {
      id: 1,
      image: "/images/oriflame4.png",
      name: "oriflame",
    },
    {
      id: 2,
      image: "/images/oriflame2.png",
      name: "oriflame",
    },
    {
      id: 3,
      image: "/images/oriflame3.png",
      name: "oriflame",
    },
  ];

  return (
    <section className="w-full overflow-hidden">
      <h1 className="text-center text-3xl py-10">EXPLORE</h1>
      <div className="flex flex-col md:gap-40">
        <div className="block h-[50vh] md:h-[60vh] md:grid grid-cols-6 gap-6">
          <div className="relative col-span-2">
            <Image
              src={"/images/household.jpg"}
              alt={"shoppingcart"}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-(--red)/30 hover:bg-(--green)/30 " />
          </div>
          <div className="col-span-4">
            <div className="flex flex-col h-full gap-10">
              <div className="flex px-4 py-6 md:py-8 md:px-20 justify-between items-center">
                <div>
                  <h1 className="text-2xl">HouseHold Essentials</h1>
                </div>

                <div className="flex justify-end items-end">
                  <Icon
                    icon={"ep:arrow-right"}
                    width="24"
                    height="24"
                    className="text-(--red)"
                  />
                </div>
              </div>

              {/* bottom grid */}

              <div className="grid h-full grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {houseHold.map((house) => (
                  <div key={house.id} className="flex justify-center relative">
                    <Image
                      src={house.image}
                      alt={house.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-fill rounded-md"
                    />
                    <div className="absolute inset-0 bg-(--red)/30 hover:bg-(--green)/30 " />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="block h-[50vh] md:h-[60vh] md:grid grid-cols-6 gap-6">
          <div className="col-span-4">
            <div className="flex flex-col h-full gap-10">
              <div className="flex px-4 py-6 md:py-8 md:px-20 justify-between items-center">
                <div>
                  <h1 className="text-2xl">Oriflame Products</h1>
                </div>

                <div className="flex justify-end items-end">
                  <Icon
                    icon={"ep:arrow-right"}
                    width="24"
                    height="24"
                    className="text-(--red)"
                  />
                </div>
              </div>

              {/* bottom grid */}
              <div className="grid h-full grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {skinCare.map((skin) => (
                  <div key={skin.id} className="flex justify-center relative">
                    <Image
                      src={skin.image}
                      alt={skin.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-(--red)/30 hover:bg-(--green)/30 " />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative col-span-2">
            <Image
              src={"/images/oriflame1.png"}
              alt={"shoppingcart"}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-(--red)/30 hover:bg-(--green)/30 " />
          </div>
        </div>
      </div>
    </section>
  );
}
