import Link from "next/link";
import React from "react";
import { Textarea } from "../ui/textarea";
import Button from "../buttons/Button";
import { Label } from "@radix-ui/react-label";

export default function Footer() {
  return (
    <div
      style={{
        fontFamily: "var(--font-aboreto)",
      }}
      className="bg-(--red) text-(--cream) px-2 md:px-6 py-10"
    >
      <div className="flex flex-col justify-center items-center md:grid grid-cols-5 gap-4">
        <div className="flex order-2 flex-row md:flex-col gap-4">
          <Link href={"/products"}>Products</Link>
          <Link href={"/activity"}>Activities</Link>
          <Link href={"/"}>Contact Us</Link>
        </div>
        <div className="flex order-3 flex-col md:items-start items-center gap-4">
          <Link href={""}>kitandunnialli@gmail.com</Link>
          <Link href={""}>(+234) 9096641851</Link>
          <div></div>
          <div></div>
        </div>
        {/* The send email input  */}
        <div className="col-span-2 order-4 flex items-center flex-row md:flex-col gap-4">
          <div className="grid md:w-2/3 gap-2">
            <Label className="text-center">Send a message</Label>
            <Textarea
              className="border-(--cream) text-(--cream)"
              placeholder="Type your message here."
            />
            <Button className="border-(--cream) border mt-2">Send message</Button>
          </div>
        </div>
        {/* logo */}
        <div className="font-bold text-xl order-1">GMALLI</div>
      </div>
    </div>
  );
}
