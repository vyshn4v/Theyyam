import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Season.css';

gsap.registerPlugin(ScrollTrigger);

const months = ['OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY'];

const Season: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set('.season__reveal, .season__month', { opacity: 1, y: 0 });
      gsap.set(lineRef.current, { height: 80 });
      gsap.set(copyRef.current?.children || [], { opacity: 1, y: 0 });
      gsap.set('.season__hline', { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Main reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo(
        '.season__reveal',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      )
      .fromTo(
        lineRef.current,
        { height: 0 },
        { height: 80, duration: 1, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        copyRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        '.season__month',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.season__hline',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power2.inOut', transformOrigin: 'left center' },
        '-=0.5'
      );

      // Scrubbing dot animation
      gsap.fromTo(
        dotRef.current,
        { left: '0%' },
        {
          left: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 90%',
            end: 'bottom 10%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section id="season" className="season" ref={sectionRef}>
      <div className="container">
        <p className="season__eyebrow season__reveal">04 / THE SEASON</p>
        
        <div className="season__headline-container">
          <h2 className="season-heading season__reveal">THE SEASON</h2>
          <div className="season-range">
            <span className="season__reveal season__month-large">MID<span className="season__hyphen">–</span>OCTOBER</span>
            <span className="season__reveal season__arrow">→</span>
            <span className="season__reveal season__month-large">MAY</span>
          </div>
        </div>

        <div className="season__vline" ref={lineRef}></div>

        <div className="season__support" ref={copyRef}>
          <p className="season__copy">
            The Theyyam season generally begins around the tenth day of the Malayalam month of Thulaam and continues until around the middle of Edavam.
          </p>
          <div className="season__notes">
            <p>Best approach: check the individual temple or family shrine schedule.</p>
            <p>Exact performance dates vary by venue and ritual calendar.</p>
          </div>
        </div>

        <div className="season__timeline" ref={timelineRef}>
          <div className="season__hline"></div>
          <div className="season__dot" ref={dotRef}></div>
          <div className="season__months">
            {months.map((month, index) => (
              <span key={index} className="season__month">
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Season;
