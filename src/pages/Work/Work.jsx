import './Work.css'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WORK_EXPERIENCE } from '../../data/work'

gsap.registerPlugin(ScrollTrigger)

function Work() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    const hoverCleanups = []

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'back.out(1.7)' },
      })

      tl.fromTo('.work-title', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo('.work-card-wrapper', { y: 18, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.55 }, '-=0.15')
    }, sectionRef)

    if (root) {
      // Card hover animations
      const cards = Array.from(root.querySelectorAll('.work-card'))
      cards.forEach((el) => {
        const onEnter = () => {
          gsap.to(el, {
            y: -6,
            scale: 1.015,
            backgroundColor: 'rgba(255, 255, 255, 0.32)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
            borderColor: 'rgba(255, 255, 255, 0.35)',
            duration: 0.25,
            ease: 'power3.out',
            overwrite: true,
          })
        }

        const onLeave = () => {
          gsap.to(el, {
            y: 0,
            scale: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.16)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.06)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
            duration: 0.25,
            ease: 'power3.out',
            overwrite: true,
          })
        }

        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)

        hoverCleanups.push(() => {
          el.removeEventListener('mouseenter', onEnter)
          el.removeEventListener('mouseleave', onLeave)
          gsap.killTweensOf(el)
        })
      })
    }

    return () => {
      hoverCleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return (
    <section id="work" ref={sectionRef} className="work-section">
      <div className="work-container">
        <h2 className="section-title work-title">Work Experience</h2>
        <div className="work-content">
          {WORK_EXPERIENCE.map((job) => (
            <div key={job.id} className="work-card-wrapper">
              <div className="work-card">
                <div className="work-details">
                  {job.logo && (
                    <img src={job.logo} alt={`${job.company} Logo`} className="work-logo" />
                  )}
                  <div className="work-info-meta">
                    <h3 className="work-role">{job.role}</h3>
                    <h4 className="work-company">{job.company}</h4>
                    <p className="work-duration">{job.duration}</p>
                  </div>
                </div>
                <div className="work-meta">
                  <p className="work-description">{job.description}</p>
                  <ul className="work-highlights">
                    {job.highlights.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="work-tags">
                    {job.tags.map((tag) => (
                      <span key={tag} className="work-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
