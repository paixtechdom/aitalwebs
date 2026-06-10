import { useRef, useEffect } from 'react';
import { PROJECTS, DESC_MAP } from '../utils/constants';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Works.module.css';

const IFRAME_W = 1280;

function ProjectCard({ project, index }) {
  const cpRef  = useRef(null);
  const frRef  = useRef(null);
  const cardRef = useRef(null);

  function scaleIframe() {
    if (cpRef.current && frRef.current) {
      frRef.current.style.transform = `scale(${cpRef.current.offsetWidth / IFRAME_W})`;
    }
  }

  useEffect(() => {
    scaleIframe();
    window.addEventListener('resize', scaleIframe);
    return () => window.removeEventListener('resize', scaleIframe);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    // lazy load iframe when card enters viewport
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && frRef.current && !frRef.current.src) {
          frRef.current.src = project.url;
          frRef.current.addEventListener('load', () => {
            const sk = frRef.current.parentElement.querySelector(`.${styles.skeleton}`);
            if (sk) sk.style.display = 'none';
          });
          setTimeout(() => {
            const sk = frRef.current?.parentElement?.querySelector(`.${styles.skeleton}`);
            if (sk) sk.style.display = 'none';
          }, 8000);
          obs.unobserve(card);
        }
      },
      { rootMargin: '200px' }
    );
    obs.observe(card);
    const cardObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.classList.add(styles.visible);
          cardObs.unobserve(card);
        }
      },
      { threshold: 0.08 }
    );
    cardObs.observe(card);
    return () => { obs.disconnect(); cardObs.disconnect(); };
  }, [project.url]);

  return (
    <div
      ref={cardRef}
      className={styles.card}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <div ref={cpRef} className={styles.preview} id={`cp${index}`}>
        <div className={styles.skeleton}>
          <div className={styles.skBar} style={{ width: '60%' }} />
          <div className={styles.skBar} style={{ width: '80%' }} />
          <div className={styles.skBar} style={{ width: '50%' }} />
        </div>
        <iframe
          ref={frRef}
          title={`${project.name} preview`}
          sandbox="allow-scripts allow-same-origin"
          className={styles.iframe}
        />
        <div className={styles.previewOverlay}>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-arrow-up-right-from-square" /> Visit Site
          </a>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.category}>{project.category}</div>
        <div className={styles.title}>{project.name}</div>
        <div className={styles.desc}>
          {DESC_MAP[project.category] || 'A custom digital experience crafted with care.'}
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  const header = useScrollReveal();

  return (
    <section className={styles.section} id="works" aria-label="Portfolio">
      <div
        ref={header.ref}
        className={`${styles.header} ${header.visible ? styles.headerVisible : ''}`}
      >
        <div className="section-label">// Portfolio</div>
        <h2 className="section-title">What We've Built for <em>Others</em></h2>
      </div>

      <div className={styles.grid}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.url} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
