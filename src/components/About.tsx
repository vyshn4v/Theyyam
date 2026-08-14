import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(labelRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      tl.fromTo(quoteRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      tl.fromTo(imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        '-=0.5'
      );

      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll('p');
        tl.fromTo(paragraphs,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
          '-=0.6'
        );
      }

      gsap.to(imgInnerRef.current, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__container">
        <div className="about__layout">
          
          <div className="about__label-col">
            <p className="about__label" ref={labelRef}>01 / THE RITUAL</p>
          </div>

          <div className="about__quote-col">
            <blockquote className="about__quote" ref={quoteRef}>
              "Here, the divine does not stay behind a temple door."
            </blockquote>
          </div>

          <div className="about__image-wrapper" ref={imageRef}>
            <img 
              src="/images/03-adhwaith-chandran-20258861.jpg" 
              alt="Theyyam close-up portrait" 
              className="about__image"
              ref={imgInnerRef}
            />
            <div className="about__credit">Photography by Adhwaith Chandran</div>
          </div>

          <div className="about__text-col">
            <div className="about__text" ref={textRef}>
              <p>
                Theyyam is a ritual art tradition of North Malabar, Kerala, in which performance, music, elaborate costume, intricate makeup, ritual ceremony, and community life come together. It is not simply entertainment — it is an act of devotion, a living bridge between the human and the divine.
              </p>
              <p>
                The performer does not merely portray a deity. Through rigorous preparation, discipline, prayer, and the transformative power of costume, music, and movement, the performer is believed to become the deity — a living, breathing divine presence among the community.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
