import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Kannur.css';

gsap.registerPlugin(ScrollTrigger);

const Kannur: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const largeImgRef = useRef<HTMLImageElement>(null);
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      // Masked reveal for headlines
      tl.from('.kannur__reveal > *', {
        yPercent: 100,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
      })
      // Fade up for body text
      .from('.kannur-body', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8')
      // Opacity reveal for large image wrapper
      .from('.kannur-large-img-wrapper', {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      }, '-=0.6')
      // Small image enters slightly after + subtle scale
      .from('.kannur-small-img-wrapper', {
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.8')
      .from('.kannur-small-img', {
        scale: 1.03,
        duration: 1.5,
        ease: 'power2.out',
      }, '<')
      // Fade in locator
      .from('.kannur-locator', {
        opacity: 0,
        y: 10,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.8');

      // Parallax for large image
      if (largeImgRef.current) {
        gsap.fromTo(largeImgRef.current, 
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: '.kannur-visuals',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section id="kannur" className="kannur-section" ref={sectionRef}>
      <div className="kannur-container">
        <div className="kannur-label">02 / THE HEARTLAND</div>
        
        <div className="kannur-header">
          <div className="kannur-headline">
            <div className="kannur__reveal">
              <h2 className="kannur-title">KANNUR</h2>
            </div>
            <div className="kannur__reveal kannur__subtitle-wrap">
              <p className="kannur-subtitle">Where the ritual still belongs to the village night.</p>
            </div>
          </div>
          
          <div className="kannur-body">
            <p>
              In the villages and temples of Kannur and across North Malabar, Theyyam is not a performance staged for audiences — it is woven into the fabric of daily life. Performances are associated with temples, ancestral shrines, sacred groves, and the communal rhythms of village existence.
            </p>
            <p>
              The red earth, the coconut groves, the night air filled with percussion — Kannur is not merely a location. It is the landscape that gives Theyyam its meaning.
            </p>
          </div>
        </div>

        <div className="kannur-visuals">
          <div className="kannur-large-img-wrapper">
            <img 
              ref={largeImgRef}
              src="/images/02-sargaraj-tr-31280628.jpg" 
              alt="Theyyam ritual by Sargaraj TR" 
              className="kannur-large-img" 
            />
            <div className="kannur__credit">Photo: Sargaraj TR</div>
          </div>
          
          <div className="kannur-small-img-wrapper">
            <img 
              src="/images/06-trav-photography-38002529.jpg" 
              alt="Theyyam festival by Trav Photography" 
              className="kannur-small-img" 
            />
            <div className="kannur__credit">Photo: Trav Photography</div>
          </div>
        </div>

        <div className="kannur-locator">
          Kannur · Kerala
        </div>
      </div>
    </section>
  );
};

export default Kannur;
