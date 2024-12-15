import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingScreen from './components/common/LoadingScreen';
import Skills from './components/sections/Skills';
import WaveBackground from './components/common/WaveBackground';
import BackgroundOverlay from './components/common/BackgroundOverlay';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    // Add a delay before hiding the loading screen
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // 8 seconds total loading time
  };

  // Optional: Force minimum loading time
  useEffect(() => {
    const minLoadingTime = setTimeout(() => {
      // This ensures the loading screen shows for at least X seconds
      // even if everything loads quickly
    }, 3000);

    return () => clearTimeout(minLoadingTime);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen"
          >
            {/* Background layers */}
            <BackgroundOverlay />
            <WaveBackground />

            {/* Main content */}
            <div className="relative z-10">
              <Navbar />
              <main>
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Contact />
                <Footer />
              </main>
              <ScrollToTop />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
