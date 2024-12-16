import React, { useState, useEffect, lazy, Suspense, useCallback, useRef } from 'react';
import BackgroundOverlay from './components/common/BackgroundOverlay';
import WaveBackground from './components/common/WaveBackground';
import Navbar from './components/layout/Navbar';

// Remove webpackPrefetch and modify lazy loading
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ScrollToTop = lazy(() => import('./components/common/ScrollToTop'));

// Loading components
const LoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainContentRef = useRef(null);

  useEffect(() => {
    // Simple loading timeout to ensure initial render
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <BackgroundOverlay />
      <WaveBackground />

      <div className="relative z-10">
        <Navbar />

        <Suspense fallback={<LoadingSpinner />}>
          <main ref={mainContentRef} className="container mx-auto px-4 md:px-6 py-8">
            <section className="mb-24">
              <Hero />
            </section>

            <section className="mb-24 backdrop-blur-sm bg-gray-800/10 rounded-2xl p-8">
              <About />
            </section>

            <section className="mb-24 backdrop-blur-sm bg-gray-800/10 rounded-2xl p-8">
              <Skills />
            </section>

            <section className="mb-24">
              <Projects />
            </section>

            <section className="mb-24">
              <Contact />
            </section>

            <Footer />
          </main>

          <div className="fixed bottom-8 right-8">
            <ScrollToTop />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
