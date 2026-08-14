import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './IntroLoader.css';

interface IntroLoaderProps {
  onComplete?: () => void;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(false);
      onCompleteRef.current?.();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          onCompleteRef.current?.();
        },
      });

      tl.set([eyebrowRef.current, titleRef.current], { autoAlpha: 0, y: 10 })
        .set(lineRef.current, { scaleX: 0, autoAlpha: 0 })
        .to(eyebrowRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
        .to(
          titleRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          lineRef.current,
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power4.out',
            transformOrigin: 'center center',
          },
          '-=0.4'
        )
        .to(
          containerRef.current,
          {
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            delay: 0.3,
          }
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="intro-loader" ref={containerRef}>
      <div className="intro-loader-content">
        <p className="intro-eyebrow" ref={eyebrowRef}>
          NORTH MALABAR · KANNUR
        </p>
        <h1 className="intro-title" ref={titleRef}>
          THEYYAM
        </h1>
        <div className="intro-line" ref={lineRef}></div>
      </div>
    </div>
  );
};

export default IntroLoader;
