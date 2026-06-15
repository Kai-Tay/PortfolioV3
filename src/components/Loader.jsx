import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Loader.css";

function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const row4Ref = useRef(null);
  const row5Ref = useRef(null);
  const row6Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const leftRows = [row1Ref.current, row3Ref.current, row5Ref.current];
    const rightRows = [row2Ref.current, row4Ref.current, row6Ref.current];
    const allRows = [...leftRows, ...rightRows];

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up the entire overlay curtain
        gsap.to(container, {
          yPercent: -100,
          duration: 1.0,
          ease: "power4.inOut",
          onComplete: onComplete
        });
      }
    });

    // Animate rows in opposite directions
    tl.fromTo(allRows,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(leftRows,
      { xPercent: 15 },
      { xPercent: -20, duration: 2.6, ease: "power2.inOut" },
      "-=0.4"
    )
    .fromTo(rightRows,
      { xPercent: -20 },
      { xPercent: 15, duration: 2.6, ease: "power2.inOut" },
      "<"
    );

    // Fade out text slightly before curtain slides up
    tl.to(allRows, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    }, "-=0.6");

  }, [onComplete]);

  return (
    <div className="loader-overlay" ref={containerRef}>
      <div className="loader-content-container">
        {/* Row 1: Left */}
        <div className="loader-row row-left">
          <div className="loader-text-wrapper" ref={row1Ref}>
            <span className="loader-marquee-text">REACT / NEXT.JS / TYPESCRIPT / POSTGRESQL / PRISMA / TRPC / REACT / NEXT.JS / TYPESCRIPT</span>
          </div>
        </div>
        
        {/* Row 2: Right */}
        <div className="loader-row row-right">
          <div className="loader-text-wrapper" ref={row2Ref}>
            <span className="loader-marquee-text">SNOWBOARDING / PHOTOGRAPHY / HIKING / MOUNTAINS / OUTDOORS / TRAVEL / SNOWBOARDING / PHOTOGRAPHY</span>
          </div>
        </div>

        {/* Row 3: Left */}
        <div className="loader-row row-left">
          <div className="loader-text-wrapper" ref={row3Ref}>
            <span className="loader-marquee-text">PYTHON / LANGCHAIN / JAVA / JAVASCRIPT / AWS / DOCKER / REDIS / PYTHON / LANGCHAIN / JAVA</span>
          </div>
        </div>

        {/* Row 4: Right */}
        <div className="loader-row row-right">
          <div className="loader-text-wrapper" ref={row4Ref}>
            <span className="loader-marquee-text">SOFTWARE ENGINEER / CLOUD INTERN / FULL-STACK DEVELOPER / SOFTWARE ENGINEER</span>
          </div>
        </div>

        {/* Row 5: Left */}
        <div className="loader-row row-left">
          <div className="loader-text-wrapper" ref={row5Ref}>
            <span className="loader-marquee-text">SNOWBOARDING / COFFEE / DESIGN / CODING / SNOWBOARDING / COFFEE</span>
          </div>
        </div>

        {/* Row 6: Right */}
        <div className="loader-row row-right">
          <div className="loader-text-wrapper" ref={row6Ref}>
            <span className="loader-marquee-text">FILM / LANDSCAPES / LENS / APERTURE / SHUTTER / FILM / LANDSCAPES</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
