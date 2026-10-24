
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Skills.css'

const skillGroups = [
  {
    number: '01',
    title: 'Languages',
    skills: ['C++', 'Python', 'Java', 'JavaScript', 'SQL'],
  },
  {
    number: '02',
    title: 'ML & AI',
    skills: [
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'NLP',
      'LangGraph (LLM Agent Workflows)',
    ],
  },
  {
    number: '03',
    title: 'Web & Backend',
    skills: ['Flask', 'REST APIs', 'Angular', 'React'],
  },
  {
    number: '04',
    title: 'Databases & Tools',
    skills: ['pgvector', 'MySQL', 'SQLite', 'Git'],
  },
  {
    number: '05',
    title: 'Fundamentals',
    skills: ['Data Structures & Algorithms', 'OOP', 'DBMS'],
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

export default function Skills() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.skills-banner', { autoAlpha: 0, y: -10 })
      gsap.set('.skills-column', { autoAlpha: 0, y: 18 })
      gsap.set('.skills-item', { autoAlpha: 0, y: 8 })
      gsap.set('.skills-line', { scaleX: 0 })
      gsap.set('.skills-footer', { autoAlpha: 0, y: 10 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      tl.to('.skills-banner', {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
      })
        .to(
          '.skills-column',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.07,
          },
          '-=0.1'
        )
        .to(
          '.skills-item',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.045,
          },
          '-=0.1'
        )
        .to(
          '.skills-line',
          {
            scaleX: 1,
            duration: 0.3,
            stagger: 0.04,
          },
          '<'
        )
        .to(
          '.skills-footer',
          { autoAlpha: 1, y: 0, duration: 0.35 },
          '-=0.1'
        )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="skills-page" ref={pageRef}>
      <div className="skills-frame">
        <header className="skills-nav">
          <a className="skills-brand" href="/">
            Shravya <em>Somayaji</em>
          </a>
          <nav aria-label="Main navigation" className="about-nav-links">
  <a href="/">HOME</a>
  <a className="active" href="/about">ABOUT</a>
  <a href="/#contact">CONTACT</a>
</nav>
        </header>

        <section className="skills-banner">
          <div className="skills-banner-title">
            <p className="skills-eyebrow">SKILLS</p>
            <h1>What I work <em>with.</em></h1>
          </div>

          <p className="skills-summary">
            Languages, ML and AI tooling, web frameworks, databases and the
            fundamentals underneath them.
          </p>

          <div className="skills-total">
            <strong><CountUp target={22} /></strong>
            <span>skills, 5 areas</span>
          </div>
        </section>

        <div className="skills-columns">
          {skillGroups.map((group, groupIndex) => (
            <section
              className={`skills-column ${groupIndex % 2 === 0 ? 'dark' : 'light'}`}
              key={group.number}
            >
              <p className="skills-eyebrow">{group.number}</p>
              <h2>{group.title}</h2>

              <div className="skills-list">
                {group.skills.map((skill) => (
                  <div className="skills-item" key={skill}>
                    <span>{skill}</span>
                    <div className="skills-line" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <a className="skills-footer" href="/achievements">
            <span>ACHIEVEMENTS</span>
            <span className="skills-footer-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </main>
  )
}
