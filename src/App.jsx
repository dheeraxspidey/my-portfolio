import React, { useState, useEffect, lazy, Suspense, useCallback, useRef } from 'react';
import BackgroundOverlay from './components/common/BackgroundOverlay';
import WaveBackground from './components/common/WaveBackground';
import Navbar from './components/layout/Navbar';

// Eager load critical components
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';

// Lazy load non-critical components
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ScrollToTop = lazy(() => import('./components/common/ScrollToTop'));

const LoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainContentRef = useRef(null);

  // Chrome-specific optimizations
  useEffect(() => {
    // Force hardware acceleration
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      clearTimeout(timer);
      document.body.style.transform = '';
      document.body.style.backfaceVisibility = '';
    };
  }, []);

  // Optimize scroll performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Your scroll handling code here
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <BackgroundOverlay />
      <WaveBackground />

      <div className="relative z-10 transform-gpu">
        <Navbar />

        <main ref={mainContentRef} className="container mx-auto px-4 md:px-6 py-8">
          {/* Critical sections rendered immediately */}
          <section className="mb-24 transform-gpu">
            <Hero />
          </section>

          <section className="mb-24 backdrop-blur-sm bg-gray-800/10 rounded-2xl p-8 transform-gpu">
            <About />
          </section>

          <section className="mb-24 backdrop-blur-sm bg-gray-800/10 rounded-2xl p-8 transform-gpu">
            <Skills />
          </section>

          {/* Non-critical sections lazy loaded */}
          <Suspense fallback={<LoadingSpinner />}>
            <section className="mb-24 transform-gpu">
              <Projects />
            </section>

            <section className="mb-24 transform-gpu">
              <Contact />
            </section>

            <Footer />
          </Suspense>
        </main>

        <div className="fixed bottom-8 right-8 transform-gpu">
          <Suspense fallback={null}>
            <ScrollToTop />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// Add display name for better debugging
App.displayName = 'Portfolio';

export default React.memo(App);
