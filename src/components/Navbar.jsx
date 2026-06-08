import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navRef = useRef(null);
  const menuRef = useRef(null);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-container">
        <ul className="nav-menu" ref={menuRef}>
          <li className="nav-item">
            <Link to="/#about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/#work" className="nav-link">
              Work
            </Link>
          </li>
          {/* Insert logo in the middle of the navbar */}
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <p className="logo">KaiSheng</p>
          </Link>
          <li className="nav-item">
            <Link to="/#projects" className="nav-link">
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/photography" className="nav-link">
              Photos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

