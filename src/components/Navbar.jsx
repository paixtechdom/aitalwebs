import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = id => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { id: 'works',        label: 'Works'       },
    { id: 'about',        label: 'About'       },
    { id: 'start',        label: 'Get Started' },
    { id: 'contact',      label: 'Contact'     },
  ];

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#" className={styles.logo} onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/logo.png" alt="Aital Techvolution" width={45} height={45} />
        </a>

        <ul className={styles.center}>
          {links.map(l => (
            <li key={l.id}>
              <button onClick={() => scrollTo(l.id)}>{l.label}</button>
            </li>
          ))}
        </ul>

        <div className={styles.right}>
          <button
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            <i className={`fas fa-moon ${styles.themeIcon} ${styles.moon}`} />
            <i className={`fas fa-sun  ${styles.themeIcon} ${styles.sun}`} />
            <span className={styles.knob} />
          </button>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}>{l.label}</button>
          ))}
        </div>
      )}
    </>
  );
}
