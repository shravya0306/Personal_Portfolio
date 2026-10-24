export function Arrow({ size = 18 }) {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </svg>
    )
  }
  
  const RAY_COUNT = 22
  const RAYS = Array.from({ length: RAY_COUNT }, (_, i) => {
    const angle = (Math.PI * 2 * i) / RAY_COUNT
    const inner = 13
    const outer = i % 2 === 0 ? 34 : 27
    return {
      x1: (40 + inner * Math.cos(angle)).toFixed(1),
      y1: (40 + inner * Math.sin(angle)).toFixed(1),
      x2: (40 + outer * Math.cos(angle)).toFixed(1),
      y2: (40 + outer * Math.sin(angle)).toFixed(1),
    }
  })
  
  export function Sunburst() {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 80 80">
        {RAYS.map((ray, i) => (
          <line
            key={i}
            x1={ray.x1}
            y1={ray.y1}
            x2={ray.x2}
            y2={ray.y2}
            stroke="#7a6e58"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        <circle cx="40" cy="40" r="3" fill="#7a6e58" />
      </svg>
    )
  }
  
  export function BioMark() {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#7a6e58" strokeWidth="2" />
        <circle cx="20" cy="20" r="9" fill="#7a6e58" />
      </svg>
    )
  }