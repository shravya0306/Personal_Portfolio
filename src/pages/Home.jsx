
import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import SiteNav from '../components/SiteNav.jsx'
import Portrait from '../components/Portrait.jsx'
import { Arrow, BioMark, Sunburst } from '../components/Icons.jsx'
import './Home.css'

const SECTION_ROWS = [
  { to: '/education', title: 'Education' },
  { to: '/experience', title: 'Experience' },
  { to: '/skills', title: 'Skills' },
  { to: '/achievements', title: 'Achievements' },
]

const MOCK_ROWS = [
  { label: 'Login', tone: 'login', width: '100%' },
  { label: 'Logout', tone: 'logout', width: '88%' },
  { label: 'Login', tone: 'login', width: '100%' },
  { label: 'Logout', tone: 'logout', width: '69%' },
]

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shravya-somayaji-38b051357',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/shravya0306',
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/shravya_ya1/',
  },
]

const FULL_NAME = 'Shravya Somayaji'

export default function Home() {
  const rootRef = useRef(null)
  const { key } = useLocation()
  const [typedName, setTypedName] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    window.scrollTo(0, 0)
    setTypedName('')
    setTypingDone(false)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedName(FULL_NAME)
      setTypingDone(true)
      return undefined
    }

    let nameTimer

    const ctx = gsap.context(() => {
      const portrait = root.querySelector('[data-anim="portrait"]')
      if (!portrait) return

      const cards = gsap.utils.toArray('[data-anim="card"]', root)
      const texts = gsap.utils.toArray('[data-anim="text"]', root)

      const rect = portrait.getBoundingClientRect()
      const dx =
        window.innerWidth / 2 - (rect.left + rect.width / 2)
      const dy =
        window.innerHeight / 2 - (rect.top + rect.height / 2)

      gsap.set(portrait, {
        x: dx,
        y: dy,
        scale: 1.15,
        opacity: 0,
      })

      gsap.set(cards, {
        opacity: 0,
        scale: 0.92,
      })

      gsap.set(texts, {
        opacity: 0,
        y: 18,
      })

      const timeline = gsap.timeline({
        onComplete: () => {
          gsap.set(
            [portrait, ...cards, ...texts],
            { clearProps: 'all' }
          )
        },
      })

      timeline
        .to(portrait, {
          opacity: 1,
          duration: 0.35,
          ease: 'power1.out',
        })
        .addLabel('move', '+=0.12')
        .to(
          portrait,
          {
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: 'power3.inOut',
          },
          'move'
        )
        .to(
          cards,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: { each: 0.06, from: 'start' },
          },
          'move+=0.35'
        )
        .to(
          texts,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            stagger: { amount: 0.5 },
          },
          '>+0.05'
        )
        .add(() => {
          let index = 0

          nameTimer = window.setInterval(() => {
            index += 1
            setTypedName(FULL_NAME.slice(0, index))

            if (index >= FULL_NAME.length) {
              window.clearInterval(nameTimer)
              setTypingDone(true)
            }
          }, 85)
        })
    }, root)

    return () => {
      window.clearInterval(nameTimer)
      ctx.revert()
    }
  }, [key])

  return (
    <div className="page" ref={rootRef}>
      <div className="frame">
        <SiteNav
          typedName={typedName}
          typingDone={typingDone}
        />

        <div className="main">
          <div className="left">
            <div className="row-a">
              <section
                className="card hero card--beige"
                data-anim="card"
              >
                <span className="sunburst" data-anim="text">
                  <Sunburst />
                </span>

                <h1 data-anim="text">
                  Let’s build smart, useful <em>software</em> together.
                </h1>
              </section>

              <Portrait />
            </div>

            <div className="row-b">
              <Link
                to="/about"
                className="card bio card--beige"
                data-anim="card"
              >
                <span className="bio-mark" data-anim="text">
                  <BioMark />
                </span>

                <p data-anim="text">
                  I’m Shravya, a Computer Science student at RV Institute
                  of Technology &amp; Management, also pursuing a BS in
                  Data Science and Applications at IITM. I build full-stack
                  web apps and I enjoy solving problems in data structures
                  and algorithms.
                </p>
              </Link>

              <Link
                to="/contact"
                className="card contact"
                data-anim="card"
              >
                <span className="contact-top">
                  <span className="contact-label" data-anim="text">
                    SAY
                    <br />
                    HELLO
                  </span>

                  <span className="contact-arrow" data-anim="text">
                    <Arrow size={18} />
                  </span>
                </span>

                <span className="contact-title" data-anim="text">
                  Contact <em>me</em>
                </span>
              </Link>
            </div>
          </div>

          <div className="right">
            <section
              className="card right-card card--beige"
              data-anim="card"
              aria-label="Portfolio sections"
            >
              <Link to="/projects" className="proj-link">
                <span className="row-head">
                  <span className="row-text" data-anim="text">
                    <span className="row-title">Projects</span>
                  </span>

                  <span className="row-arrow" data-anim="text">
                    <Arrow size={18} />
                  </span>
                </span>

                <span
                  className="mock"
                  data-anim="text"
                  aria-hidden="true"
                >
                  <span className="mock-bar">
                    <i />
                    <i />
                    <i />
                    <b>AUDIT LOG</b>
                  </span>

                  {MOCK_ROWS.map((row, index) => (
                    <span className="mock-row" key={index}>
                      <span className={`pill pill--${row.tone}`}>
                        {row.label}
                      </span>

                      <span className="track">
                        <i style={{ width: row.width }} />
                      </span>
                    </span>
                  ))}
                </span>
              </Link>

              {SECTION_ROWS.map((row) => (
                <Link
                  to={row.to}
                  className="row"
                  key={row.to}
                >
                  <span className="row-text" data-anim="text">
                    <span className="row-title">{row.title}</span>
                  </span>

                  <span className="row-arrow" data-anim="text">
                    <Arrow size={18} />
                  </span>
                </Link>
              ))}
            </section>

            <section
              className="card socials card--beige"
              data-anim="card"
              aria-label="Social links"
            >
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-anim="text"
                >
                  {social.label}
                </a>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
