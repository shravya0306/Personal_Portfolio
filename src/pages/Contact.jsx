
import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Contact.css'

const contactDetails = {
  email: 'somayajishravya@gmail.com',
  phone: '+91 8217566721',
  location: 'Bangalore, India',
}

const socialLinks = [
  {
    label: 'LINKEDIN',
    handle: 'shravya-somayaji',
    url: 'https://www.linkedin.com/in/shravya-somayaji-38b051357/',
  },
  {
    label: 'GITHUB',
    handle: 'shravya0306',
    url: 'https://github.com/shravya0306',
  },
  {
    label: 'LEETCODE',
    handle: 'shravya_yal',
    url: 'https://leetcode.com/u/shravya_ya1/',
  },
]

function CopyCard({ label, value, dark = false, email = false }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  useLayoutEffect(() => {
    return () => window.clearTimeout(timeoutRef.current)
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)

      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false)
      }, 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      className={`contact-info-card${dark ? ' dark' : ''}`}
      onClick={handleCopy}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleCopy()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Copy ${label.toLowerCase()}: ${value}`}
    >
      <span className="contact-card-top">
        <span className="contact-eyebrow">{label}</span>

        {email ? (
          <a
            className="contact-card-arrow"
            href={`mailto:${value}`}
            aria-label="Send an email"
            onClick={(event) => event.stopPropagation()}
          >
            ↗
          </a>
        ) : (
          <span className="contact-card-arrow" aria-hidden="true">
            ↗
          </span>
        )}
      </span>

      <span className="contact-info-value">{value}</span>

      <span
        className={`contact-copied${copied ? ' is-visible' : ''}`}
        aria-live="polite"
      >
        {copied ? 'Copied!' : 'Click to copy'}
      </span>
    </div>
  )
}

export default function Contact() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.contact-hero', {
        autoAlpha: 0,
        scale: 0.96,
      })

      gsap.set('.contact-headline-line span', {
        yPercent: 110,
      })

      gsap.set('.contact-email-pill', {
        autoAlpha: 0,
        y: 12,
      })

      gsap.set('.contact-info-card', {
        autoAlpha: 0,
        y: 18,
      })

      gsap.set('.contact-social-card', {
        autoAlpha: 0,
        y: 16,
      })

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      timeline
        .to('.contact-hero', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.55,
        })
        .to(
          '.contact-headline-line span',
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.18,
          },
          '-=0.15'
        )
        .to(
          '.contact-email-pill',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
          },
          '-=0.25'
        )
        .to(
          '.contact-info-card',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.08,
          },
          '-=0.05'
        )
        .to(
          '.contact-social-card',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.08,
          },
          '-=0.12'
        )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="contact-page" ref={pageRef}>
      <div className="contact-frame">
        <header className="contact-nav">
          <a className="contact-brand" href="/">
            Shravya <em>Somayaji</em>
          </a>

          <nav aria-label="Main navigation" className="about-nav-links">
              <a href="/">HOME</a>
              <a href="/about">ABOUT</a>
              <a href="/contact">CONTACT</a>
          </nav>
        </header>

        <section className="contact-hero">
          <p className="contact-eyebrow">CONTACT</p>

          <a
            className="contact-hero-arrow"
            href={`mailto:${contactDetails.email}`}
            aria-label="Email Shravya"
          >
            ↗
          </a>

          <div className="contact-hero-bottom">
            <h1 className="contact-headline">
              <span className="contact-headline-line">
                <span>Let's</span>{' '}
                <span className="contact-italic">talk.</span>
              </span>
            </h1>

            <a
              className="contact-email-pill"
              href={`mailto:${contactDetails.email}`}
            >
              <span>{contactDetails.email}</span>
              <span className="contact-pill-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </section>

        <section
          className="contact-info-grid"
          aria-label="Contact details"
        >
          <CopyCard
            label="EMAIL"
            value={contactDetails.email}
            email
          />

          <CopyCard
            label="PHONE"
            value={contactDetails.phone}
            dark
          />

          <div className="contact-info-card contact-location-card">
            <span className="contact-card-top">
              <span className="contact-eyebrow">LOCATION</span>
            </span>

            <span className="contact-info-value">
              {contactDetails.location}
            </span>
          </div>
        </section>

        <section
          className="contact-social-grid"
          aria-label="Social profiles"
        >
          {socialLinks.map((social) => (
            <a
              className="contact-social-card"
              href={social.url}
              target="_blank"
              rel="noreferrer"
              key={social.label}
            >
              <span className="contact-social-content">
                <span className="contact-eyebrow">
                  {social.label}
                </span>

                <span className="contact-social-handle">
                  {social.handle}
                </span>
              </span>

              <span
                className="contact-social-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          ))}
        </section>
      </div>
    </main>
  )
}
