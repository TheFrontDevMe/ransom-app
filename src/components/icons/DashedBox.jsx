import React from "react";

export default function DashedBox(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-label="dashed-box"
      {...props}
    >
      <rect
        x="1"
        y="1"
        width="99%"
        height="99%"
        fill="none"
        stroke="#AFAFAF"
        strokeWidth="1"
        strokeDasharray="17 17"
        strokeLinecap="square"
      />
    </svg>
  );
}
