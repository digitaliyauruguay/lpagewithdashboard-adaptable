import { motion } from 'framer-motion';
import { config } from '../../config/activePreset.js';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  // Obtener imagen según el rubro
  const getAboutImage = () => {
    if (config.industry === 'veterinaria') {
      return 'https://images.unsplash.com/photo-1730677769210-7b5a39d0635e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHZldGVyaW5hcmlhbiUyMHdpdGglMjBkb2d8ZW58MXx8fHwxNzc2MzgyODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
    } else if (config.industry === 'peluqueria') {
      return 'https://images.unsplash.com/photo-1580618662966-832a2dcea59f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGhhaXJzdHlsaXN0JTIwd29tYW4lMjBzYWxvbnxlbnwxfHx8fDE3NzYzODI4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
    }
    return 'https://images.unsplash.com/photo-1730677769210-7b5a39d0635e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHZldGVyaW5hcmlhbiUyMHdpdGglMjBkb2d8ZW58MXx8fHwxNzc2MzgyODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
  };

  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={getAboutImage()}
                alt={`Equipo de ${config.businessName}`}
                className="w-full h-[400px] lg:h-[550px] object-cover"
              />
            </div>

            {/* Decorative Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-[200px]"
            >
              <div 
                className="text-4xl font-bold mb-1"
                style={{ color: config.theme.primary }}
              >
                {config.about.stats[0]?.value || '10+'}
              </div>
              <div className="text-sm text-gray-600">
                {config.about.stats[0]?.label || 'Años de experiencia'}
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div 
              className="absolute -top-4 -left-4 w-24 h-24 rounded-full blur-3xl opacity-30"
              style={{ backgroundColor: config.theme.primary }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 order-1 lg:order-2"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span 
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ 
                  backgroundColor: config.theme.primary + '15',
                  color: config.theme.primary,
                }}
              >
                Sobre Nosotros
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900"
            >
              {config.about.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {config.about.description}
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-6 pt-4"
            >
              {config.about.stats.slice(1).map((stat, index) => (
                <div 
                  key={index}
                  className="border-l-4 pl-4"
                  style={{ borderColor: config.theme.primary }}
                >
                  <div 
                    className="text-3xl font-bold mb-1"
                    style={{ color: config.theme.primary }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href={`tel:${config.contact.phone}`}
                className="flex items-center justify-center sm:justify-start space-x-3 px-6 py-3 rounded-lg bg-white border-2 hover:shadow-md transition-all group"
                style={{ borderColor: config.theme.primary }}
              >
                <svg 
                  className="w-5 h-5 group-hover:scale-110 transition-transform" 
                  style={{ stroke: config.theme.primary }}
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span 
                  className="font-semibold"
                  style={{ color: config.theme.primary }}
                >
                  Llamar ahora
                </span>
              </a>

              <a
                href={config.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start space-x-3 px-6 py-3 rounded-lg bg-white border-2 border-gray-200 hover:shadow-md transition-all group"
              >
                <svg 
                  className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold text-gray-700">
                  Ver ubicación
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
