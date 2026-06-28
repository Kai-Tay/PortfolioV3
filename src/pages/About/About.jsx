import "./About.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    const hoverCleanups = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        defaults: { ease: "back.out(1.7)" },
      });

      tl.fromTo(
        ".about-title",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
      )
        .fromTo(
          ".about-subheader",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.3",
        )
        .fromTo(
          ".about-card-wrapper",
          { y: 18, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.55 },
          "-=0.15",
        );
    }, sectionRef);

    if (root) {
      const cards = Array.from(root.querySelectorAll(".about-card"));
      cards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            y: -6,
            scale: 1.015,
            backgroundColor: "rgba(255, 255, 255, 0.32)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
            borderColor: "rgba(255, 255, 255, 0.35)",
            duration: 0.25,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.06)",
            borderColor: "rgba(255, 255, 255, 0.25)",
            duration: 0.25,
            ease: "power3.out",
            overwrite: true,
          });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        hoverCleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
          gsap.killTweensOf(card);
        });
      });

      // GitHub button hover animations
      const githubBtns = Array.from(root.querySelectorAll(".about-github-btn"));
      githubBtns.forEach((btn) => {
        const onEnter = () => {
          gsap.to(btn, {
            y: -2,
            scale: 1.03,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            duration: 0.2,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          gsap.to(btn, {
            y: 0,
            scale: 1,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            duration: 0.2,
            ease: "power3.out",
            overwrite: true,
          });
        };

        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);

        hoverCleanups.push(() => {
          btn.removeEventListener("mouseenter", onEnter);
          btn.removeEventListener("mouseleave", onLeave);
          gsap.killTweensOf(btn);
        });
      });
    }

    return () => {
      hoverCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="about-container">
        <h2 className="section-title about-title">About Me</h2>
        <p className="section-subheader about-subheader">
          Who I am, minus the existential crisis.
        </p>
        <div className="about-content">
          <div className="about-card-wrapper">
            <div className="about-card about-bio">
              <h3>Who I Am</h3>
              <p>
                I am a Software Engineering student driven by a deep curiosity
                to build innovative, problem-solving solutions. I focus on
                developing reliable full-stack applications, with particular
                interests in web development, AI, and the Cloud. Outside of
                coding, I'm always seeking new experiences and have a love for
                adventurous sports and photography 🏔️ 📸
              </p>
              <div className="about-links">
                <a
                  className="about-github-btn"
                  href="https://github.com/Kai-Tay"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="github-icon"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>Find me on GitHub</span>
                </a>
              </div>
            </div>
          </div>
          <div className="about-card-wrapper">
            <div className="about-card about-skills">
              <h3>My Toolbelt</h3>
              <div className="skills-grid">
                <span className="skill-badge">Python</span>
                <span className="skill-badge">Java</span>
                <span className="skill-badge">React</span>
                <span className="skill-badge">Next.js</span>
                <span className="skill-badge">Flask</span>
                <span className="skill-badge">Spring Boot</span>
                <span className="skill-badge">AWS</span>
                <span className="skill-badge">Docker</span>
                <span className="skill-badge">PostgreSQL</span>
                <span className="skill-badge">Redis</span>
                <span className="skill-badge">LangChain</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
