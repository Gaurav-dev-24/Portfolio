import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';

import imgQueryMind from '../assets/projects_logos/image.png';
import imgVisionFlow from '../assets/projects_logos/image copy.png';
import imgForever from '../assets/projects_logos/Screenshot 2026-05-11 at 04.27.50.png';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    name: 'QueryMind AI',
    description: 'An AI-powered Text-to-SQL platform that transforms natural language queries into optimised SQL statements with secure query execution, database integration, and production-ready backend workflows.',
    tech: ['React JS', 'Python', 'Llama', 'Supabase'],
    image: imgQueryMind,
    link: 'https://github.com/Gaurav-dev-24/Text2Sql',
    blend: 'opacity-40 group-hover:opacity-100 transition-opacity duration-500',
    category: 'AI / Backend',
  },
  {
    id: '02',
    name: 'VisionFlow Traffic System',
    description: 'A computer vision–based traffic monitoring system built using OpenCV for real-time vehicle detection, traffic analysis, and intelligent monitoring workflows.',
    tech: ['Python', 'OpenCV', 'YOLO', 'Computer Vision'],
    image: imgVisionFlow,
    video: '/videos/1.mp4',
    link: 'https://github.com/Gaurav-dev-24/Traffic-Survellience',
    blend: 'opacity-40 group-hover:opacity-100 transition-opacity duration-500',
    category: 'AI / Computer Vision',
  },
  {
    id: '03',
    name: 'Forever',
    description: 'A full-stack ecommerce application featuring secure authentication, product management, payment workflows, responsive UI, and scalable backend architecture.',
    tech: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'Stripe'],
    image: imgForever,
    link: 'https://forever-14.vercel.app',
    blend: 'opacity-40 group-hover:opacity-100 transition-opacity duration-500',
    category: 'Full-Stack',
  }
];

// --- Video Modal Component (rendered via Portal at body level) ---
function VideoModal({ videoSrc, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-md px-4"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black" 
        style={{ boxShadow: '0 0 60px rgba(220,38,38,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 z-50 text-white bg-black/60 hover:bg-red-500 rounded-full p-2 transition-colors duration-300 border border-white/10"
          onClick={onClose}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain"
          controls
          autoPlay
          muted
          playsInline
        />
      </div>
    </div>,
    document.body
  );
}

// --- Project Card Component ---
const ProjectCard = ({ project, onOpenVideo }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4
    });

    gsap.to(glowRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
      duration: 0.2
    });

    gsap.to(imageRef.current, {
      x: -x * 20,
      y: -y * 20,
      scale: 1.1,
      ease: 'power2.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power3.out',
      duration: 0.6
    });

    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.4
    });

    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1.0,
      ease: 'power3.out',
      duration: 0.6
    });
  };

  const handleViewProject = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (project.video) {
      onOpenVideo(project.video);
    } else if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  return (
    <div
      className="project-card relative w-full h-[450px] sm:h-[500px] lg:h-[550px] rounded-xl overflow-hidden cursor-pointer group bg-black border border-white/10"
      style={{ transformStyle: 'preserve-3d' }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image/Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
        <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <img
            src={project.image}
            alt={project.name}
            className={`absolute inset-0 w-[85%] h-[85%] m-auto object-contain object-center ${project.blend}`}
          />
          {project.video && (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover object-center opacity-30 group-hover:opacity-60 mix-blend-screen transition-opacity duration-700`}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      </div>

      {/* Dynamic Hover Glow Layer Tracker */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
      />

      {/* Laser Border overlay on Hover */}
      <div className="absolute inset-0 border border-red-500/0 group-hover:border-red-500/40 rounded-xl transition-colors duration-500 z-20 pointer-events-none" />

      {/* Foreground Content */}
      <div className="absolute inset-0 z-30 p-6 md:p-8 flex flex-col justify-end pointer-events-none" style={{ transform: 'translateZ(30px)' }}>

        {/* Category / ID */}
        <div className="text-red-500/80 font-mono text-xs tracking-[0.3em] mb-2 font-bold uppercase transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
          {project.category} // {project.id}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 leading-none drop-shadow-xl font-sans">
          {project.name}
        </h3>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 font-light max-w-[95%] text-justify">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4 pointer-events-auto">
          {project.tech.map((tool) => (
            <Magnetic key={tool}>
              <span className="tech-tag text-[10px] uppercase tracking-widest px-3 py-1.5 border border-white/20 rounded-full text-gray-300 font-medium hover:border-white/50 transition-colors">
                {tool}
              </span>
            </Magnetic>
          ))}
        </div>

        <div className="mt-auto pointer-events-auto w-fit">
          <button
            onClick={handleViewProject}
            className="flex items-center space-x-2 text-sm uppercase tracking-[0.2em] font-medium text-white group/link relative py-2 bg-transparent border-none cursor-pointer"
          >
            <span className="relative overflow-hidden block">
              <span className="block group-hover/link:-translate-y-full transition-transform duration-300">View Project</span>
              <span className="block absolute inset-0 translate-y-full group-hover/link:translate-y-0 transition-transform duration-300 text-red-400">View Project</span>
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300 text-red-500">
              <line x1="5" y1="19" x2="19" y2="5"></line>
              <polyline points="10 5 19 5 19 14"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};


export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(headerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      const cards = sectionRef.current.querySelectorAll('.project-card');

      tl.fromTo(cards,
        { opacity: 0, y: 100, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
        "-=0.6"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="w-full min-h-screen bg-[#030303] py-32 px-6 md:px-12 lg:px-24 flex flex-col justify-center relative overflow-hidden"
      >
        <div className="max-w-[90rem] mx-auto w-full relative z-10">

          {/* Header Block */}
          <div ref={headerRef} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
            <div className="max-w-2xl">
              <p className="text-red-500/80 font-mono text-xs tracking-[0.3em] uppercase font-bold mb-4">[ Work ]</p>
              <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white font-sans leading-none drop-shadow-lg mb-4">
                Selected <span className="font-serif italic font-light opacity-80 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white pr-2">Engineering</span> Work
              </h2>
            </div>
            <p className="text-gray-400 font-light tracking-wide text-base md:text-lg max-w-sm mt-6 md:mt-0 leading-relaxed md:text-right">
              A selection of projects focused on AI systems, scalable backend architecture, cloud integration, and real-world application development.
            </p>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            {PROJECTS.map(project => (
              <ProjectCard key={project.id} project={project} onOpenVideo={setActiveVideo} />
            ))}
          </div>

        </div>

        {/* Background Ambience line-grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}
        />
      </section>

      {/* Video Modal — rendered via Portal at document.body level */}
      {activeVideo && (
        <VideoModal videoSrc={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
