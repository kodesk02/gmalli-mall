import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-full transition-all duration-200 font-light",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",

        {
          "bg-(--red) text-(--cream) hover:bg-(--cream)/80 hover:border hover:border-(--red) hover:text-(--red)":
            variant === "primary",

          "bg-[--cream] text-black hover:bg-[--cream]/80":
            variant === "secondary",

          "border border-(--red) bg-(--cream) text-(--red) hover:bg-(--red) hover:text-(--cream)":
            variant === "outline",
        },

        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
