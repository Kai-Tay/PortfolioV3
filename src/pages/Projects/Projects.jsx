import './Projects.css'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../../data/projects'

gsap.registerPlugin(ScrollTrigger)

function Projects() {
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

      tl.fromTo('.projects-title', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo('.project-card-wrapper', { y: 18, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.55 }, '-=0.15')
    }, sectionRef)

    if (root) {
      // Card hover animations
      const cards = Array.from(root.querySelectorAll('.project-card'))
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

      // Demo button hover animations
      const demoBtns = Array.from(root.querySelectorAll('.project-link-demo'))
      demoBtns.forEach((btn) => {
        const onEnter = () => {
          gsap.to(btn, {
            y: -2,
            scale: 1.03,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            duration: 0.2,
            ease: 'power3.out',
            overwrite: true,
          })
        }

        const onLeave = () => {
          gsap.to(btn, {
            y: 0,
            scale: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            duration: 0.2,
            ease: 'power3.out',
            overwrite: true,
          })
        }

        btn.addEventListener('mouseenter', onEnter)
        btn.addEventListener('mouseleave', onLeave)

        hoverCleanups.push(() => {
          btn.removeEventListener('mouseenter', onEnter)
          btn.removeEventListener('mouseleave', onLeave)
          gsap.killTweensOf(btn)
        })
      })

      // Code button hover animations
      const codeBtns = Array.from(root.querySelectorAll('.project-link-code'))
      codeBtns.forEach((btn) => {
        const onEnter = () => {
          gsap.to(btn, {
            y: -2,
            scale: 1.03,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            duration: 0.2,
            ease: 'power3.out',
            overwrite: true,
          })
        }

        const onLeave = () => {
          gsap.to(btn, {
            y: 0,
            scale: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            duration: 0.2,
            ease: 'power3.out',
            overwrite: true,
          })
        }

        btn.addEventListener('mouseenter', onEnter)
        btn.addEventListener('mouseleave', onLeave)

        hoverCleanups.push(() => {
          btn.removeEventListener('mouseenter', onEnter)
          btn.removeEventListener('mouseleave', onLeave)
          gsap.killTweensOf(btn)
        })
      })
    }

    return () => {
      hoverCleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="projects-container">
        <h2 className="section-title projects-title">My Projects</h2>
        <div className="projects-content">
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card-wrapper">
              <div className="project-card">
                <div className="project-details">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="project-meta">
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.demoLink === '' ? (
                      <></>
                    ) : (
                    <a
                      className="project-link project-link-demo"
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                    )}
                    {project.codeLink === '' ? (
                      <></>
                    ) : (
                    <a
                      className="project-link project-link-code"
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                    )}
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

export default Projects
