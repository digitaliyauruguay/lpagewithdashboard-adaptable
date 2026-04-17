import { useState, useEffect } from 'react';
import { Menu, X, Phone, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../../config/activePreset.js';
import { trackCTAClick, trackPhoneClick } from '../../lib/analytics.js';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleCTAClick = () => {
    trackCTAClick('Navbar CTA', 'Header');
    scrollToSection('contacto');
  };

  const handlePhoneClick = () => {
    trackPhoneClick();
  };

  const navLinks = [
    { label: 'Inicio', href: 'hero' },
    { label: 'Servicios', href: 'servicios' },
    { label: 'Nosotros', href: 'nosotros' },
    { label: 'Testimonios', href: 'testimonios' },
    { label: 'FAQ', href: 'faq' },
    { label: 'Contacto', href: 'contacto' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: config.theme.primary }}
            >
              {config.businessName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-gray-900 group-hover:opacity-80 transition-opacity">
                {config.businessName}
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                {config.tagline}
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                style={{
                  '--hover-color': config.theme.primary,
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = config.theme.primary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '';
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${config.contact.phone}`}
              onClick={handlePhoneClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              style={{
                '--hover-color': config.theme.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = config.theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
              }}
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{config.contact.phoneDisplay}</span>
            </a>

            <a
              href="/login"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              title="Acceso administradores"
            >
              <LogIn className="w-4 h-4" />
            </a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCTAClick}
              className="px-6 py-2.5 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              style={{
                backgroundColor: config.theme.primary,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = config.theme.primaryHover;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = config.theme.primary;
              }}
            >
              {config.hero.ctaText}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    {link.label}
                  </button>
                ))}

                <a
                  href={`tel:${config.contact.phone}`}
                  onClick={handlePhoneClick}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{config.contact.phoneDisplay}</span>
                </a>

                <a
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Admin</span>
                </a>

                <button
                  onClick={handleCTAClick}
                  className="w-full px-6 py-3 rounded-lg text-white font-semibold"
                  style={{
                    backgroundColor: config.theme.primary,
                  }}
                >
                  {config.hero.ctaText}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
