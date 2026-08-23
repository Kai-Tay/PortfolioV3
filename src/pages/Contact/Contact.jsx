import "./Contact.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOCIAL_LINKS } from "../../data/socialLinks";

gsap.registerPlugin(ScrollTrigger);

function SocialIcon({ label }) {
  const iconProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (label === "LinkedIn") {
    return (
      <svg {...iconProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  if (label === "Email") {
    return (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }

  return (
    <svg {...iconProps} fill="currentColor" stroke="none">
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22c.57.1.78-.25.78-.55v-2.15c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.54-.29-5.22-1.27-5.22-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.13 1.17A10.9 10.9 0 0 1 12 5.8c.97 0 1.95.13 2.86.39 2.17-1.48 3.13-1.17 3.13-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.39-2.69 5.35-5.24 5.64.41.35.78 1.03.78 2.08v3.08c0 .3.2.65.79.54A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}

function Contact() {
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
        ".contact-title",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
      )
        .fromTo(
          ".contact-subheader",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.3",
        )
        .fromTo(
          ".contact-card-wrapper",
          { y: 18, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55 },
          "-=0.15",
        )
        .fromTo(
          ".contact-social-item",
          { y: 12, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.45,
            clearProps: "transform,scale",
          },
          "-=0.2",
        );
    }, sectionRef);

    if (root) {
      const socials = Array.from(root.querySelectorAll(".contact-social-link"));
      socials.forEach((el) => {
        const onEnter = () => {
          gsap.to(el, {
            y: -2,
            scale: 1.03,
            backgroundColor: "rgba(255, 253, 246, 0.14)",
            duration: 0.2,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          gsap.to(el, {
            y: 0,
            scale: 1,
            backgroundColor: "rgba(255, 253, 246, 0)",
            duration: 0.2,
            ease: "power3.out",
            overwrite: true,
          });
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        hoverCleanups.push(() => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          gsap.killTweensOf(el);
        });
      });
    }

    return () => {
      hoverCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="contact-container">
        <p className="section-title contact-title">Get In Touch</p>
        <h2 className="section-subheader contact-subheader">
          Don't be a stranger.
        </h2>
        <div className="contact-content">
          <div className="contact-card-wrapper">
            <div className="contact-info contact-card">
              <div className="contact-details">
                <h3>Let's Connect</h3>
                <p>
                  I'm always interested in new opportunities that aligns with my
                  interest and career aspirations. Feel free to reach out if
                  you'd like to work together or just say hello!
                </p>
              </div>
              <ul className="contact-social">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label} className="contact-social-item">
                    <a
                      className="contact-social-link"
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      <SocialIcon label={link.label} />
                      <span className="contact-social-label">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
