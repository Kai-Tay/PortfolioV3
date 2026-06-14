import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [isShrunk, setIsShrunk] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 50) {
        setIsShrunk(false);
      } else if (diff > 8) {
        // Scrolling down
        setIsShrunk(true);
      } else if (diff < -8) {
        // Scrolling up
        setIsShrunk(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isShrunk ? "shrink" : ""}`} ref={navRef}>
      <div className="nav-container">
        <ul className="nav-menu" ref={menuRef}>
          <li className="nav-item">
            <Link to="/#about" className="nav-link" aria-label="About">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20c0-3.3 2.7-5 5-5s5 1.7 5 5" />
              </svg>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/#work" className="nav-link" aria-label="Work">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="7" width="18" height="13" rx="4" />
                <path d="M8 7V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V7" />
                <path d="M8 11v4" />
                <path d="M16 11v4" />
                <rect x="11" y="11" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
              </svg>
            </Link>
          </li>
          {/* Insert logo in the middle of the navbar */}
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <p className="logo">KaiSheng</p>
          </Link>
          <li className="nav-item">
            <Link to="/#projects" className="nav-link" aria-label="Projects">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="4" />
                <path d="M7 9l3 3-3 3" />
                <path d="M12 15h5" />
              </svg>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/photography" className="nav-link" aria-label="Photos">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="7" width="18" height="13" rx="4" />
                <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3a1.5 1.5 0 0 1 1.5 1.5V7" />
                <circle cx="12" cy="13.5" r="3.5" />
                <circle cx="18" cy="10" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

