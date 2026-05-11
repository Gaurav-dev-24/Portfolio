import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import resumePDF from '../assets/resume/Gaurav Jangid Resume-1.pdf';
import Magnetic from './Magnetic';

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const RESUME_URL = resumePDF;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const glowRef = useRef(null);

  // Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial Load Animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    if (linksRef.current.length > 0) {
      tl.fromTo(linksRef.current.filter(Boolean),
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        "-=0.6"
      );
    }
  }, []);

  // Mouse Glow Interaction
  const handleMouseMove = (e) => {
    if (!glowRef.current || !navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x,
      y,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  // Mobile Menu Animation Toggle
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(150% at 90% 10%)',
        duration: 0.8,
        ease: 'power3.inOut'
      });
      gsap.fromTo(mobileLinksRef.current.filter(Boolean),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(0% at 90% 10%)',
        duration: 0.6,
        ease: 'power3.inOut'
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 overflow-hidden ${isScrolled
          ? 'bg-black/40 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-black/20 backdrop-blur-sm py-5'
          }`}
      >
        {/* Subtle Background Glow Mask */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-0 md:opacity-100 transition-opacity duration-300"
        />

        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">

          {/* Logo */}
          <Magnetic>
            <div className="flex items-center gap-2 cursor-pointer group">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
                <path d="M12 2L12 22M2 12L22 12M5 5L19 19M5 19L19 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
              <span className="text-white font-bold tracking-widest uppercase text-sm ml-2 opacity-90 group-hover:opacity-100 transition-opacity">
                GAURAV JANGID
              </span>
            </div>
          </Magnetic>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link, index) => (
              <Magnetic key={link.name}>
                <a
                  href={link.href}
                  ref={el => linksRef.current[index] = el}
                  className="relative text-gray-400 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 group px-2 py-1"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </a>
              </Magnetic>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Social Icons */}
            <Magnetic>
              <a
                href="https://github.com/Gaurav-dev-24"
                target="_blank"
                rel="noopener noreferrer"
                ref={el => linksRef.current[NAV_LINKS.length] = el}
                className="p-2 text-gray-400 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/gaurav-jangid14"
                target="_blank"
                rel="noopener noreferrer"
                ref={el => linksRef.current[NAV_LINKS.length + 1] = el}
                className="p-2 text-gray-400 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </Magnetic>

            {/* Resume Button */}
            <Magnetic>
              <a
                href={RESUME_URL}
                ref={el => linksRef.current[NAV_LINKS.length + 2] = el}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-5 py-2 rounded-full overflow-hidden group bg-transparent border border-white/20 text-white text-sm font-medium tracking-wider hover:border-white/60 transition-colors duration-300"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Resume</span>
                <div className="absolute inset-0 h-full w-full bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              </a>
            </Magnetic>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="lg:hidden text-white p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-[1px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}`} />
              <span className={`w-full h-[1px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-[1px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center"
        style={{ clipPath: 'circle(0% at 90% 10%)' }}
      >
        <div className="flex flex-col space-y-7 text-center mt-10">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              ref={el => mobileLinksRef.current[index] = el}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-light text-gray-400 hover:text-white transition-colors tracking-widest relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4"></span>
            </a>
          ))}

          {/* Social icons in mobile menu */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <a href="https://github.com/Gaurav-dev-24" target="_blank" rel="noopener noreferrer"
              ref={el => mobileLinksRef.current[NAV_LINKS.length] = el}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/gaurav-jangid14" target="_blank" rel="noopener noreferrer"
              ref={el => mobileLinksRef.current[NAV_LINKS.length + 1] = el}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          <a
            ref={el => mobileLinksRef.current[NAV_LINKS.length + 2] = el}
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 rounded-full border border-white text-white tracking-widest hover:bg-white hover:text-black transition-all duration-300 text-center"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
