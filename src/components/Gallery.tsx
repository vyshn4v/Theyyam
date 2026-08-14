import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  photographer: string;
  url: string;
  className: string;
}

const images: GalleryImage[] = [
  {
    id: 'img-1',
    src: '/images/04-adhwaith-chandran-13613095.jpg',
    alt: 'Large hero portrait of Theyyam performer',
    photographer: 'Adhwaith Chandran',
    url: 'https://www.pexels.com/photo/man-wearing-makeup-and-costume-for-theyyam-ritual-13613095/',
    className: 'gallery__item--hero-left'
  },
  {
    id: 'img-2',
    src: '/images/03-adhwaith-chandran-20258861.jpg',
    alt: 'Close-up portrait with red makeup',
    photographer: 'Adhwaith Chandran',
    url: 'https://www.pexels.com/photo/person-with-red-makeup-in-buddhist-makeup-20258861/',
    className: 'gallery__item--hero-right'
  },
  {
    id: 'img-3',
    src: '/images/02-sargaraj-tr-31280628.jpg',
    alt: 'Traditional Theyyam ritual performance with fire',
    photographer: 'Sargaraj Tr',
    url: 'https://www.pexels.com/photo/traditional-theyyam-ritual-performance-with-fire-31280628/',
    className: 'gallery__item--medium-left'
  },
  {
    id: 'img-4',
    src: '/images/05-chrissannah-mecanzie-29370665.jpg',
    alt: 'Traditional Theyyam performance with fire display',
    photographer: 'chrissannah mecanzie',
    url: 'https://www.pexels.com/photo/traditional-theyyam-performance-with-fire-display-29370665/',
    className: 'gallery__item--medium-right'
  },
  {
    id: 'img-5',
    src: '/images/01-aadidev-cv-37989105.jpg',
    alt: 'Vibrant Theyyam ritual in Kerala',
    photographer: 'Aadidev c v',
    url: 'https://www.pexels.com/photo/vibrant-theyyam-ritual-in-kerala-37989105/',
    className: 'gallery__item--small-left'
  },
  {
    id: 'img-6',
    src: '/images/06-trav-photography-38002529.jpg',
    alt: 'Vibrant Theyyam performance in outdoor festival',
    photographer: 'TRAV PHOTOGRAPHY',
    url: 'https://www.pexels.com/photo/vibrant-theyyam-performance-in-outdoor-festival-38002529/',
    className: 'gallery__item--wide-right'
  }
];

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        // Grid items reveal
        gsap.fromTo(
          '.gallery__item',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            }
          }
        );

        // Subtle parallax on the largest image (desktop only)
        if (window.innerWidth >= 768) {
          gsap.fromTo(
            '.gallery__item--hero-left img',
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: '.gallery__item--hero-left',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Keyboard navigation and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'Tab':
          // Basic focus trap
          if (lightboxRef.current) {
            const focusableElements = lightboxRef.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (lightboxOpen) {
      closeButtonRef.current?.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen]);

  const currentImage = images[currentImageIndex];

  return (
    <section id="gallery" className="gallery" ref={sectionRef}>
      <div className="gallery__container">
        <header className="gallery__header">
          <p className="gallery__eyebrow">06 / THE GALLERY</p>
          <h2 className="gallery__headline">FACES, FIRE, FORM</h2>
        </header>

        <div className="gallery__grid" ref={gridRef}>
          {images.map((img, index) => (
            <div 
              key={img.id}
              className={`gallery__item ${img.className}`}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              aria-label={`View photo by ${img.photographer}`}
            >
              <div className="gallery__item-inner">
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery__item-overlay">
                  <p>Photo by {img.photographer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div 
          className="gallery__lightbox" 
          ref={lightboxRef}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          <button 
            className="gallery__lightbox-close"
            onClick={closeLightbox}
            ref={closeButtonRef}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <button 
            className="gallery__lightbox-nav gallery__lightbox-nav--prev"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="gallery__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={currentImage.src} alt={currentImage.alt} />
            <div className="gallery__lightbox-info">
              <p>Photo by {currentImage.photographer}</p>
              <a href={currentImage.url} target="_blank" rel="noopener noreferrer">
                View on Pexels
              </a>
            </div>
          </div>

          <button 
            className="gallery__lightbox-nav gallery__lightbox-nav--next"
            onClick={nextImage}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
