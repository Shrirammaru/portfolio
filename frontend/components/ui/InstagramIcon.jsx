// Instagram SVG icon — official shape
export default function InstagramIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Instagram"
    >
      {/* Outer rounded square */}
      <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5"
        stroke={color} strokeWidth="1.8" fill="none" />
      {/* Inner circle */}
      <circle cx="12" cy="12" r="4.5"
        stroke={color} strokeWidth="1.8" fill="none" />
      {/* Dot top-right */}
      <circle cx="17.5" cy="6.5" r="1.1" fill={color} />
    </svg>
  )
}
