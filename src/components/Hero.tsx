import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Hero.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const tl = gsap.timeline();

        // Image scale
        tl.fromTo(imageRef.current,
          { scale: 1.08 },
          { scale: 1, duration: 1.5, ease: 'power2.out' }
        );

        // Headline masked reveal
        tl.fromTo('.headline-word',
          { y: '100%' },
          { y: '0%', duration: 1, ease: 'power3.out', stagger: 0.1 },
          '-=1'
        );

        // Subline fade
        tl.fromTo(sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );

        // Meta fade
        tl.fromTo(metaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );

        // CTA enter
        tl.fromTo(ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );

        // Nav fade
        tl.fromTo(navRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.8'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef} id="home">
      <div className="hero-bg-wrapper">
        <img 
          src="/images/01-aadidev-cv-37989105.jpg" 
          alt="Theyyam performance" 
          className="hero-bg-image" 
          ref={imageRef} 
        />
        <div className="hero-bg-overlay"></div>
      </div>

      <header className="hero-header">
        <div className="hero-logo">THEYYAM</div>
        <nav className="hero-nav" ref={navRef}>
          <a href="#about">Theyyam</a>
          <a href="#where">Where</a>
          <a href="#season">When</a>
          <a href="#ritual">The Ritual</a>
          <a href="#gallery">Gallery</a>
          <a href="#explore" className="hero-nav-btn">Explore</a>
        </nav>
      </header>

      <div className="hero-content">
        <div className="hero-bottom-left">
          <h1 className="hero-headline" ref={headlineRef}>
            <div className="headline-mask">
              <span className="headline-word">THEYYAM</span>
            </div>
          </h1>
          <p className="hero-subline" ref={sublineRef}>
            A living tradition of Kannur.
          </p>
        </div>

        <div className="hero-bottom-right" ref={metaRef}>
          <div className="hero-meta">NORTH MALABAR</div>
          <div className="hero-meta">OCTOBER — MAY</div>
        </div>
      </div>

      <a href="#explore" className="hero-cta" ref={ctaRef}>
        <span>Explore Theyyam</span>
        <span className="hero-cta-arrow">↓</span>
      </a>
      
      <div className="hero-credit">
        Photo by Aadidev CV
      </div>
    </section>
  );
};

export default Hero;
