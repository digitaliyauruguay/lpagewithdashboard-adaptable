import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { config } from '../../config/activePreset.js';
import { saveLead } from '../../lib/airtable.js';
import { trackLead } from '../../lib/analytics.js';
import { toast } from 'sonner';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Guardar en Airtable
      const result = await saveLead({
        ...formData,
        source: 'Website',
      });

      if (result.success) {
        // Trackear conversión en analytics
        trackLead(formData);

        // Mostrar mensaje de éxito
        toast.success(config.contactForm.successMessage);
        setSubmitted(true);

        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: '',
        });

        // Volver a estado inicial después de 5s
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error(result.message || 'Error al enviar. Intenta por WhatsApp.');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      toast.error('Error al enviar. Intenta por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              {config.contactForm.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {config.contactForm.subtitle}
            </p>

            {submitted ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  ¡Consulta enviada!
                </h3>
                <p className="text-green-700">
                  Te contactamos pronto por WhatsApp o teléfono
                </p>
              </motion.div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {config.contactForm.fields.map((field) => {
                  if (field.type === 'select') {
                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required={field.required}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:border-transparent transition-all outline-none"
                          style={{
                            '--tw-ring-color': config.theme.primary,
                          }}
                          onFocus={(e) => {
                            e.target.style.boxShadow = `0 0 0 2px ${config.theme.primary}40`;
                          }}
                          onBlur={(e) => {
                            e.target.style.boxShadow = '';
                          }}
                        >
                          <option value="">Seleccionar...</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  if (field.type === 'textarea') {
                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <textarea
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required={field.required}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:border-transparent transition-all outline-none resize-none"
                          onFocus={(e) => {
                            e.target.style.boxShadow = `0 0 0 2px ${config.theme.primary}40`;
                          }}
                          onBlur={(e) => {
                            e.target.style.boxShadow = '';
                          }}
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:border-transparent transition-all outline-none"
                        onFocus={(e) => {
                          e.target.style.boxShadow = `0 0 0 2px ${config.theme.primary}40`;
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                        }}
                      />
                    </div>
                  );
                })}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: config.theme.primary,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) e.target.style.backgroundColor = config.theme.primaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = config.theme.primary;
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{config.contactForm.submitText}</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Phone */}
              <a
                href={`tel:${config.contact.phone}`}
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: config.theme.primary + '20' }}
                >
                  <Phone 
                    className="w-6 h-6" 
                    style={{ stroke: config.theme.primary }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                  <p className="text-gray-600">{config.contact.phoneDisplay}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${config.contact.email}`}
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: config.theme.primary + '20' }}
                >
                  <Mail 
                    className="w-6 h-6" 
                    style={{ stroke: config.theme.primary }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">{config.contact.email}</p>
                </div>
              </a>

              {/* Address */}
              <a
                href={config.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: config.theme.primary + '20' }}
                >
                  <MapPin 
                    className="w-6 h-6" 
                    style={{ stroke: config.theme.primary }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                  <p className="text-gray-600">{config.contact.address}</p>
                </div>
              </a>

              {/* Schedule */}
              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: config.theme.primary + '20' }}
                >
                  <Clock 
                    className="w-6 h-6" 
                    style={{ stroke: config.theme.primary }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Horarios</h3>
                  <p className="text-gray-600 text-sm">{config.schedule.weekdays}</p>
                  <p className="text-gray-600 text-sm">{config.schedule.weekend}</p>
                  {config.schedule.emergency && (
                    <p 
                      className="text-sm font-semibold mt-1"
                      style={{ color: config.theme.primary }}
                    >
                      {config.schedule.emergency}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Social Links */}
            {(config.social.facebook || config.social.instagram) && (
              <div className="pt-4">
                <h3 className="font-semibold text-gray-900 mb-4">Seguinos</h3>
                <div className="flex space-x-4">
                  {config.social.facebook && (
                    <a
                      href={config.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                  {config.social.instagram && (
                    <a
                      href={config.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
