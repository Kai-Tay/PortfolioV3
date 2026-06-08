import './Home.css';

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImg from '../../assets/profile.jpg';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    const hoverCleanups = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Initial animation for the title, subtitle, and photo card
      tl.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 }
      )
      .fromTo('.home-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.7'
      )
      .fromTo('.home-photo-card',
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.0, clearProps: 'transform,scale' },
        '-=0.7'
      );

      // Scroll-triggered animation for the entire section
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        y: 50,
        // opacity: 0.8,
      });
    }, sectionRef);

    // Hover effect for the photo card
    if (root) {
      const photoCard = root.querySelector('.home-photo-card');
      if (photoCard) {
        const onEnter = () => {
          gsap.to(photoCard, {
            y: -8,
            scale: 1.02,
            backgroundColor: 'rgba(255, 255, 255, 0.32)',
            boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.12)',
            borderColor: 'rgba(255, 255, 255, 0.35)',
            duration: 0.3,
            ease: 'power3.out',
            overwrite: true,
          });
        };

        const onLeave = () => {
          gsap.to(photoCard, {
            y: 0,
            scale: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.06)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
            duration: 0.3,
            ease: 'power3.out',
            overwrite: true,
          });
        };

        photoCard.addEventListener('mouseenter', onEnter);
        photoCard.addEventListener('mouseleave', onLeave);

        hoverCleanups.push(() => {
          photoCard.removeEventListener('mouseenter', onEnter);
          photoCard.removeEventListener('mouseleave', onLeave);
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
          <h1 
            ref={titleRef}
            className="home-title" 
            style={{fontSize: '7.5vw', fontFamily: 'RocketRaccoon'}}
          >
            Kai Sheng
          </h1>
          <h2 className="home-subtitle">
            Final Year Software Engineering Student &{" "}
            <Link to="/photography" className="photography-highlight-link">
              Avid Photographer
            </Link>
          </h2>
        </div>
        <div className="home-photo-container">
          <div className="home-photo-card">
            <img src={profileImg} alt="Kai Sheng Portrait" className="home-profile-img" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
