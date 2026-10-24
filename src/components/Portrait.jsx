
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Portrait() {
  const [loaded, setLoaded] = useState(false)

  return (
    <Link
      to="/about"
      className="card portrait"
      data-anim="portrait"
      aria-label="About Shravya Somayaji"
    >
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
