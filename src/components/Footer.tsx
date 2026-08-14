import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const ctaTitleRef = useRef<HTMLHeadingElement>(null);
  const ctaSubtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const dividerRef = useRef<HTMLHRElement>(null);
  const footerContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%', // Start animation when top of section is 80% down the viewport
        },
      });

      tl.from(ctaTitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .from(ctaSubtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .from(ctaButtonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .from(dividerRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4')
      .from(footerContentRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4');
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="footer-section">
      <div className="cta-area">
        <div className="cta-content">
          <h2 ref={ctaTitleRef} className="cta-title">
            THE NIGHT IS NOT JUST A PERFORMANCE.
          </h2>
          <p ref={ctaSubtitleRef} className="cta-subtitle">
            It is memory, devotion, craft, music, and a living presence.
          </p>
          <a ref={ctaButtonRef} href="#about" className="cta-button">
            Explore More
          </a>
        </div>
      </div>

      <hr ref={dividerRef} className="footer-divider" />

      <div ref={footerContentRef} className="footer-bottom">
        <div className="footer-info">
          <span className="footer-brand">THEYYAM &middot; KANNUR</span>
          <span className="footer-tagline">
            A visual introduction to the ritual traditions of North Malabar
          </span>
        </div>
        
        <div className="footer-credits">
          Photographs by Aadidev c v, Sargaraj Tr, Adhwaith Chandran, chrissannah mecanzie, TRAV PHOTOGRAPHY via Pexels
        </div>
        
        <div className="footer-copyright">
          &copy; 2024 Theyyam Kannur
        </div>
      </div>
    </footer>
  );
};

export default Footer;
