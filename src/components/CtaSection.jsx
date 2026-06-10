import Countdown from './Countdown';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './CtaSection.module.css';

const painPoints = [
  'Replying the same DMs over and over — prices, availability, how to order',
  'Sending the same product photos and videos every single time',
  'Watching potential buyers scroll past because you have no credible presence',
  'Losing 30–60% of your sales to competitors who simply look more professional',
];

const included = [
  { icon: 'fa-paint-brush', text: 'Custom design matched to your brand colours, tone and audience' },
  { icon: 'fa-bolt',        text: 'Fast turnaround — we move at your pace' },
  { icon: 'fa-headset',     text: 'We handle everything — you just show up and approve' },
  {
    icon: 'fa-gift',
    text: 'Free industry bonus — one per sector (pharmacy, fashion, real estate, food, ministry & more)',
  },
];

const bonuses = [
  {
    tag: 'Bonus 1', icon: 'fa-tools',
    text: '3 Months Free Maintenance — we keep your site updated, secure and running smoothly at no extra cost',
  },
  {
    tag: 'Bonus 2', icon: 'fa-credit-card',
    text: 'Flexible payment — Split into 2: pay 70% to start, 30% on delivery',
  },
  {
    tag: 'Bonus 3', icon: 'fa-bolt',
    text: 'Live website demo — within 48 hours see a real site built for your exact industry. No pressure',
  },
];

export default function CtaSection() {
  const left  = useScrollReveal();
  const right = useScrollReveal();
  const box   = useScrollReveal();

  const scrollToForm = () =>
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={styles.section} id="start" aria-label="Get Started">
      <div className={styles.orb1} aria-hidden />
      <div className={styles.orb2} aria-hidden />

      <div className={styles.grid}>
        {/* ── LEFT ── */}
        <div
          ref={left.ref}
          className={`${styles.left} ${left.visible ? styles.visible : ''}`}
        >
          <div className={styles.alarm}>
            <i className="fas fa-hourglass-half" /> Think About This
          </div>
          <h2 className={styles.h2}>
            Six Months From Now, Will You Wish You Had <em>Started Today?</em>
          </h2>
          <p className={styles.intro}>
            Right now, every day you operate without a professional website,{' '}
            <strong>you are personally handling the work a website could automate for you.</strong>
          </p>

          <ul className={styles.painList}>
            {painPoints.map((p, i) => (
              <li key={i}>
                <i className="fas fa-times-circle" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div
            ref={box.ref}
            className={`${styles.futureBox} ${box.visible ? styles.visible : ''}`}
          >
            Imagine it's six months from now. Your website has been live. Customers find you,
            browse your work, read your story — and contact you. You wake up to enquiries.
            You close deals from people you never even spoke to first. What would that be worth to you?
          </div>

          <p className={styles.closer}>
            <span className={styles.hl}>
              Your website doesn't sleep. It doesn't get tired. It doesn't forget to follow up.
            </span>{' '}
            It represents you perfectly, 24 hours a day — and it pays for itself many times over.
          </p>
        </div>

        {/* ── RIGHT (offer card) ── */}
        <div
          ref={right.ref}
          className={`${styles.cardWrap} ${right.visible ? styles.visible : ''}`}
        >
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              We Build <em>Your</em> Website — Designed for Your Brand &amp; Goals
            </h3>
            <p className={styles.cardSub}>
              A new site, built from scratch around what makes your business unique.
              Not a template. Not generic. Yours.
            </p>

            <div className={styles.priceBadge}>
              <div>
                <div className={styles.priceLabel}>Starting from</div>
                <div className={styles.priceValue}>
                  ₦250,000 <span>/ $300</span>
                </div>
              </div>
              <div className={styles.priceNote}>Custom-built<br />for your brand</div>
            </div>

            <Countdown />

            {/* Included */}
            <div className={styles.bonusesHeader}>
              <i className="fas fa-star" /> What's included
            </div>
            <ul className={styles.bonusList}>
              {included.map((item, i) => (
                <li key={i}>
                  <i className={`fas ${item.icon}`} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <hr className={styles.divider} />

            {/* Bonuses */}
            <div className={styles.bonusesHeader}>
              <i className="fas fa-crown" /> 3 Free Bonuses — This Week Only
            </div>
            <ul className={styles.bonusList}>
              {bonuses.map((b, i) => (
                <li key={i}>
                  <i className={`fas ${b.icon}`} />
                  <span>
                    <span className={styles.bonusTag}>{b.tag}</span>
                    <strong dangerouslySetInnerHTML={{ __html: b.text.split('—')[0] }} />
                    {b.text.includes('—') ? ` — ${b.text.split('—').slice(1).join('—')}` : ''}
                  </span>
                </li>
              ))}
            </ul>

            {/* Secret */}
            <div className={styles.secretBox}>
              <i className="fas fa-lock" />
              <p>
                <strong>Our client secret:</strong> Every site we build includes a hidden strategy
                we only share with paying clients — a specific setup that turns your website into
                a sales engine that generates enquiries while you sleep.
              </p>
            </div>

            {/* CTAs */}
            <div className={styles.btnStack}>
              <button className="btn btn-gold" onClick={scrollToForm}>
                <i className="fas fa-rocket" /> Claim Your Bonuses &amp; Start Now
              </button>
              <a
                href="https://wa.me/+2347063730930"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <i className="fab fa-whatsapp" /> Chat on WhatsApp
              </a>
            </div>

            <p className={styles.disclaimer}>
              Bonuses are limited. <strong>Offer closes June 13th.</strong>
              <br />Don't let a competitor in your sector take yours first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
