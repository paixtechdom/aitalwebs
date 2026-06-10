import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from './hooks/useTheme';

import ParticleCanvas   from './components/ParticleCanvas';
import Navbar           from './components/Navbar';
import Hero             from './components/Hero';
import CtaSection       from './components/CtaSection';
import Gallery          from './components/Gallery';
import Works            from './components/Works';
import About            from './components/About';
import ContactForm      from './components/ContactForm';
import ContactSocials   from './components/ContactSocials';
import WhatsAppFloat    from './components/WhatsAppFloat';

export default function App() {
  const { theme, toggle } = useTheme();

  /* Cursor spotlight */
  useEffect(() => {
    const el = document.getElementById('cursor-spotlight');
    if (!el) return;
    const handler = e => {
      el.style.left = e.clientX + 'px';
      el.style.top  = e.clientY + 'px';
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Aital Techvolution — Professional Websites That Win Customers</title>
        <meta name="description" content="Aital Techvolution builds modern, high-performance websites for businesses across Nigeria. Custom websites for pharmacies, fashion, real estate, ministries and more. Starting from ₦250,000." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aitaltechvolution.com" />
        {/* Open Graph */}
        <meta property="og:title"       content="Aital Techvolution — Professional Websites That Win Customers" />
        <meta property="og:description" content="Custom websites built to grow your Nigerian business. Starting from ₦250,000." />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://aitaltechvolution.com" />
        {/* JSON-LD structured data */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Aital Techvolution",
          "description": "Professional website design and development agency in Nigeria",
          "url": "https://aitaltechvolution.com",
          "telephone": "+2347063730930",
          "email": "aitaltechvolution@gmail.com",
          "address": { "@type": "PostalAddress", "addressCountry": "NG" },
          "priceRange": "₦₦₦",
          "serviceType": "Web Design and Development",
        })}</script>
      </Helmet>

      <div id="cursor-spotlight" className="cursor-spotlight" aria-hidden="true" />
      <ParticleCanvas />
      <WhatsAppFloat />
      <Navbar theme={theme} onToggleTheme={toggle} />

      <main>
        <Hero />
        <CtaSection />
        <Gallery />
        <Works />
        <About />
        <ContactForm />
        <ContactSocials />
      </main>

      <footer>
        <p>© {new Date().getFullYear()} <a href="#">Aital Techvolution</a>. All rights reserved.</p>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem' }}>Aital Techvolution</p>
      </footer>
    </>
  );
}


// re_EH3bEdSd_9JFHPpL9qi1qYSPJRXMo4XPR