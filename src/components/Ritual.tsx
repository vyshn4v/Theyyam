import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Ritual.css';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    id: '01',
    name: 'Preparation',
    image: '/images/04-adhwaith-chandran-13613095.jpg',
    text: 'Days of discipline, prayer, and fasting precede the transformation. The performer prepares body and mind through strict ritual observance, readying themselves to receive the divine presence.',
    photographer: 'Adhwaith Chandran'
  },
  {
    id: '02',
    name: 'Invocation',
    image: '/images/02-sargaraj-tr-31280628.jpg',
    text: 'The chenda drums begin. Ritual songs fill the air. The ceremonial space is prepared — boundaries are drawn, offerings are placed, and the atmosphere shifts from the everyday to the sacred.',
    photographer: 'Sargaraj Tr'
  },
  {
    id: '03',
    name: 'Adornment',
    image: '/images/03-adhwaith-chandran-20258861.jpg',
    text: 'The elaborate makeup — vivid reds, blacks, and golds applied over hours — is not cosmetic. Each line, each color carries meaning. The towering headgear and costume complete the transformation.',
    photographer: 'Adhwaith Chandran'
  },
  {
    id: '04',
    name: 'Performance',
    image: '/images/05-chrissannah-mecanzie-29370665.jpg',
    text: 'Movement, music, fire, and ritual acts merge. The performer moves through prescribed sequences — each gesture, each step carrying centuries of tradition and spiritual significance.',
    photographer: 'chrissannah mecanzie'
  },
  {
    id: '05',
    name: 'Encounter',
    image: '/images/01-aadidev-cv-37989105.jpg',
    text: 'The community gathers. The deity — now present, embodied, living — blesses, advises, and moves among the people. This is not spectatorship. It is communion.',
    photographer: 'Aadidev c v'
  }
];

const Ritual: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;
            
            // Calculate total scroll distance
            const getScrollAmount = () => {
                let trackWidth = track.scrollWidth;
                return trackWidth - window.innerWidth;
            };
            
            gsap.to(track, {
                x: () => -getScrollAmount(),
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    start: 'center center',
                    end: () => `+=${getScrollAmount()}`,
                    invalidateOnRefresh: true,
                }
            });

            gsap.to(progressRef.current, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    scrub: 1,
                    start: 'center center',
                    end: () => `+=${getScrollAmount()}`,
                    invalidateOnRefresh: true,
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="ritual" className="ritual-section" ref={sectionRef}>
            <div className="ritual-header-wrapper">
                <div className="ritual-header">
                    <span className="ritual-eyebrow">03 / THE RITUAL</span>
                    <h2 className="ritual-title">THE RITUAL</h2>
                    <p className="ritual-subtitle">How it unfolds.</p>
                </div>
            </div>
            
            <div className="ritual-track-container">
                <div className="ritual-track" ref={trackRef}>
                    {stages.map((stage) => (
                        <div key={stage.id} className="ritual-card">
                            <div className="ritual-card-inner">
                                <div className="ritual-image-wrapper">
                                    <img src={stage.image} alt={stage.name} className="ritual-image" />
                                    <div className="ritual-photographer">Photo by {stage.photographer}</div>
                                </div>
                                <div className="ritual-text-wrapper">
                                    <div className="ritual-number">{stage.id}</div>
                                    <div className="ritual-text-content">
                                        <h3 className="ritual-stage-name">{stage.name}</h3>
                                        <p className="ritual-stage-text">{stage.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="ritual-progress-wrapper">
                <div className="ritual-progress-track">
                    <div className="ritual-progress-bar" ref={progressRef}></div>
                </div>
            </div>
        </section>
    );
};

export default Ritual;
