
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Experience.css'

const experiences = [
  {
    number: '01',
    title: 'Machine Learning Trainee',
    organization: 'Indian Institute of Technology Dharwad',
    category: '5 WEEKS',
    description: 'A structured program covering:',
    topics: [
      'Probability',
      'Statistical pattern recognition',
      'Bayesian classification',
      'Regression',
      'Clustering',
      'Dimensionality reduction',
    ],
  },
  {
    number: '02',
    title: 'Core Member',
    organization: 'College Coding Club',
    category: 'MENTORING',
    description: 'Mentored juniors in Data Structures & Algorithms.',
  },
  {
    number: '03',
    title: 'Participant',
    organization: 'FANTOMCODE 2026',
    category: 'HACKATHON',
    description: 'A 24-hour hackathon.',
  },
  {
    number: '04',
    title: 'Player & Participant',
    organization: 'College Basketball Team · Debate · Model United Nations',
    category: 'TEAM & DEBATE',
    description:
      'Played for the college basketball team and took part in debate competitions and Model United Nations.',
  },
]

function CountUp({ target }) {
  const numberRef = useRef(null)

  useLayoutEffect(() => {
    const element = numberRef.current
    if (!element) return

    const counter = { value: 0 }
    const tween = gsap.to(counter, {
      value: target,
      duration: 0.9,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = String(Math.round(counter.value))
      },
    })

    return () => tween.kill()
  }, [target])

  return <span ref={numberRef}>0</span>
}

export default function Experience() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.experience-panel', { autoAlpha: 0, x: -14 })
      gsap.set('.experience-row', { autoAlpha: 0, y: 12 })
      gsap.set('.experience-topic', { autoAlpha: 0, scale: 0.94 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      tl.to('.experience-panel', {
        autoAlpha: 1,
        x: 0,
        duration: 0.55,
      })
        .to(
          '.experience-row',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.12,
          },
          '-=0.2'
        )
        .to(
          '.experience-topic',
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.25,
            stagger: 0.05,
          },
          '-=0.15'
        )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="experience-page" ref={pageRef}>
      <div className="experience-frame">
        <header className="experience-nav">
          <a className="experience-brand" href="/">
            Shravya <em>Somayaji</em>
          </a>
          <nav aria-label="Main navigation" className="about-nav-links">
  <a href="/">HOME</a>
  <a className="active" href="/about">ABOUT</a>
  <a href="/#contact">CONTACT</a>
</nav>
        </header>

        <div className="experience-grid">
          <aside className="experience-side">
            <p className="experience-eyebrow">EXPERIENCE</p>

            <div className="experience-side-bottom">
              <h1>
                Training &amp;
                <br />
                <em>activities</em>
              </h1>

              <div className="experience-side-stat">
                <strong><CountUp target={5} /></strong>
                <span>weeks of ML training at IIT Dharwad</span>
              </div>
            </div>
          </aside>

          <section className="experience-list" aria-label="Experience list">
            {experiences.map((item) => (
              <article className="experience-row" key={item.number}>
                <span className="experience-number">{item.number}</span>

                <div className="experience-row-content">
                  <h2>{item.title}</h2>
                  <p className="experience-organization">
                    {item.organization}
                  </p>
                  {item.description && (
                    <p className="experience-description">
                      {item.description}
                    </p>
                  )}

                  {item.topics && (
                    <div className="experience-topics">
                      {item.topics.map((topic) => (
                        <span className="experience-topic" key={topic}>
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <span className="experience-category">{item.category}</span>
              </article>
            ))}
          </section>

          <a className="experience-next" href="/skills">
            <span>NEXT: SKILLS</span>
            <span className="experience-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </main>
  )
}
