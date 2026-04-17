import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Componente de imagen con lazy loading optimizado
 * Soporta WebP, fallback, loading states y animaciones
 */
export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  webpSrc = null,
  placeholder = '/api/placeholder/400/300',
  onLoad = null,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generar srcset responsive
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return '';
    
    const widths = [400, 800, 1200, 1600];
    return widths
      .map(width => {
        const url = new URL(baseSrc, window.location.origin);
        url.searchParams.set('w', width);
        url.searchParams.set('fit', 'max');
        return `${url.toString()} ${width}w`;
      })
      .join(', ');
  };

  // Determinar qué imagen cargar
  const imageSrc = hasError ? placeholder : (isInView ? src : placeholder);
  const webpImageSrc = webpSrc && !hasError ? webpSrc : null;

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Placeholder con blur */}
      <motion.img
        src={placeholder}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
          isLoaded ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        }`}
        style={{ filter: 'blur(20px)' }}
      />
      
      {/* Imagen principal */}
      {isInView && (
        <picture>
          {webpImageSrc && (
            <source
              srcSet={generateSrcSet(webpImageSrc)}
              type="image/webp"
            />
          )}
          <img
            src={imageSrc}
            srcSet={generateSrcSet(imageSrc)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={alt}
            className={`relative w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            onLoad={() => {
              setIsLoaded(true);
              onLoad?.();
            }}
            onError={() => {
              setHasError(true);
            }}
            loading="lazy"
            decoding="async"
          />
        </picture>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

/**
 * Componente optimizado para imágenes de hero
 */
export function HeroImage({ src, alt, className = '', ...props }) {
  return (
    <LazyImage
      src={src}
      alt={alt}
      className={className}
      webpSrc={src.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
      priority={true}
      {...props}
    />
  );
}

/**
 * Componente para galería de imágenes
 */
export function GalleryImage({ src, alt, className = '', onClick, ...props }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative cursor-pointer overflow-hidden rounded-lg ${className}`}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      {...props}
    >
      <LazyImage
        src={src}
        alt={alt}
        className="w-full h-full"
      />
      
      {/* Overlay en hover */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center"
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="text-white opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ delay: 0.1 }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
