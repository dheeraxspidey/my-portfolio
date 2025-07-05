import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

let lenis = null;

export const useLenis = () => {
  useEffect(() => {
    // Initialize Lenis
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation frame loop
    function raf(time) {
      if (lenis) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };
  }, []);

  return lenis;
};

export const scrollToSection = (target) => {
  if (lenis) {
    lenis.scrollTo(target, {
      offset: -80, // Account for navbar height
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }
};
