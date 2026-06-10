import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './About.module.css';

const STATS = [
  { target: 25, suffix: '+', label: 'Projects Delivered'   },
  { target: 10, suffix: '+', label: 'Industries Served'    },
  { target: 98, suffix: '%', label: 'Client Satisfaction'  },
  { target: 30, suffix: '+', label: 'Global Clients'       },
];

function StatBox({ target, suffix, label, animate }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let c = 0;
    const step = target / 40;
    const id = setInterval(() => {
      c = Math.min(c + step, target);
      setCurrent(Math.floor(c));
      if (c >= target) { setCurrent(target); clearInterval(id); }
    }, 30);
    return () => clearInterval(id);
  }, [animate, target]);

  return (
    <div className={styles.statBox}>
      <span className={styles.statNum}>{current}{suffix}</span>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export default function About() {
  const text     = useScrollReveal();
  const statsRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className={styles.section} aria-label="About">
      <div className={styles.videoBg}>
        <video autoPlay muted loop playsInline>
          <source src="/video/video2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.videoOverlay} />

      <div className={styles.inner}>
        <div
          ref={text.ref}
          className={`${styles.textCol} ${text.visible ? styles.visible : ''}`}
        >
          <div className="section-label">// About Us</div>
          <h2 className={`${styles.h2} section-title`}>
            Crafting the <em>Future</em> of Web
          </h2>
          <p>
            Aital Techvolution is a digital agency building modern, high-performance
            websites for businesses across healthcare, fashion, real estate, ministry, and beyond.
          </p>
          <p style={{ marginTop: '0.8rem' }}>
            Every pixel, interaction, and line of code is intentional — designed to help
            our clients stand out online and grow their impact.
          </p>
          <div className={styles.badge}>
            <i className="fas fa-code-branch" /> Aital Techvolution
          </div>
        </div>

        <div ref={statsRef} className={styles.statsGrid}>
          {STATS.map(s => (
            <StatBox key={s.label} {...s} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
