import styles from './Hero.module.css';

export default function Hero() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.videoBg}>
        <video autoPlay muted loop playsInline>
          <source src="/video/video1.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.videoOverlay} />

      <span className={styles.tag}>Aital Techvolution</span>

      <h1 className={styles.h1}>
        Your competitors are getting<br />
        <em>customers online</em> right now.<br />
        Is your business even <span className={styles.accentTeal}>showing up?</span>
      </h1>

      <p className={styles.sub}>
        Every day without a professional website is a day your competitors are
        winning customers that should be yours. Let's change that.
      </p>

      <div className={styles.cta}>
        <button className="btn btn-gold" onClick={() => scrollTo('start')}>
          <i className="fas fa-rocket" /> Get Your Website Now
        </button>
        <button className="btn btn-outline" onClick={() => scrollTo('works')}>
          <i className="fas fa-eye" /> See Our Work
        </button>
      </div>

      <div
        className={styles.scrollIndicator}
        role="button"
        tabIndex={0}
        aria-label="Scroll down"
        onClick={() => scrollTo('start')}
        onKeyDown={e => e.key === 'Enter' && scrollTo('start')}
      >
        <span>Scroll</span>
        <div className={styles.scrollArrow} />
      </div>
    </section>
  );
}
