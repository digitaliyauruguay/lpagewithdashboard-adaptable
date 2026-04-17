import { motion } from 'framer-motion';
import { config } from '../../config/activePreset.js';
import { 
  Stethoscope, Syringe, Activity, FlaskConical, Ambulance, 
  Scissors, Palette, Sparkles, Wind, Hand, Check
} from 'lucide-react';
import { trackCTAClick } from '../../lib/analytics.js';

// Map de íconos disponibles
const iconMap = {
  Stethoscope,
  Syringe,
  Activity,
  FlaskConical,
  Ambulance,
  Scissors,
  Palette,
  Sparkles,
  Wind,
  Hand,
  Sparkle: Sparkles, // Alias
};

export function Services() {
  const scrollToContact = () => {
    trackCTAClick('Service Card CTA', 'Services Section');
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-600">
            Soluciones profesionales adaptadas a tus necesidades
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Stethoscope;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer"
                onClick={scrollToContact}
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ 
                    backgroundColor: config.theme.primary + '15',
                  }}
                >
                  <IconComponent 
                    className="w-7 h-7" 
                    style={{ stroke: config.theme.primary }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                      <Check 
                        className="w-4 h-4 flex-shrink-0" 
                        style={{ stroke: config.theme.primary }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className="text-sm font-semibold flex items-center space-x-2 group-hover:gap-3 transition-all"
                  style={{ color: config.theme.primary }}
                >
                  <span>Consultar</span>
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="px-8 py-4 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all"
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
            Consultar todos los servicios
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
