function Logo({ width = "120px", height = "40px" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <circle cx="20" cy="20" r="18" fill="black" />
      <path
        d="M14 26 L26 14"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26 26 L14 14"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <text
        x="48"
        y="26"
        fill="black"
        fontFamily="'Segoe UI', sans-serif"
        fontWeight="600"
        fontSize="20"
        letterSpacing="0.5"
      >
        BlogApp
      </text>
    </svg>
  );
}

export default Logo;
