"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="w-full overflow-hidden py-10">
      <motion.h1 
        className="text-center text-3xl py-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        EXPLORE
      </motion.h1>

      <div className="flex flex-col gap-10 md:gap-40">
        {/* Household Essentials Section */}
        <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
          {/* Large Image - Hidden on mobile */}
          <motion.div 
            className="hidden md:block relative col-span-2 h-[60vh]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInLeft}
          >
            <Image
              src={"/images/household.jpg"}
              alt={"household"}
              fill
              priority
              className="object-cover"
            />
            <motion.div 
              className="absolute inset-0 bg-(--red)/30"
              whileHover={{ backgroundColor: "rgba(0, 128, 0, 0.3)" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="flex flex-col h-full gap-6 md:gap-10">
              {/* Header */}
              <div className="flex px-4 py-6 md:py-8 md:px-20 justify-between items-center">
                <motion.div variants={fadeInUp}>
                  <h1 className="text-xl md:text-2xl">Household Essentials</h1>
                </motion.div>

                <motion.div 
                  className="flex justify-end items-end"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon
                    icon={"ep:arrow-right"}
                    width="24"
                    height="24"
                    className="text-(--red)"
                  />
                </motion.div>
              </div>

              {/* Product Grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-0"
                variants={staggerContainer}
              >
                {houseHold.map((house) => (
                  <motion.div 
                    key={house.id} 
                    className="relative h-40 md:h-48 overflow-hidden rounded-md"
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={house.image}
                      alt={house.name}
                      fill
                      className="object-cover rounded-md"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-(--red)/30"
                      whileHover={{ backgroundColor: "rgba(0, 128, 0, 0.3)" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Oriflame Products Section */}
        <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
          {/* Content Section - Order changed for mobile */}
          <motion.div 
            className="col-span-4 order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="flex flex-col h-full gap-6 md:gap-10">
              {/* Header */}
              <div className="flex px-4 py-6 md:py-8 md:px-20 justify-between items-center">
                <motion.div variants={fadeInUp}>
                  <h1 className="text-xl md:text-2xl">Oriflame Products</h1>
                </motion.div>

                <motion.div 
                  className="flex justify-end items-end"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon
                    icon={"ep:arrow-right"}
                    width="24"
                    height="24"
                    className="text-(--red)"
                  />
                </motion.div>
              </div>

              {/* Product Grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-0"
                variants={staggerContainer}
              >
                {skinCare.map((skin) => (
                  <motion.div 
                    key={skin.id} 
                    className="relative h-40 md:h-48 overflow-hidden rounded-md"
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={skin.image}
                      alt={skin.name}
                      fill
                      className="object-cover rounded-md"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-(--red)/30"
                      whileHover={{ backgroundColor: "rgba(0, 128, 0, 0.3)" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Large Image - Hidden on mobile */}
          <motion.div 
            className="hidden md:block relative col-span-2 h-[60vh] order-1 md:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInRight}
          >
            <Image
              src={"/images/oriflame1.png"}
              alt={"oriflame"}
              fill
              priority
              className="object-cover"
            />
            <motion.div 
              className="absolute inset-0 bg-(--red)/30"
              whileHover={{ backgroundColor: "rgba(0, 128, 0, 0.3)" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}