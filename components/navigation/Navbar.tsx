"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      label: "Products",
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
        <div className="font-bold text-xl">GMALLI</div>

        <div className="hidden md:flex gap-10">
          {navLinks.map((nav) => (
            <Link className="hover:text-black" key={nav.label} href={nav.path}>{nav.label}</Link>
          ))}
        </div>

        {/* Links to whatsapp  */}
        <div className="hidden md:flex">
          <Link className="hover:text-black" href={"/"}>Contact Us</Link>
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
          <Link className="hover:text-black" href={"/"} onClick={() => setIsOpen(false)}>
            Products
          </Link>
          <Link className="hover:text-black" href={"/"} onClick={() => setIsOpen(false)}>
            Activities
          </Link>
          <Link className="hover:text-black" href={"/"} onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
