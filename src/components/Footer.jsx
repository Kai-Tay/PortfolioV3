import './Footer.css'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SOCIAL_LINKS } from '../data/socialLinks'

function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const root = footerRef.current
    if (!root) return

    const links = Array.from(root.querySelectorAll('.footer-link'))
    const cleanups = []

    links.forEach((el) => {
      const onEnter = () => {
        gsap.to(el, {
          y: -2,
          scale: 1.03,
          backgroundColor: 'rgba(145, 145, 145, 0.10)',
          borderRadius: 20,
          duration: 0.22,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      const onLeave = () => {
        gsap.to(el, {
          y: 0,
          scale: 1,
          backgroundColor: 'rgba(145, 145, 145, 0)',
          borderRadius: 10,
          duration: 0.22,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)

      cleanups.push(() => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        gsap.killTweensOf(el)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        <div className="footer-meta">
          <p className="footer-logo">KaiSheng</p>
          <p className="footer-copy">
            © {new Date().getFullYear()} Kai Sheng. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


