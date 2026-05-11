import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import EducationCerts from './components/EducationCerts';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import Lenis from 'lenis';

function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('preloaderShown') === 'true';
    }
    return false;
  });

  // PageLoader runs on every visit (independent of the session-gated Preloader)
  const [pageLoaderDone, setPageLoaderDone] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5, // Increased for a more cinematic feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1, // Slightly higher for better responsiveness
      smoothTouch: true, // Enable smooth touch for mobile
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Synchronize ScrollTrigger with Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with GSAP
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      lenis.on('scroll', ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderFinished(true);
    sessionStorage.setItem('preloaderShown', 'true');
  }, []);

  return (
    <div className="bg-black text-white selection:bg-red-600/30 selection:text-white">
      <CustomCursor />
      <BackToTop />

      {/* Slim progress bar — every page load, but don't show on initial full preload */}
      {preloaderFinished && !pageLoaderDone && <PageLoader onComplete={() => setPageLoaderDone(true)} />}

      {/* Full cinematic preloader — first visit only */}
      {!preloaderFinished && <Preloader onComplete={handlePreloaderComplete} />}

      <Navbar />
      <main>
        <Hero isPreloaderFinished={preloaderFinished} />
        <About />
        <Projects />
        <Experience />
        <EducationCerts />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
