
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Projects.css'

const projects = [
  {
    number: '01',
    category: 'AI · ONGOING',
    title: 'ReconIQ – Real-Time Financial Reconciliation System',
    tags: ['Python', 'LangGraph', 'Scikit-learn', 'PostgreSQL', 'pgvector'],
    description:
      'An AI-driven system that matches and investigates transactions across bank statements, payment gateways and ledgers. A LangGraph agent finds probable root causes; Isolation Forest and DBSCAN flag anomalies.',
    status: 'ONGOING',
    link: '',
  },
  {
    number: '02',
    category: 'HACKATHON',
    title: 'PricePilot – AI-Powered Price Comparison & Buying Assistant',
    tags: ['React', 'Python', 'SQL', 'Machine Learning', 'Web Scraping'],
    description:
      'Compares product prices across e-commerce websites, uses machine learning on historical price data to spot seasonal trends and recurring drops, and recommends the best time to buy.',
    status: 'HACKATHON PROJECT',
    link: 'https://github.com/shravya0306/pricepilot',
  },
  {
    number: '03',
    category: 'FULL-STACK',
    title: 'Banking Audit Log Management System',
    tags: ['Angular', 'Flask', 'Python', 'SQLite3'],
    description:
      'A full-stack audit system with an Angular frontend and a Flask REST API backed by SQLite3. Its audit module records user activity, including login and logout events, for monitoring and accountability.',
    status: '',
    link: 'https://github.com/shravya0306/Digital_Banking_Management_System',
  },
  {
    number: '04',
    category: 'MACHINE LEARNING',
    title: 'Applied Machine Learning Projects',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'NLP'],
    description:
      'A Logistic Regression fraud detection model on a highly imbalanced dataset, plus an SMS spam classifier (NLP and Naive Bayes), a house price regression model and a Titanic survival model with 85% accuracy.',
    status: '',
    link: 'https://github.com/shravya0306/Mini-Projects',
  },
]

const auditRows = [
  { label: 'Matched', matched: true },
  { label: 'Matched', matched: true },
  { label: 'Flagged', matched: false },
  { label: 'Matched', matched: true },
  { label: 'Flagged', matched: false },
  { label: 'Matched', matched: true },
]

function CountUp({ target, suffix = '' }) {
  const numberRef = useRef(null)

  useLayoutEffect(() => {
    const element = numberRef.current
    if (!element) return

    const counter = { value: 0 }

    const tween = gsap.to(counter, {
      value: target,
      duration: 1.2,
      delay: 0.15,
      ease: 'power2.out',
      onUpdate: () => {
        if (element) {
          element.textContent = `${Math.round(counter.value)}${suffix}`
        }
      },
    })

    return () => tween.kill()
  }, [target, suffix])

  return <span ref={numberRef}>0{suffix}</span>
}

export default function Projects() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reducedMotion) {
        gsap.set(
          [
            '.projects-card',
            '.projects-word',
            '.projects-stat',
            '.projects-tag',
            '.projects-audit-row',
          ],
          { clearProps: 'all' },
        )
        return
      }

      gsap.set('.projects-card', {
        autoAlpha: 0,
        y: 18,
        scale: 0.96,
      })

      gsap.set('.projects-word', { yPercent: 110 })
      gsap.set('.projects-stat', { autoAlpha: 0, y: 8 })
      gsap.set('.projects-tag', {
        autoAlpha: 0,
        scale: 0.88,
        transformOrigin: 'center center',
      })
      gsap.set('.projects-audit-row', { autoAlpha: 0, x: -8 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      // Cards enter in sequence.
      tl.to('.projects-card', {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.48,
        stagger: 0.08,
      })

        // Headline words reveal upward.
        .to(
          '.projects-word',
          {
            yPercent: 0,
            duration: 0.65,
            stagger: 0.08,
          },
          '-=0.2',
        )

        // Stats appear, then their numbers count up.
        .to(
          '.projects-stat',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.1,
          },
          '-=0.2',
        )

        // Technology tags pop into view.
        .to(
          '.projects-tag',
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.25,
            stagger: 0.035,
          },
          '-=0.2',
        )

        // Audit rows appear as if reconciliation is running.
        .to(
          '.projects-audit-row',
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.25,
            stagger: 0.12,
          },
          '-=0.25',
        )

      // One subtle pulse after the audit rows have appeared.
      tl.add(() => {
        gsap.fromTo(
          '.projects-audit-bar',
          { scaleX: 0.75 },
          {
            scaleX: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
            overwrite: true,
          },
        )
      })

      // Count-up starts when each stat becomes visible.
      gsap.utils.toArray('.projects-stat strong').forEach((element) => {
        const count = element.querySelector('span')
        if (!count) return

        const targetText = count.textContent
        const suffix = targetText.includes('%') ? '%' : ''
        const target = Number.parseInt(targetText, 10)

        if (!Number.isFinite(target)) return

        const counter = { value: 0 }
        count.textContent = `0${suffix}`

        gsap.to(counter, {
          value: target,
          duration: 1.2,
          delay: 0.35,
          ease: 'power2.out',
          onUpdate: () => {
            count.textContent = `${Math.round(counter.value)}${suffix}`
          },
        })
      })

      // Lift cards on hover.
      const cards = gsap.utils.toArray('.projects-item')

      cards.forEach((card) => {
        const lift = gsap.quickTo(card, 'y', {
          duration: 0.22,
          ease: 'power2.out',
        })

        card.addEventListener('mouseenter', () => lift(-4))
        card.addEventListener('mouseleave', () => lift(0))
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="projects-page" ref={pageRef}>
      <div className="projects-frame">
        <header className="projects-nav">
          <a className="projects-brand" href="/">
            Shravya <em>Somayaji</em>
          </a>

          <nav aria-label="Main navigation" className="about-nav-links">
            <a href="/">HOME</a>
            <a className="active" href="/about">ABOUT</a>
            <a href="/contact">CONTACT</a>
          </nav>
        </header>

        <div className="projects-grid">
          <section className="projects-card projects-intro">
            <p className="projects-eyebrow">PROJECTS</p>

            <h1 className="projects-headline">
              <span className="projects-headline-line">
                <span className="projects-word">Things</span>{' '}
                <span className="projects-word">I've</span>{' '}
                <span className="projects-word">built,</span>{' '}
                <span className="projects-word">and</span>
              </span>
              <span className="projects-headline-line">
                <span className="projects-word">am</span>{' '}
                <span className="projects-word">still</span>{' '}
                <span className="projects-word">building.</span>
              </span>
            </h1>

            <p className="projects-description">
              AI-driven systems, full-stack apps and machine learning models,
              from a LangGraph reconciliation agent to an Angular and Flask
              audit system.
            </p>

            <div className="projects-stats">
              <div className="projects-stat">
                <strong><CountUp target={4} /></strong>
                <span>projects</span>
              </div>
              <div className="projects-stat">
                <strong><CountUp target={1} /></strong>
                <span>ongoing</span>
              </div>
              <div className="projects-stat">
                <strong><CountUp target={85} suffix="%" /></strong>
                <span>Titanic model accuracy</span>
              </div>
            </div>
          </section>

          <section className="projects-card projects-featured">
            <div className="projects-featured-top">
              <p className="projects-eyebrow">
                FEATURED
                <br />
                ONGOING
              </p>
              <span className="projects-featured-arrow" aria-hidden="true">
                ↗
              </span>
            </div>

            <div className="projects-audit">
              <div className="projects-audit-head">
                <span>BANK</span>
                <span>GATEWAY</span>
                <span>LEDGER</span>
              </div>

              <div className="projects-audit-rows">
                {auditRows.map((row, index) => (
                  <div
                    className="projects-audit-row"
                    key={`${row.label}-${index}`}
                  >
                    <span className={row.matched ? 'matched' : 'flagged'}>
                      {row.label}
                    </span>
                    <span className="projects-audit-bar" />
                  </div>
                ))}
              </div>
            </div>

            <a className="projects-reconiq-name" href="#project-01">
              RECONIQ
            </a>
          </section>

          {projects.map((project) => (
            <article
              className={`projects-card projects-item projects-item-${project.number}`}
              id={`project-${project.number}`}
              key={project.number}
            >
              <p className="projects-eyebrow">
                {project.number} · {project.category}
              </p>

              <h2>{project.title}</h2>

              <div className="projects-tags">
                {project.tags.map((tag) => (
                  <span className="projects-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <p className="projects-item-description">
                {project.description}
              </p>

              <div className="projects-item-footer">
                {project.status ? (
                  <>
                    <span>{project.status}</span>
                    <span className="projects-status-dot" />
                  </>
                ) : (
                  <a
                    className="projects-github"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>VIEW ON GITHUB</span>
                    <span className="projects-footer-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
