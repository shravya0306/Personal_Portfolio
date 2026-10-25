
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Achievements.css'

function CountUp({ target, decimals = 0, suffix = '', duration = 1 }) {
  const numberRef = useRef(null)

  useLayoutEffect(() => {
    const element = numberRef.current
    if (!element) return

    const counter = { value: 0 }

    const tween = gsap.to(counter, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = `${counter.value.toFixed(decimals)}${suffix}`
      },
    })

    return () => tween.kill()
  }, [target, decimals, suffix, duration])

  return <span ref={numberRef}>0{decimals ? `.${'0'.repeat(decimals)}` : ''}{suffix}</span>
}

export default function Achievements() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.achievement-card', {
        autoAlpha: 0,
        scale: 0.94,
      })

      gsap.set('.achievement-heading-word', {
        yPercent: 110,
      })

      gsap.set('.achievement-junior-word', {
        yPercent: 110,
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      timeline
        .to('.achievement-card', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.48,
          stagger: {
            each: 0.09,
            from: 'start',
          },
        })
        .to(
          '.achievement-heading-word',
          {
            yPercent: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          '-=0.2'
        )
        .to(
          '.achievement-junior-word',
          {
            yPercent: 0,
            duration: 0.7,
          },
          '-=0.25'
        )
        .to(
          '.achievement-junior-word',
          {
            fontStyle: 'italic',
            duration: 0.12,
            yoyo: true,
            repeat: 1,
          },
          '-=0.25'
        )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="achievements-page" ref={pageRef}>
      <div className="achievements-frame">
        <header className="achievements-nav">
          <a className="achievements-brand" href="/">
            Shravya <em>Somayaji</em>
          </a>

          <nav aria-label="Main navigation" className="about-nav-links">
              <a href="/">HOME</a>
              <a href="/about">ABOUT</a>
              <a href="/contact">CONTACT</a>
          </nav>
        </header>

        <div className="achievements-grid">
          <section className="achievement-card achievement-heading-card">
            <p className="achievement-eyebrow">ACHIEVEMENTS</p>

            <h1 className="achievement-heading">
              <span className="achievement-heading-line">
                <span className="achievement-heading-word">The</span>{' '}
                <span className="achievement-heading-word achievement-italic">
                  numbers
                </span>
              </span>
              <span className="achievement-heading-line">
                <span className="achievement-heading-word">so</span>{' '}
                <span className="achievement-heading-word">far.</span>
              </span>
            </h1>
          </section>

          <section className="achievement-card achievement-stat achievement-stat-cgpa">
            <div className="achievement-number">
              <CountUp target={9.32} decimals={2} duration={1} />
              <span className="achievement-denominator">/10</span>
            </div>
            <div className="achievement-stat-caption">
              CGPA at RV Institute of Technology &amp; Management
            </div>
          </section>

          <section className="achievement-card achievement-stat achievement-stat-maths">
            <div className="achievement-number">
              <CountUp target={100} duration={1.15} />
              <span className="achievement-denominator">/100</span>
            </div>
            <div className="achievement-stat-caption">
              in Mathematics, Pre-University
            </div>
          </section>

          <section className="achievement-card achievement-stat achievement-stat-pu">
            <div className="achievement-number">
              <CountUp target={95} suffix="%" duration={1.3} />
            </div>
            <div className="achievement-stat-caption">
              overall, Pre-University at Deeksha PU College
            </div>
          </section>

          <section className="achievement-card achievement-music-card">
            <div className="achievement-music-title">
              <span className="achievement-junior-clip">
                <span className="achievement-junior-word">Junior</span>
              </span>
            </div>

            <div className="achievement-stat-caption">
              Grade completed in Carnatic Music, with Senior Grade in progress
            </div>
          </section>

          <a className="achievement-card achievement-back" href="/">
            <span>BACK TO HOME</span>
            <span className="achievement-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </main>
  )
}
