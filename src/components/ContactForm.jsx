import { useState } from 'react';
import { sendContactEmail, sendSubscribeEmail } from '../utils/sendEmail';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const left  = useScrollReveal();
  const right = useScrollReveal();

  const [form, setForm]         = useState({ name: '', email: '', message: '' });
  const [formStatus, setStatus] = useState(null);

  const [subEmail, setSubEmail]   = useState('');
  const [subStatus, setSubStatus] = useState(null);
  const [subMsg, setSubMsg]       = useState('');

  async function handleSubmit() {
    const { name, email, message } = form;
    if (!name || !email || !message) { setStatus('error:fields'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('error:email'); return; }
    setStatus('loading');
    try {
      await sendContactEmail({ name, email, message });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 6000);
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error:send');
    }
  }

  async function handleSubscribe() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subEmail)) {
      setSubStatus('error');
      setSubMsg('Please enter a valid email address.');
      return;
    }
    setSubStatus('loading');
    setSubMsg('');
    try {
      await sendSubscribeEmail(subEmail);
      setSubStatus('success');
      setSubMsg("✓ You're subscribed! Great to have you.");
      setSubEmail('');
      setTimeout(() => { setSubStatus(null); setSubMsg(''); }, 5000);
    } catch (err) {
      console.error('Subscribe error:', err);
      setSubStatus('error');
      setSubMsg('Could not subscribe. Please try again later.');
    }
  }

  const statusMessages = {
    'error:fields': 'Please fill in all fields before sending.',
    'error:email':  'Please enter a valid email address.',
    'error:send':   `Something went wrong. Please email us directly at aitaltechvolution@gmail.com`,
    'success':      "✓ Message sent! We'll get back to you within 24 hours.",
    'loading':      null,
  };

  return (
    <section className={styles.section} id="contact-form" aria-label="Contact Form">
      <div className={styles.inner}>

        <div
          ref={left.ref}
          className={`${styles.left} ${left.visible ? styles.visible : ''}`}
        >
          <div className="section-label">// Get In Touch</div>
          <h2 className={styles.h2}>
            Let's Build Something <em>Great Together</em>
          </h2>
          <p className={styles.sub}>
            Tell us about your business, your goals, and what you'd love your website to do.
            We'll get back to you within 24 hours.
          </p>

          <ul className={styles.contactList}>
            <li>
              <i className="fab fa-whatsapp" />
              <a href="https://wa.me/+2347063730930">+234 706 373 0930</a>
            </li>
            <li>
              <i className="fas fa-phone" />
              <a href="tel:+2348112159799">+234 811 215 9799</a>
            </li>
            <li>
              <i className="fas fa-envelope" />
              <a href="mailto:aitaltechvolution@gmail.com">aitaltechvolution@gmail.com</a>
            </li>
          </ul>

          <div className={styles.subscribeStrip}>
            <h4><i className="fas fa-bell" /> Stay in the loop</h4>
            <p>Get tips on growing your business online — no spam, just value. Unsubscribe anytime.</p>
            <div className={styles.subscribeRow}>
              <input
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                value={subEmail}
                onChange={e => setSubEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                disabled={subStatus === 'loading' || subStatus === 'success'}
              />
              <button
                onClick={handleSubscribe}
                disabled={subStatus === 'loading' || subStatus === 'success'}
              >
                {subStatus === 'loading'
                  ? <><i className="fas fa-spinner fa-spin" /> Subscribing…</>
                  : subStatus === 'success'
                  ? <><i className="fas fa-check" /> Done</>
                  : <><i className="fas fa-paper-plane" /> Subscribe</>
                }
              </button>
            </div>
            {subMsg && (
              <div className={`${styles.subMsg} ${subStatus === 'success' ? styles.subSuccess : styles.subError}`}>
                {subMsg}
              </div>
            )}
          </div>
        </div>

        <div
          ref={right.ref}
          className={`${styles.formCard} ${right.visible ? styles.visible : ''}`}
        >
          <h3>Send Us a Message</h3>
          <p>We read every message and respond personally.</p>

          <div className={styles.formGroup}>
            <label htmlFor="cf-name">Your Name</label>
            <input
              id="cf-name"
              type="text"
              placeholder="e.g. Adebayo Okonkwo"
              autoComplete="name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cf-email">Email Address</label>
            <input
              id="cf-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              rows={5}
              placeholder="Tell us about your business and what you need..."
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            />
          </div>

          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={formStatus === 'loading' || formStatus === 'success'}
          >
            {formStatus === 'loading'
              ? <><i className="fas fa-spinner fa-spin" /> Sending…</>
              : formStatus === 'success'
              ? <><i className="fas fa-check" /> Sent!</>
              : <><i className="fas fa-paper-plane" /> Send Message</>
            }
          </button>

          {formStatus && formStatus !== 'loading' && (
            <div
              className={`${styles.formStatus} ${
                formStatus === 'success' ? styles.statusSuccess : styles.statusError
              }`}
            >
              {statusMessages[formStatus]}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}