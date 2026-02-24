"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/products";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  const navLinks = [
    {
      label: "Category",
      path: "/products",
    },
    {
      label: "Activities",
      path: "/activity",
    },
  ];

  return (
    <nav
      style={{
        fontFamily: "var(--font-red-rose)",
        backgroundColor: "var(--cream)",
      }}
      className="text-xl text-(--red) font-light px-6 py-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <div className="font-bold text-xl">GMALLI</div>
        </Link>

        <div className="hidden md:flex gap-10 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 hover:text-black transition-colors focus:outline-none cursor-pointer">
                Category
                <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-52 bg-(--cream) border-2 border-(--red)/20 rounded-xl shadow-lg p-1 mt-2"
              style={{ fontFamily: "var(--font-red-rose)" }}
            >
              {categories.map((cat) => (
                <DropdownMenuItem key={cat} asChild>
                  <Link
                    href={`/category/${encodeURIComponent(cat)}`}
                    className="text-(--red) hover:bg-(--red)/80  rounded-lg px-3 py-2 text-sm font-medium cursor-pointer w-full"
                  >
                    {cat}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link className="hover:text-black transition-colors" href="/activity">
            Activities
          </Link>
        </div>

        {/* Links to whatsapp  */}
        <div className="hidden md:flex">
          <Link className="hover:text-black" href={"/"}>
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-5">
          <button
            className="flex items-center justify-between w-full hover:text-black transition-colors py-2 cursor-pointer"
            onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
          >
            Category
            <ChevronDown
              size={14}
              className={`
              transition-transform duration-200 ${mobileCategoryOpen ? "rotate-180" : ""} 
              `}
            />
          </button>

          {mobileCategoryOpen && (
            <div className="flex flex-col gap-0 pl-4 border-l-2 border-(--red)/20 mb-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${encodeURIComponent(cat)}`}
                  onClick={() => {
                    setIsOpen(false);
                    setMobileCategoryOpen(false);
                  }}
                  className="text-base py-2 hover:text-black transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}

          <Link
            className="hover:text-black transition-colors py-2"
            href="/activity"
            onClick={() => setIsOpen(false)}
          >
            Activities
          </Link>
          <Link
            className="hover:text-black"
            href={"/"}
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
