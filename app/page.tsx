"use client";

import Button from "@/components/buttons/Button";
import ExploreComponent from "@/components/page_components/ExploreComponent";
import StoreHero from "@/components/page_components/MapComponent";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const productType = [
    {
      image: "/images/pepper.jpg",
      name: "Fresh Produce",
    },
    {
      image: "/images/frozenfood.jpg",
      name: "Frozen Produce",
    },
    {
      image: "/images/eggs.jpg",
      name: "Eggs",
    },
    {
      image: "/images/clothing.jpg",
      name: "Clothing",
    },
    {
      image: "/images/household.jpg",
      name: "Household Essentials",
    },
    {
      image: "/images/skincare.jpg",
      name: "Skincare",
    },
    {
      image: "/images/bodycare.jpg",
      name: "Bodycare",
    },
    {
      image: "/images/haircare.jpg",
      name: "Haircare",
    },
    {
      image: "/images/snacks.jpg",
      name: "Snacks",
    },
    {
      image: "/images/kitchenessentials.jpg",
      name: "Kitchen Essentials",
    },
  ];

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
      y: 0,
    },
  } as const;

  const fadeIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  } as const;

  const staggerContainer = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  const staleIn = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
      scale: 1,
    },
  } as const;

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  const slideInRight = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
      x: 0,
    },
  } as const;

  return (
    <div className="flex min-h-screen text-(--red)  w-screen bg-(--cream) font-aboreto">
      <main
        style={{
          fontFamily: "var(--font-red-rose)",
        }}
      >
        <div className="hidden md:grid grid-cols-3 gap-4 h-[80vh] text-center">
          <motion.div
            className="relative"
            initial="hidden"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            whileInView={"visible"}
            variants={slideInLeft}
          >
            <Image
              src={"/images/shoppingcart.jpg"}
              alt={"shoppingcart"}
              fill
              priority
              loading="lazy"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-(--red)/30" />
          </motion.div>

          <motion.div
            style={{
              fontFamily: "var(--font-aboreto)",
            }}
            className="flex items-center justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="flex-row">
              <motion.h1 variants={fadeIn} className="text-3xl mb-10">
                Welcome to Gmalli Stores
              </motion.h1>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => router.push("/")}
                >
                  Shop Now
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInRight}
            className="relative"
          >
            <Image
              loading="lazy"
              src={"/images/aisle.jpg"}
              alt={"aisle"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-(--red)/30" />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="flex md:hidden mt-6 text-center items-center justify-center"
        >
          <div
            style={{
              fontFamily: "var(--font-aboreto)",
            }}
          >
            <div className="flex-row">
              <h1 className="text-3xl mb-10">Welcome to Gmalli Stores</h1>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => router.push("/")}
                >
                  Shop Now
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="hidden md:grid grid-cols-5 py-10 px-4 mt-20 gap-4"
        >
          {productType.map((product) => (
            <motion.div
              key={product.name}
              className="flex flex-col items-center gap-2"
              variants={staleIn}
            >
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
                className="relative hover:scale-100 w-28 h-28 rounded-full overflow-hidden bg-(--cream)"
              >
                <Image
                  loading="lazy"
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-(--red)/30" />
              </motion.div>
              <div className="text-sm text-center ">
                <span>{product.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid md:hidden bg-(--red) text-(--cream) grid-cols-3 py-10 px-4 mt-20 gap-3 place-content-center"
        >
          {productType.map((product) => (
            <motion.div
              key={product.name}
              className="flex flex-col items-center gap-2"
              variants={staleIn}
            >
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
                className="relative hover:scale-100 w-15 h-15 rounded-full overflow-hidden bg-(--cream)"
              >
                <Image
                  loading="lazy"
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-(--red)/30" />
              </motion.div>
              <div className="text-sm text-center ">
                <span>{product.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <StoreHero />
        </motion.div>

        <motion.div
          className="py-0 md:py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <ExploreComponent />
        </motion.div>
      </main>
    </div>
  );
}
