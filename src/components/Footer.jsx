import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-logo">KaiSheng</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} Kai Sheng. All rights reserved.
        </p>
        <a className="footer-back-to-top" href="/#home">Back to top ↑</a>
      </div>
    </footer>
  )
}

export default Footer

