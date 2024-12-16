import React, { useState, useEffect, lazy, Suspense } from 'react';
import BackgroundOverlay from './components/common/BackgroundOverlay';
import WaveBackground from './components/common/WaveBackground';
import Navbar from './components/layout/Navbar';

// Lazy load components
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ScrollToTop = lazy(() => import('./components/common/ScrollToTop'));

// Modern loading spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div className="relative p-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full" />
        <p className="text-blue-400 font-medium tracking-wider">Loading...</p>
      </div>
    </div>
  </div>
);

// Section loading placeholder
const SectionLoadingFallback = () => (
  <div className="m-4 p-6 rounded-xl bg-gray-800/30">
    <div className="space-y-4">
      <div className="h-8 bg-gray-700/50 rounded-lg w-3/4" />
      <div className="h-4 bg-gray-700/50 rounded-lg w-full" />
      <div className="h-4 bg-gray-700/50 rounded-lg w-5/6" />
    </div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
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
    };

    preloadImages();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background layers */}
      <BackgroundOverlay />
      <WaveBackground />

      {/* Main content */}
      <div className="relative z-10">
        {/* Navbar with subtle blur effect */}
        <div className="sticky top-0 z-50 backdrop-blur-sm bg-gray-900/70 border-b border-gray-800/50">
          <Navbar />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <main className="container mx-auto px-4 md:px-6 py-8">
              {/* Hero Section - Full width */}
              <section className="mb-24">
                <Suspense fallback={<SectionLoadingFallback />}>
                  <Hero />
                </Suspense>
              </section>

              {/* About Section */}
              <section className="mb-24 backdrop-blur-sm bg-gray-800/10 rounded-2xl p-8">
                <Suspense fallback={<SectionLoadingFallback />}>
                  <About />
                </Suspense>
              </section>
              {/* Skills Section */}
              <section className="mb-24 backdrop-blur-sm bg-gray-800/10 rounded-2xl p-8">
                <Suspense fallback={<SectionLoadingFallback />}>
                  <Skills />
                </Suspense>
              </section>

              {/* Projects Section */}
              <section className="mb-24">
                <Suspense fallback={<SectionLoadingFallback />}>
                  <Projects />
                </Suspense>
              </section>


              {/* Contact Section */}
              <section className="mb-24">
                <Suspense fallback={<SectionLoadingFallback />}>
                  <Contact />
                </Suspense>
              </section>

              {/* Footer */}
              <Suspense fallback={<SectionLoadingFallback />}>
                <Footer />
              </Suspense>
            </main>
            
            {/* Scroll to Top Button */}
            <div className="fixed bottom-8 right-8">
              <ScrollToTop />
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default React.memo(App);
