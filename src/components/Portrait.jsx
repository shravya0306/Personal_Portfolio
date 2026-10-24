import { useState } from 'react'
import { Link } from 'react-router-dom'

/*
  Shows /portrait.jpg (put your black-and-white photo in the `public` folder)
  and falls back to the placeholder from the reference design if it's missing.
*/
export default function Portrait() {
  const [loaded, setLoaded] = useState(false)

  return (
    <Link
      to="/about"
      className="card portrait"
      data-anim="portrait"
      aria-label="About Shravya Somayaji"
    >
      {!loaded && (
        <svg
          role="img"
          aria-label="Placeholder for Shravya's portrait"
          viewBox="0 0 333 459"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="333" height="459" fill="#55544f" />
          <path
            d="M10 459 C 24 380, 90 345, 166 340 C 242 345, 309 380, 323 459 Z"
            fill="#1f1e1c"
          />
          <rect x="144" y="260" width="44" height="90" fill="#77746e" />
          <ellipse cx="166" cy="185" rx="86" ry="112" fill="#1a1a18" />
          <ellipse cx="166" cy="205" rx="58" ry="74" fill="#8d8a83" />
          <text
            x="166"
            y="430"
            textAnchor="middle"
            fontFamily="DM Sans, sans-serif"
            fontSize="12"
            letterSpacing="2"
            fill="#b9ae98"
          >
            YOUR PHOTO HERE
          </text>
        </svg>
      )}
      <img
        src="/new4.jpg"
        alt="Portrait of Shravya Somayaji"
        style={{ display: loaded ? 'block' : 'none' }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
    </Link>
  )
}