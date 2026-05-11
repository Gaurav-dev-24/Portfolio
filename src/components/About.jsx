import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imgMan from '../assets/man/Gaurav.png';
import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgSketch from '../assets/spiderman/image copy.png';
gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  "FULL-STACK DEVELOPMENT",
  "AI-POWERED APPLICATIONS",
  "CLOUD COMPUTING AND DEPLOYMENT",
  "INTELLIGENT AUTOMATION SYSTEMS",
];

export default function About() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const maskRef = useRef(null);

  // ScrollTrigger entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      const textElements = textContainerRef.current.querySelectorAll('.stagger-reveal');
      const imgElement = imageContainerRef.current;

      tl.fromTo(imgElement,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
      )
        .fromTo(textElements,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
          "-=0.8"
        );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background Ambience Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay" />
      </div>

      <div className="max-w-[90rem] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

        {/* Left Column: Interactive Portrait */}
        <div
          ref={imageContainerRef}
          className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden group shadow-2xl border border-white/5 cursor-pointer"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Base Layer: Sketch Portrait */}
          <img
            src={imgSketch}
            alt="Gaurav Jangid Sketch"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-80 mix-blend-luminosity brightness-90 transition-all duration-[1.5s] ease-in-out group-hover:opacity-0 group-hover:scale-105"
          />

          {/* Reveal Layer: Real Photo */}
          <div className="absolute inset-0 w-full h-full opacity-0 transition-all duration-[1.5s] ease-in-out group-hover:opacity-100">
            <img
              src={imgMan}
              alt="Gaurav Jangid Photo"
              className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-[1.5s] ease-in-out group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
        </div>

        {/* Right Column: Story & Details */}
        <div ref={textContainerRef} className="flex flex-col justify-center space-y-10">

          <div className="overflow-hidden">
            <p className="stagger-reveal text-sm text-gray-500 font-mono tracking-[0.3em] uppercase mb-2">[ About ]</p>
            <h2 className="stagger-reveal text-4xl md:text-6xl font-bold tracking-tighter text-white font-sans leading-tight">
              Behind The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 font-serif italic pr-4">Build</span>
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="stagger-reveal text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              I am a Full-Stack & AI Developer currently pursuing my Computer Engineering degree at Silver Oak University. I specialize in building highly scalable web applications and intelligent systems, blending robust backend architectures with intuitive frontend experiences.
            </p>
          </div>

          <div className="overflow-hidden">
            <p className="stagger-reveal text-base text-gray-500 font-light leading-relaxed max-w-xl">
              My core stack includes React.js, Node.js, Python, and cloud infrastructure like AWS. From developing Text-to-SQL platforms like QueryMind AI to computer vision traffic systems, I thrive on turning complex logic into efficient, production-ready solutions. I am also an active Webmaster at the IEEE SOU Student Branch and an AWS Student Builder.
            </p>
          </div>

          {/* Expertise Highlights */}
          <div className="overflow-hidden">
            <div className="stagger-reveal grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-white/10 max-w-xl">
              {HIGHLIGHTS.map((item, i) => (
                <div key={i} className="flex items-center space-x-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-red-500 transition-colors duration-300 flex-shrink-0" />
                  <span className="text-gray-300 text-xs md:text-sm font-medium tracking-wide uppercase group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Block */}
          <div className="overflow-hidden mt-6">
            <blockquote className="stagger-reveal border-l-2 border-red-500/50 pl-6 py-2">
              <p className="text-xl md:text-2xl text-gray-200 font-serif italic">
                "Discipline creates the foundation. <br />Execution creates the impact."
              </p>
            </blockquote>
          </div>

        </div>

      </div>
    </section>
  );
}
