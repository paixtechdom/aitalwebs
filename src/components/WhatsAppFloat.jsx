import { useState, useEffect } from 'react';
import styles from './WhatsAppFloat.module.css';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className={`${styles.float} ${visible ? styles.visible : ''}`}>
      <a
        href="https://wa.me/+2347063730930"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp" />
      </a>
    </div>
  );
}
