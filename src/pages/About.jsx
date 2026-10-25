
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./About.css";

const skills = [
  "Python",
  "C++",
  "React",
  "Flask",
  "SQLite",
  "Machine Learning",
  "Data Structures & Algorithms",
  "LeetCode",
];

const activities = [
  { name: "Coding Club", role: "Mentor" },
  { name: "Carnatic music", role: "Junior Grade" },
  { name: "Basketball", role: "" },
  { name: "Debate & MUN", role: "" },
  { name: "FANTOMCODE 2026", role: "" },
];

const timeline = [
  {
    title: "RV Institute of Technology & Management",
    detail: "Computer Science · CGPA 9.32",
  },
  {
    title: "IIT Madras",
    detail: "BS in Data Science and Applications",
  },
  {
    title: "IIT Dharwad",
    detail: "ML Trainee",
  },
  {
    title: "Banking Audit Log System",
    detail: "Angular · Flask · SQLite",
  },
];

function PortraitPlaceholder() {
  return (
    <div className="about-portrait-art" aria-hidden="true">
      <div className="about-portrait-hair" />
      <div className="about-portrait-face" />
      <div className="about-portrait-neck" />
      <div className="about-portrait-body" />
      <div className="about-portrait-caption">YOUR PHOTO HERE</div>
    </div>
  );
}

function CountUp({ target, decimals = 0, suffix = "" }) {
  const numberRef = useRef(null);

  useLayoutEffect(() => {
    const element = numberRef.current;
    if (!element) return;

    const counter = { value: 0 };
    const animation = gsap.to(counter, {
      value: target,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent =
          counter.value.toFixed(decimals) + suffix;
      },
    });

    return () => animation.kill();
  }, [target, decimals, suffix]);

  return <span ref={numberRef}>0</span>;
}

export default function About() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Set the initial state before playing the entrance.
      gsap.set(".about-card", {
        autoAlpha: 0,
        scale: 0.94,
        y: 12,
      });

      gsap.set(".about-headline-word", { yPercent: 115 });
      gsap.set(".about-portrait", { autoAlpha: 0, y: 26 });
      gsap.set(".about-tag", { autoAlpha: 0, y: 8 });
      gsap.set(".about-activity", { autoAlpha: 0, y: 8 });
      gsap.set(".about-timeline-line", { scaleY: 0 });
      gsap.set(".about-timeline-dot", { scale: 0 });
      gsap.set(".about-stat", { autoAlpha: 0, y: 8 });

      timeline
        .to(".about-card", {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.48,
          stagger: 0.075,
        })
        .to(
          ".about-headline-word",
          {
            yPercent: 0,
            duration: 0.65,
            stagger: 0.085,
          },
          "-=0.18"
        )
        .to(
          ".about-stat",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.12,
          },
          "-=0.25"
        )
        .to(
          ".about-tag",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.04,
          },
          "-=0.2"
        )
        .to(
          ".about-activity",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.08,
          },
          "-=0.22"
        )
        .to(
          ".about-timeline-line",
          {
            scaleY: 1,
            duration: 0.65,
            ease: "power2.inOut",
          },
          "-=0.3"
        )
        .to(
          ".about-timeline-dot",
          {
            scale: 1,
            duration: 0.22,
            stagger: 0.13,
            ease: "back.out(2)",
          },
          "-=0.5"
        )
        .to(
          ".about-portrait",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.25"
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="about-page" ref={pageRef}>
      <div className="about-frame">
        <header className="about-nav">
          <a className="about-brand" href="/" aria-label="Shravya Somayaji home">
            Shravya <em>Somayaji</em>
          </a>

          <nav aria-label="Main navigation" className="about-nav-links">
            <a href="/">HOME</a>
            <a className="active" href="/about">ABOUT</a>
            <a href="/contact">CONTACT</a>
          </nav>
        </header>

        <div className="about-grid">
          <section className="about-card about-intro">
            <p className="about-eyebrow">ABOUT</p>

            <h1 className="about-headline">
              <span className="about-headline-line">
                <span className="about-headline-word">A</span>{" "}
                <span className="about-headline-word">computer</span>{" "}
                <span className="about-headline-word">science</span>
              </span>
              <span className="about-headline-line">
                <span className="about-headline-word">student</span>{" "}
                <span className="about-headline-word">who</span>{" "}
                <span className="about-headline-word">builds</span>{" "}
                <span className="about-headline-word about-italic">
                  useful
                </span>
              </span>
              <span className="about-headline-line">
                <span className="about-headline-word">things.</span>
              </span>
            </h1>

            <p className="about-bio">
              I study Computer Science at RV Institute of Technology &amp;
              Management while pursuing a BS in Data Science and Applications
              at IIT Madras. I build full-stack web apps and machine learning
              models, and I enjoy solving problems in data structures and
              algorithms.
            </p>

            <div className="about-stats">
              <div className="about-stat">
                <strong><CountUp target={9.32} decimals={2} /></strong>
                <span>CGPA at RVITM</span>
              </div>
              <div className="about-stat">
                <strong>
                  <CountUp target={100} />/100
                </strong>
                <span>in Mathematics</span>
              </div>
              <div className="about-stat">
                <strong><CountUp target={2} /></strong>
                <span>degrees in progress</span>
              </div>
            </div>
          </section>

          <section className="about-card about-portrait" aria-label="Portrait">
            <img
                className="about-portrait-image"
                src="/new.png"
                alt="Portrait of Shravya Somayaji"
            />
         </section>

          <section className="about-card about-timeline">
            <h2>Study &amp; <em>work</em></h2>

            <div className="about-timeline-list">
              <div className="about-timeline-line" />
              {timeline.map((item) => (
                <article className="about-timeline-item" key={item.title}>
                  <span className="about-timeline-dot" />
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-card about-skills">
            <h2>What I <em>use</em></h2>
            <div className="about-tags">
              {skills.map((skill) => (
                <span className="about-tag" key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          <section className="about-card about-beyond" id="beyond-code">
            <h2>Beyond <em>code</em></h2>
            <div className="about-activities">
              {activities.map((activity) => (
                <div className="about-activity" key={activity.name}>
                  <span>{activity.name}</span>
                  {activity.role && <small>{activity.role}</small>}
                </div>
              ))}
            </div>
          </section>

          <a className="about-card about-work-link" href="/#work">
            <span className="about-next">
              NEXT<br />UP
              <span className="about-arrow" aria-hidden="true">↗</span>
            </span>
            <span className="about-work-title">
              See my<br /><em>work</em>
            </span>
          </a>

         
        </div>
      </div>
    </main>
  );
}
