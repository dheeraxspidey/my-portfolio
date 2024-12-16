import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/common/LoadingScreen';
import BackgroundOverlay from './components/common/BackgroundOverlay';
import WaveBackground from './components/common/WaveBackground';
import Navbar from './components/layout/Navbar';

// Lazy load non-critical components
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ScrollToTop = lazy(() => import('./components/common/ScrollToTop'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Delay content appearance for smooth transition
    setTimeout(() => setIsContentVisible(true), 100);
  };

  // Preload critical assets
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        '/2.jpg', // Background image
        // Add other critical images here
      ];

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
      } catch (error) {
        console.warn('Image preloading failed:', error);
      }
    };

    preloadImages();
  }, []);

  // Component loading fallback
  const LoadingFallback = () => (
    <div className="h-screen bg-gray-900 animate-pulse" />
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: isContentVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen"
          >
            {/* Background layers - Always render these first */}
            <BackgroundOverlay />
            <WaveBackground />

            {/* Main content with progressive loading */}
            <div className="relative z-10">
              <Navbar />
              <Suspense fallback={<LoadingFallback />}>
                <main>
                  <Hero />
                  <About />
                  <Projects />
                  <Skills />
                  <Contact />
                  <Footer />
                </main>
                <ScrollToTop />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Performance optimization: Memoize the entire app
export default React.memo(App);
