import "./Contact.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOCIAL_LINKS } from "../../data/socialLinks";

gsap.registerPlugin(ScrollTrigger);

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
            backgroundColor: "rgba(0, 0, 0, 0.06)",
            duration: 0.2,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          gsap.to(el, {
            y: 0,
            scale: 1,
            backgroundColor: "rgba(0, 0, 0, 0)",
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
        <h2 className="section-title contact-title">Get In Touch</h2>
        <p className="section-subheader contact-subheader">
          Don't be a stranger.
        </p>
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
                      <span className="contact-social-label">{link.label}</span>
                      <span className="contact-social-value">{link.value}</span>
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
