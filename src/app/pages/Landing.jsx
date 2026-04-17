import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroCarousel } from '../components/HeroCarousel';
import { Services } from '../components/Services';
import { About } from '../components/About';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { ConversionPopup } from '../components/ConversionPopup';
import { SEO } from '../components/SEO';
import { config } from '../../config/activePreset.js';
import { initAnalytics, trackScrollDepth } from '../../lib/analytics.js';
import { Toaster } from '../components/ui/sonner';

export function Landing() {
  useEffect(() => {
    // Inicializar analytics
    initAnalytics();

    // SEO: Actualizar título y meta description
    document.title = config.seo.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.seo.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = config.seo.description;
      document.head.appendChild(meta);
    }

    // SEO: Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', config.seo.keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = config.seo.keywords;
      document.head.appendChild(meta);
    }

    // Track scroll depth
    let scrollTracked = {
      '25': false,
      '50': false,
      '75': false,
      '100': false,
    };

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      Object.keys(scrollTracked).forEach(threshold => {
        if (!scrollTracked[threshold] && scrollPercentage >= parseInt(threshold)) {
          trackScrollDepth(parseInt(threshold));
          scrollTracked[threshold] = true;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <SEO />

      {/* Toast notifications */}
      <Toaster position="top-right" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <HeroCarousel />
        <Services />
        <About />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Elements */}
      <WhatsAppButton />
      <ConversionPopup />
    </div>
  );
}

export default Landing;