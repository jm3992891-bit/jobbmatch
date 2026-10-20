import React from "react";

export function LaboraIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Diagonal top-right pill accent in dark teal */}
      <rect
        x="20"
        y="5"
        width="10"
        height="20"
        rx="5"
        transform="rotate(45 20 5)"
        fill="#005B52"
      />
      {/* Lower L-shaped folded pill in vibrant cyan/mint */}
      <path
        d="M8 12C8 7.58172 11.5817 4 16 4C20.4183 4 24 7.58172 24 12V24H32C36.4183 24 40 27.5817 40 32C40 36.4183 36.4183 40 32 40H16C11.5817 40 8 36.4183 8 32V12Z"
        fill="#00D494"
      />
    </svg>
  );
}

export default function LaboraLogo({
  variant = "dark",
  className = "",
  iconSize = "w-8 h-8",
  textSize = "text-2xl",
}: {
  variant?: "dark" | "light";
  className?: string;
  iconSize?: string;
  textSize?: string;
}) {
  const textColor = variant === "light" ? "text-white" : "text-[#06182B]";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LaboraIcon className={iconSize} />
      <span className={`font-black tracking-tight ${textSize} ${textColor}`}>
        Labora
      </span>
    </div>
  );
}
