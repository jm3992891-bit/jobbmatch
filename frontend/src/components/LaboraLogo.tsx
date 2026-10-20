import React from "react";

export function LaboraIcon({
  className = "",
  size = 36,
  greenColor = "#05B378",
  tealDarkColor = "#005542",
}: {
  className?: string;
  size?: number;
  greenColor?: string;
  tealDarkColor?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 inline-block ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
      }}
    >
      {/* Diagonal top-right pill accent in dark teal */}
      <rect
        x="20"
        y="5"
        width="10"
        height="20"
        rx="5"
        transform="rotate(45 20 5)"
        fill={tealDarkColor}
      />
      {/* Lower L-shaped folded pill in vibrant green */}
      <path
        d="M8 12C8 7.58172 11.5817 4 16 4C20.4183 4 24 7.58172 24 12V24H32C36.4183 24 40 27.5817 40 32C40 36.4183 36.4183 40 32 40H16C11.5817 40 8 36.4183 8 32V12Z"
        fill={greenColor}
      />
    </svg>
  );
}

export default function LaboraLogo({
  variant = "dark",
  className = "",
  size = 36,
  textSize = "text-2xl",
}: {
  variant?: "dark" | "light";
  className?: string;
  size?: number;
  textSize?: string;
}) {
  const textColor = variant === "light" ? "text-white" : "text-[#08223A]";

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      <LaboraIcon size={size} greenColor="#05B378" tealDarkColor="#005542" />
      <span className={`font-black tracking-tight ${textSize} ${textColor}`}>
        Labora
      </span>
    </div>
  );
}
