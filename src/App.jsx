import React, { useState, useEffect, lazy, Suspense, useCallback, useRef } from 'react';
import BackgroundOverlay from './components/common/BackgroundOverlay';
import WaveBackground from './components/common/WaveBackground';
import Navbar from './components/layout/Navbar';

// Lazy load components with prefetch
const Hero = lazy(() => import('./components/sections/Hero' /* webpackPrefetch: true */));
const About = lazy(() => import('./components/sections/About' /* webpackPrefetch: true */));
const Skills = lazy(() => import('./components/sections/Skills' /* webpackPrefetch: true */));
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ScrollToTop = lazy(() => import('./components/common/ScrollToTop'));

// Memoized loading components
const LoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div className="relative p-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin" />
        <p className="text-blue-400 font-medium tracking-wider">Loading...</p>
      </div>
    </div>
  </div>
));

const SectionLoadingFallback = React.memo(() => (
  <div className="m-4 p-6 rounded-xl bg-gray-800/30 animate-pulse">
    <div className="space-y-4">
      <div className="h-8 bg-gray-700/50 rounded-lg w-3/4" />
      <div className="h-4 bg-gray-700/50 rounded-lg w-full" />
      <div className="h-4 bg-gray-700/50 rounded-lg w-5/6" />
    </div>
  </div>
));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const sectionsRef = useRef(new Map());
  const [mountedSections, setMountedSections] = useState(new Set());

  // Intersection Observer setup
  useEffect(() => {
    const observerOptions = {
      rootMargin: '50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionId = entry.target.getAttribute('data-section');
        if (entry.isIntersecting) {
          setMountedSections(prev => new Set(prev.add(sectionId)));
        }
      });
    }, observerOptions);

    // Observe all section containers
    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Memoized image preloader
  const preloadImages = useCallback(async () => {
    const imageUrls = ['/2.jpg'];
    try {
      await Promise.all(
        imageUrls.map(url => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.warn('Image preloading failed:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // Section wrapper component to handle mounting
  const SectionWrapper = React.memo(({ id, children }) => {
    const sectionRef = useCallback(node => {
      if (node) {
        sectionsRef.current.set(id, node);
      }
    }, [id]);

    return (
      <div ref={sectionRef} data-section={id}>
        {mountedSections.has(id) && children}
      </div>
    );
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background components */}
      <BackgroundOverlay />
      <WaveBackground />

      {/* Main content */}
      <div className="relative z-10">
        <div className="sticky top-0 z-50 backdrop-blur-sm bg-gray-900/70 border-b border-gray-800/50">
          <Navbar />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <main className="container mx-auto px-4 md:px-6 py-8">
              <SectionWrapper id="hero">
                <section className="mb-24">
                  <Suspense fallback={<SectionLoadingFallback />}>
                    <Hero />
                  </Suspense>
                </section>
              </SectionWrapper>

              <SectionWrapper id="about">
                <section className="mb-24 backdrop-blur-sm bg-gray-800/10 rounded-2xl p-8">
                  <Suspense fallback={<SectionLoadingFallback />}>
                    <About />
                  </Suspense>
                </section>
              </SectionWrapper>

              <SectionWrapper id="skills">
                <section className="mb-24 backdrop-blur-sm bg-gray-800/10 rounded-2xl p-8">
                  <Suspense fallback={<SectionLoadingFallback />}>
                    <Skills />
                  </Suspense>
                </section>
              </SectionWrapper>

              <SectionWrapper id="projects">
                <section className="mb-24">
                  <Suspense fallback={<SectionLoadingFallback />}>
                    <Projects />
                  </Suspense>
                </section>
              </SectionWrapper>

              <SectionWrapper id="contact">
                <section className="mb-24">
                  <Suspense fallback={<SectionLoadingFallback />}>
                    <Contact />
                  </Suspense>
                </section>
              </SectionWrapper>

              <SectionWrapper id="footer">
                <Suspense fallback={<SectionLoadingFallback />}>
                  <Footer />
                </Suspense>
              </SectionWrapper>
            </main>
            
            <div className="fixed bottom-8 right-8">
              <Suspense fallback={null}>
                <ScrollToTop />
              </Suspense>
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
}

// Prevent unnecessary re-renders
export default React.memo(App);
