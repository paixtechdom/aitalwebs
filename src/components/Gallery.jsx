import { useState, useEffect, useCallback } from 'react';
import { SCREENSHOTS } from '../utils/constants';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Gallery.module.css';

export default function Gallery() {
  const header = useScrollReveal();
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const open  = idx => setLightboxIdx(idx);
  const close = ()  => setLightboxIdx(null);
  const prev  = useCallback(() => setLightboxIdx(i => (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length), []);
  const next  = useCallback(() => setLightboxIdx(i => (i + 1) % SCREENSHOTS.length), []);

  useEffect(() => {
    if (lightboxIdx === null) { document.body.style.overflow = ''; return; }
    document.body.style.overflow = 'hidden';
    const onKey = e => {
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowRight')  next();
      if (e.key === 'ArrowLeft')   prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, next, prev]);

  return (
    <>
      <section className={styles.section} id="gallery" aria-label="Gallery">
        <div
          ref={header.ref}
          className={`${styles.header} ${header.visible ? styles.visible : ''}`}
        >
          <div className="section-label">// Our Work in Action</div>
          <h2 className="section-title">Real Sites, <em>Real Results</em></h2>
          <p>Screenshots of live websites we've designed and built — see the quality, detail and professionalism your business will get.</p>
        </div>

        <div className={styles.grid}>
          {SCREENSHOTS.map((shot, i) => (
            <button
              key={i}
              className={styles.item}
              onClick={() => open(i)}
              aria-label={`View screenshot ${i + 1}`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <img
                src={shot.src}
                alt={`Client website screenshot ${i + 1}`}
                loading="lazy"
                onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
              />
              <div className={styles.overlay}>
                <div className={styles.zoom}><i className="fas fa-expand" /></div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxIdx !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
          onClick={e => e.target === e.currentTarget && close()}
        >
          <div className={styles.lbInner}>
            <button className={styles.lbClose} onClick={close} aria-label="Close">
              <i className="fas fa-times" />
            </button>
            <button className={styles.lbPrev} onClick={prev} aria-label="Previous">
              <i className="fas fa-chevron-left" />
            </button>
            <div className={styles.lbImgWrap}>
              <img
                key={lightboxIdx}
                src={SCREENSHOTS[lightboxIdx].src}
                alt={`Screenshot ${lightboxIdx + 1}`}
                className={styles.lbImg}
              />
              <div className={styles.lbCaption}>
                <span className={styles.lbCounter}>
                  {lightboxIdx + 1} / {SCREENSHOTS.length}
                </span>
              </div>
            </div>
            <button className={styles.lbNext} onClick={next} aria-label="Next">
              <i className="fas fa-chevron-right" />
            </button>

            <div className={styles.lbThumbs}>
              {SCREENSHOTS.map((s, i) => (
                <img
                  key={i}
                  src={s.src}
                  alt={`Thumb ${i + 1}`}
                  className={`${styles.thumb} ${i === lightboxIdx ? styles.activeThumb : ''}`}
                  onClick={() => setLightboxIdx(i)}
                />
              ))}
            </div>
            <div className={styles.lbHint}>← → arrow keys to navigate &nbsp;·&nbsp; Esc to close</div>
          </div>
        </div>
      )}
    </>
  );
}
