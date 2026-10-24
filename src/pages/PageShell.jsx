import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav.jsx'
import './PageShell.css'

export default function PageShell({ title }) {
  return (
    <div className="page">
      <div className="frame frame--page">
        <SiteNav />
        <main className="page-card">
          <p className="page-kicker">Placeholder page</p>
          <h1>{title}</h1>
          <p>This page is a placeholder. Content for {title} will go here.</p>
          <Link to="/" className="back">
            Back to Home
          </Link>
        </main>
      </div>
    </div>
  )
}