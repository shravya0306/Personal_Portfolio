
import { Link, NavLink } from 'react-router-dom'
import './SiteNav.css'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function SiteNav({
  typedName = '',
  typingDone = false,
}) {
  return (
    <nav
      className="card card--beige nav"
      data-anim="card"
      aria-label="Primary"
    >
      <Link
        to="/"
        className="logo"
        data-anim="text"
        aria-label="Shravya Somayaji"
      >
        {typedName}
        {!typingDone && (
          <span className="typing-cursor" aria-hidden="true">
            |
          </span>
        )}
      </Link>

      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} data-anim="text">
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
