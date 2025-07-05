import React, { useState, useEffect, lazy, Suspense, useCallback, useRef } from 'react';
import BackgroundOverlay from './components/common/BackgroundOverlay';
import WaveBackground from './components/common/WaveBackground';
import SectionTransition from './components/common/SectionTransition';
import Navbar from './components/layout/Navbar';
import { useLenis } from './hooks/useLenis';

// Eager load critical components
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import ScrollBasedPortfolio from './components/pages/ScrollBasedPortfolio';

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
  const [activeSection, setActiveSection] = useState('home');
  const [sectionTransition, setSectionTransition] = useState(null);
  const [useScrollBasedExperience, setUseScrollBasedExperience] = useState(true); // Toggle for new experience
  const mainContentRef = useRef(null);
  
  // Initialize Lenis smooth scrolling
  useLenis();

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

  // Optimize scroll performance and handle section detection
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Section detection logic
          const sections = ['home', 'skills', 'projects', 'contact'];
          const scrollPosition = window.scrollY + window.innerHeight / 2;
          
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                if (activeSection !== section) {
                  setActiveSection(section);
                  
                  // Trigger section transition effect
                  if (section !== 'home') {
                    setSectionTransition(section);
                    setTimeout(() => setSectionTransition(null), 1000);
                  }
                }
                break;
              }
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="relative min-h-screen optimize-mobile bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 smooth-scroll-container lenis-smooth">
      <BackgroundOverlay />
      <WaveBackground />

      {/* Section Transitions */}
      <SectionTransition 
        isActive={sectionTransition === 'about'}
        sectionId="about"
        transitionColor="rgba(59, 130, 246, 0.3)"
      />
      <SectionTransition 
        isActive={sectionTransition === 'skills'}
        sectionId="skills"
        transitionColor="rgba(16, 185, 129, 0.3)"
      />
      <SectionTransition 
        isActive={sectionTransition === 'projects'}
        sectionId="projects"
        transitionColor="rgba(245, 158, 11, 0.3)"
      />
      <SectionTransition 
        isActive={sectionTransition === 'contact'}
        sectionId="contact"
        transitionColor="rgba(168, 85, 247, 0.3)"
      />

      <div className="relative z-10">
        <nav className="sticky top-0 z-50 nav-elegant">
          <Navbar />
        </nav>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            {useScrollBasedExperience ? (
              <ScrollBasedPortfolio />
            ) : (
              <>
                <main className="container mx-auto px-4 md:px-6 py-8 content-visibility-auto">
                  <section id="home" className="mb-24 hw-accelerated">
                    <Hero 
                      activeSection={activeSection}
                      onSectionTransition={(sectionId) => {
                        setSectionTransition(sectionId);
                        setTimeout(() => setSectionTransition(null), 1000);
                      }}
                    />
                  </section>

                  {/* Invisible about section marker for navigation */}
                  <div id="about" className="absolute top-0 invisible" />

                  <section id="skills" className="mb-24 card-elegant">
                    <Skills />
                  </section>

                  <section id="projects" className="mb-24 card-elegant">
                    <Projects />
                  </section>

                  <section id="contact" className="mb-24 card-elegant">
                    <Contact />
                  </section>

                  <Footer />
                </main>
                
                <div className="fixed bottom-8 right-8">
                  <ScrollToTop />
                </div>
              </>
            )}
            
            {/* Experience Toggle Button */}
            <div className="fixed top-20 right-8 z-50">
              <button
                onClick={() => setUseScrollBasedExperience(!useScrollBasedExperience)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {useScrollBasedExperience ? 'Classic View' : 'Scroll Experience'}
              </button>
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
}

// Add display name for better debugging
App.displayName = 'Portfolio';

export default React.memo(App);
