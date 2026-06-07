import { useRef } from "react";
import "./Navbar.css";

function Navbar() {
  const navRef = useRef(null);
  const menuRef = useRef(null);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-container">
        <ul className="nav-menu" ref={menuRef}>
          <li className="nav-item">
            <a href="#home" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          {/* Insert logo in the middle of the navbar */}
          <p className="logo">KaiSheng</p>
          <li className="nav-item">
            <a href="#work" className="nav-link">
              Work
            </a>
          </li>
          <li className="nav-item">
            <a href="#projects" className="nav-link">
              Projects
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
