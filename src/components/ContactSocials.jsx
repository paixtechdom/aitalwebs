import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './ContactSocials.module.css';

export default function ContactSocials() {
  const inner = useScrollReveal();

  return (
    <section className={styles.section} id="contact" aria-label="Contact">
      <div
        ref={inner.ref}
        className={`${styles.inner} ${inner.visible ? styles.visible : ''}`}
      >
        <div className="section-label">// Contact</div>
        <h2 className="section-title">
          Your Website is One <em>Conversation Away</em>
        </h2>
        <p>
          Reach out now. Tell us about your business and we'll show you exactly what your
          website could look like — and what it could do for you.
        </p>

        <div className={styles.grid}>
          <a href="https://wa.me/+2347063730930" className={styles.item}>
            <i className="fab fa-whatsapp" /> +234 706 373 0930
          </a>
          <a href="tel:+2348112159799" className={styles.item}>
            <i className="fas fa-phone" /> +234 811 215 9799
          </a>
          <a href="mailto:aitaltechvolution@gmail.com" className={styles.item}>
            <i className="fas fa-envelope" /> aitaltechvolution@gmail.com
          </a>
        </div>

        <div className={styles.social}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialBtn} ${styles.instagram}`}
            aria-label="Instagram"
          >
            <i className="fab fa-instagram" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialBtn} ${styles.facebook}`}
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialBtn} ${styles.linkedin}`}
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
      </div>
    </section>
  );
}
