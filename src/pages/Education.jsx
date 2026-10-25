
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Education.css'

const topics = [
  'Probability',
  'Statistical pattern recognition',
  'Bayesian classification',
  'Regression',
  'Clustering',
  'Dimensionality reduction',
]

function CountUp({ target, decimals = 0, suffix = '' }) {
  const numberRef = useRef(null)

  useLayoutEffect(() => {
    const element = numberRef.current
    if (!element) return

    const counter = { value: 0 }
    const tween = gsap.to(counter, {
      value: target,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = counter.value.toFixed(decimals) + suffix
      },
    })

    return () => tween.kill()
  }, [target, decimals, suffix])

  return <span ref={numberRef}>0</span>
}

export default function Education() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.education-card', {
        autoAlpha: 0,
        scale: 0.96,
        y: 12,
      })
      gsap.set('.education-word', { yPercent: 110 })
      gsap.set('.education-stat', { autoAlpha: 0, y: 8 })
      gsap.set('.education-topic', { autoAlpha: 0, y: 8 })
      gsap.set('.education-topic-line', { scaleX: 0 })
      gsap.set('.education-grad-text', { yPercent: 110 })
      gsap.set('.education-institution', { autoAlpha: 0, y: 18 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      tl.to('.education-card', {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.48,
        stagger: 0.08,
      })
        .to(
          '.education-word',
          { yPercent: 0, duration: 0.65, stagger: 0.09 },
          '-=0.2'
        )
        .to(
          '.education-stat',
          { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.13 },
          '-=0.25'
        )
        .to(
          '.education-institution',
          { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.15 },
          '-=0.15'
        )
        .to(
          '.education-topic',
          { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.1 },
          '-=0.25'
        )
        .to(
          '.education-topic-line',
          { scaleX: 1, duration: 0.35, stagger: 0.1 },
          '<'
        )
        .to(
          '.education-grad-text',
          { yPercent: 0, duration: 0.65 },
          '-=0.15'
        )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="education-page" ref={pageRef}>
      <div className="education-frame">
        <header className="education-nav">
          <a className="education-brand" href="/">
            Shravya <em>Somayaji</em>
          </a>

          <nav aria-label="Main navigation" className="about-nav-links">
              <a href="/">HOME</a>
              <a href="/about">ABOUT</a>
              <a href="/contact">CONTACT</a>
          </nav>
        </header>

        <div className="education-grid">
          <section className="education-card education-intro">
            <p className="education-eyebrow">EDUCATION</p>

            <h1 className="education-headline">
              <span className="education-headline-line">
                <span className="education-word">Where</span>{' '}
                <span className="education-word">I've</span>{' '}
                <span className="education-word">been</span>
              </span>
              <span className="education-headline-line">
                <span className="education-word education-italic">
                  learning.
                </span>
              </span>
            </h1>

            <p className="education-description">
              A B.E. in Computer Science, an online B.S. in Data Science and
              Applications from IIT Madras, and a pre-university foundation
              built on mathematics.
            </p>

            <div className="education-stats">
              <div className="education-stat">
                <strong><CountUp target={9.32} decimals={2} /></strong>
                <span>CGPA at RVITM</span>
              </div>
              <div className="education-stat">
                <strong><CountUp target={7.83} decimals={2} /></strong>
                <span>CGPA at IIT Madras</span>
              </div>
              <div className="education-stat">
                <strong><CountUp target={95} suffix="%" /></strong>
                <span>Pre-University</span>
              </div>
            </div>
          </section>

          <section className="education-card education-graduation">
            <p className="education-eyebrow">
              EXPECTED
              <br />
              GRADUATION
            </p>

            <div className="education-grad-clip">
              <div className="education-grad-text">
                <span>June</span>
                <em>2028</em>
              </div>
            </div>
          </section>

          <section className="education-card education-also">
            <h2>Also <em>studied</em></h2>
            <p className="education-also-subtitle">
              Machine Learning Trainee · IIT Dharwad · 5 weeks
            </p>

            <div className="education-topics">
              {topics.map((topic, index) => (
                <div className="education-topic" key={topic}>
                  <span>{topic}</span>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <div className="education-topic-line" />
                </div>
              ))}
            </div>
          </section>

          <article className="education-card education-institution education-rvitm">
            <p className="education-eyebrow">B.E. · COMPUTER SCIENCE</p>
            <h3>RV Institute of Technology &amp; Management</h3>
            <p className="education-muted">Bangalore</p>

            <div className="education-details">
              <div>
                <span>CGPA</span>
                <strong>9.32/10</strong>
              </div>
              <div>
                <span>Expected</span>
                <strong>June 2028</strong>
              </div>
            </div>
          </article>

          <article className="education-card education-institution education-iitm">
            <p className="education-eyebrow">B.S. · ONLINE</p>
            <h3>Indian Institute of Technology Madras</h3>
            <p className="education-muted">Data Science and Applications</p>

            <div className="education-details">
              <div>
                <span>CGPA</span>
                <strong>7.83/10</strong>
              </div>
              <div>
                <span>Enrolled</span>
                <strong>Aug 2025</strong>
              </div>
              <div>
                <span>Level</span>
                <strong>Diploma</strong>
              </div>
            </div>
          </article>

          <article className="education-card education-institution education-pu">
            <p className="education-eyebrow">PRE-UNIVERSITY COURSE</p>
            <h3>Deeksha PU College</h3>
            <p className="education-muted">Bangalore</p>

            <div className="education-details">
              <div>
                <span>Overall</span>
                <strong>95%</strong>
              </div>
              <div>
                <span>Mathematics</span>
                <strong>100/100</strong>
              </div>
            </div>
          </article>

          <a
            className="education-card education-next"
            href="/experience"
          >
            <span>NEXT: EXPERIENCE</span>
            <span className="education-next-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </main>
  )
}
