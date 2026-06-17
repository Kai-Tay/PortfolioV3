import "./Home.css";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import profileImg from "../../assets/profile.jpg";
import lanyardImgFront from "../../assets/lanyard-photo-front.jpg";
import lanyardImgBack from "../../assets/lanyard-photo-back.jpg";
import Lanyard from "../../components/lanyard/Lanyard.jsx";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

  const words = [
    "Avid Photographer",
    "Full-Stack Developer",
    "Clown Volleyballer",
    "AI Integrator",
    "Creative Thinker",
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 50 : 100;

    if (!isDeleting && displayedText === currentWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? currentWord.substring(0, displayedText.length - 1)
          : currentWord.substring(0, displayedText.length + 1);
        setDisplayedText(nextText);
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex, words]);

  const isPhotography = words[wordIndex] === "Avid Photographer";

  useEffect(() => {
    const root = sectionRef.current;
    const hoverCleanups = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Initial animation for the title, subtitle, and photo card
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 },
      )
        .fromTo(
          ".home-subtitle",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.7",
        )

      // Scroll-triggered animation for the entire section
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });
    }, sectionRef);

    // Hover effect for the photo card
    if (root) {
      const photoCard = root.querySelector(".home-photo-card");
      if (photoCard) {
        const onEnter = () => {
          gsap.to(photoCard, {
            y: -8,
            scale: 1.02,
            backgroundColor: "rgba(255, 255, 255, 0.32)",
            boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.12)",
            borderColor: "rgba(255, 255, 255, 0.35)",
            duration: 0.3,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          gsap.to(photoCard, {
            y: 0,
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.06)",
            borderColor: "rgba(255, 255, 255, 0.25)",
            duration: 0.3,
            ease: "power3.out",
            overwrite: true,
          });
        };

        photoCard.addEventListener("mouseenter", onEnter);
        photoCard.addEventListener("mouseleave", onLeave);

        hoverCleanups.push(() => {
          photoCard.removeEventListener("mouseenter", onEnter);
          photoCard.removeEventListener("mouseleave", onLeave);
          gsap.killTweensOf(photoCard);
        });
      }
    }

    return () => {
      hoverCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" ref={sectionRef} className="home-section">
      <div className="home-container">
        <div className="home-info">
          <p className="home-subtitle" style={{ fontSize: "20px" }}>
            Hi! I'm
          </p>
          <h1
            ref={titleRef}
            className="home-title"
            style={{ fontSize: "7.5vw", fontFamily: "RocketRaccoon" }}
          >
            Kai Sheng
          </h1>
          <p className="home-subtitle">
            Final Year Software Engineering Student @ SMU
            <span className="desktop-only-subtitle">
              {" "}&{" "}
              {isPhotography ? (
                <Link to="/photography" className="photography-highlight-link">
                  {displayedText}
                </Link>
              ) : (
                <span className="skill-highlight">{displayedText}</span>
              )}
              <span className="typing-cursor"></span>
            </span>
          </p>
        </div>
        {/* <div className="home-photo-container">
          <div className="home-photo-card">
            <img
              src={profileImg}
              alt="Kai Sheng Portrait"
              className="home-profile-img"
            />
          </div>
        </div> */}
        {/* Add lanyard */}
        <div className="lanyard">
          <Lanyard
            position={[0, 0, 15]}
            gravity={[0,-30,0]}
            backImage={lanyardImgFront}
            frontImage={lanyardImgBack}
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
