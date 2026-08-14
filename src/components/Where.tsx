import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Where.css';

gsap.registerPlugin(ScrollTrigger);

const places = [
  {
    id: 'temple',
    title: 'Temple',
    subtitle: '',
    description: 'The principal venue for Theyyam. Village temples across North Malabar host annual festivals where specific deities are invoked through ritual performance.',
    image: '/images/01-aadidev-cv-37989105.jpg',
  },
  {
    id: 'tharavadu',
    title: 'Tharavadu',
    subtitle: 'Family Shrine',
    description: 'Many Theyyam performances take place at ancestral family shrines, where deities specific to the lineage are honored through intimate, deeply personal ceremonies.',
    image: '/images/04-adhwaith-chandran-13613095.jpg',
  },
  {
    id: 'sacred-grove',
    title: 'Sacred Grove',
    subtitle: '',
    description: 'Ancient sacred groves — patches of protected forest tied to serpent worship and nature deities — serve as sites for specific Theyyam rituals connected to the land itself.',
    image: '/images/06-trav-photography-38002529.jpg',
  }
];

const Where: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const tilesRef = useRef<HTMLAnchorElement[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });

      tl.fromTo(eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
      .fromTo(headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(tilesRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      );
    } else {
      gsap.set([eyebrowRef.current, headlineRef.current, ...tilesRef.current], { opacity: 1 });
    }
  }, { scope: containerRef });

  return (
    <section id="where" className="whereSection" ref={containerRef}>
      <div className="whereContainer">
        <div className="where__eyebrow" ref={eyebrowRef}>05 / THE PLACES</div>
        <h2 className="where__headline" ref={headlineRef}>WHERE TO EXPERIENCE IT</h2>

        <div className="where__grid">
          {places.map((place, index) => (
            <a 
              href={`#${place.id}`} 
              key={place.id} 
              className="where__tile"
              ref={el => {
                if (el) tilesRef.current[index] = el;
              }}
            >
              <div className="where__image-wrapper">
                <img src={place.image} alt={place.title} className="where__image" />
              </div>
              <div className="where__content">
                <h3 className="where__title">{place.title}</h3>
                {place.subtitle && <div className="where__subtitle">{place.subtitle}</div>}
                <p className="where__desc">{place.description}</p>
                <div className="where__explore">
                  Explore <span className="where__arrow">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Where;
