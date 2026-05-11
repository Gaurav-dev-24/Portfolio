import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import iconIEEE from '../assets/experience/ieee.jpg';
import iconAWS from '../assets/experience/aws.jpg';
import iconGoogle from '../assets/experience/google.jpg';
import iconMicro from '../assets/experience/micro.jpg';
import microCert from '../assets/certificates/Gaurav Jangid.pdf';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    id: '01',
    year: '2026',
    org: 'IEEE Silver Oak University Student Branch',
    icon: iconIEEE,
    roles: [
      {
        title: 'IEEE SOU SB Webmaster',
        period: 'Apr 2026 — Present',
        description: 'Leading and managing the technical and web-related operations of the IEEE SOU Student Branch, including platform maintenance, digital systems, and technical execution for organisational activities.',
        type: 'current',
      },
      {
        title: 'IEEE SOU SB Member',
        period: 'Feb 2026 — Mar 2026',
        description: 'Actively contributed to technical initiatives, community activities, and collaborative engineering-focused events within the IEEE student branch.',
        type: 'past',
      },
    ],
  },
  {
    id: '02',
    year: '2026',
    org: 'AWS Student Builder Group at Silver Oak University',
    icon: iconAWS,
    roles: [
      {
        title: 'Member',
        period: 'Feb 2026 — Present',
        description: 'Participating in cloud-focused learning initiatives, technical collaboration, and hands-on exploration of AWS technologies and modern cloud workflows.',
        type: 'current',
      },
    ],
  },
  {
    id: '03',
    year: '2026',
    org: 'Google Developers Group — Silver Oak University',
    icon: iconGoogle,
    roles: [
      {
        title: 'Member',
        period: 'Feb 2026 — Present',
        description: 'Engaged in developer community activities, technical sessions, and practical learning related to modern web technologies and scalable application development.',
        type: 'current',
      },
    ],
  },
  {
    id: '04',
    year: '2025',
    org: 'Micro Service Technologies',
    icon: iconMicro,
    certificate: microCert,
    roles: [
      {
        title: 'AI Intern',
        period: 'Jun 2025 — Jul 2025',
        description: 'Worked on AI-focused development tasks involving backend workflows, intelligent system implementation, and practical exposure to real-world software development environments.',
        type: 'industry',
      },
    ],
  },
];


const ExperienceCard = ({ exp, isLeft }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    if (!exp.certificate) return;
    setIsFlipped(true);
    gsap.to(cardRef.current, {
      rotateY: 180,
      rotateX: 0,
      ease: 'power3.inOut',
      duration: 0.6
    });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.2 });
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped || exp.certificate) return;

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
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    if (exp.certificate) {
      setIsFlipped(false);
    }

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
  };

  const handleCardClick = () => {
    if (!exp.certificate) return;
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    gsap.to(cardRef.current, {
      rotateY: nextFlipped ? 180 : 0,
      rotateX: 0,
      ease: 'power3.inOut',
      duration: 0.6
    });
    if (nextFlipped) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.2 });
    }
  };

  return (
    <div className={`w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(50%-3.5rem)] pl-16 md:pl-0 relative`} style={{ perspective: '1000px' }}>
      {/* Connecting line to the center - Desktop only. Rendered outside so it doesn't tilt. */}
      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] bg-white/20 ${isLeft
        ? 'w-4 -right-4 lg:w-7 lg:-right-7'
        : 'w-4 -left-4 lg:w-7 lg:-left-7'
        }`} />

      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        className={`relative group rounded-2xl z-10 ${exp.certificate ? 'cursor-pointer' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face Background & Glow & Border */}
        <div className="absolute inset-0 bg-[#080808] border border-white/5 rounded-2xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
          <div
            ref={glowRef}
            className="absolute w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
          />
          <div className="absolute inset-0 border border-red-500/0 group-hover:border-red-500/40 rounded-2xl transition-colors duration-500 z-20 pointer-events-none" />
        </div>

        {/* Foreground Content */}
        <div className="relative p-6 md:p-8 z-30 pointer-events-none" style={{ transform: 'translateZ(30px)', backfaceVisibility: 'hidden' }}>
          {exp.certificate && (
            <div 
              className="absolute top-6 right-6 text-white/30 group-hover:text-white/70 transition-colors pointer-events-auto cursor-pointer" 
              title="Click to flip for certificate"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pr-8">
            {/* Logo Placeholder */}
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
              {exp.icon ? (
                <img src={exp.icon} alt={`${exp.org} logo`} className="w-full h-full object-contain p-1 bg-white/5" />
              ) : (
                <span className="text-[10px] text-white/30 font-mono tracking-wider">LOGO</span>
              )}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-md">
              {exp.org}
            </h3>
          </div>

          <div className="space-y-6 pointer-events-auto">
            {exp.roles.map((role, ri) => (
              <div key={ri} className="flex flex-col gap-3">
                <div className={`flex flex-col gap-2`}>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="text-white/90 font-medium text-base md:text-lg">{role.title}</h4>
                    {role.type === 'current' && (
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#111] text-red-400 border border-red-500/20 font-mono tracking-widest uppercase shadow-[0_0_10px_rgba(239,68,68,0.1)]">Live</span>
                    )}
                    {role.type === 'industry' && (
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#111] text-rose-400 border border-rose-500/20 font-mono tracking-widest uppercase shadow-[0_0_10px_rgba(244,63,94,0.1)]">Industry</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {role.period}
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back Face */}
        {exp.certificate && (
          <div
            className="absolute inset-0 bg-[#080808] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center z-40 pointer-events-auto"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <a
              href={exp.certificate}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-6 py-2.5 bg-white/10 text-white rounded-lg font-mono text-sm hover:bg-white/20 transition-colors border border-white/20"
            >
              View Certificate
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo(headerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );

      const items = timelineRef.current.querySelectorAll('.timeline-item');
      tl.fromTo(items,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-orange-900/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }}
        />
      </div>

      <div className="max-w-[90rem] mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-20 md:mb-32 border-b border-white/10 pb-8 flex flex-col items-center text-center">
          <p className="text-red-500/80 font-mono text-xs tracking-[0.3em] uppercase font-bold mb-4">[ Timeline ]</p>
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white font-sans leading-none mb-6 drop-shadow-xl">
            Professional <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white pr-2">Journey</span>
          </h2>
          <p className="text-gray-400 font-light text-base leading-relaxed max-w-2xl mx-auto">
            A chronological timeline of my roles, communities, and industry experience shaping my technical foundation and professional growth.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto pb-10">
          {/* Central Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent md:-translate-x-1/2 z-0" />

          {EXPERIENCES.map((exp, index) => {
            const showYear = index === 0 || exp.year !== EXPERIENCES[index - 1].year;
            const isLeft = index % 2 === 0;

            return (
              <div key={exp.id} className="timeline-item relative w-full mb-16 md:mb-24">

                {/* Year Badge */}
                {showYear && (
                  <div className="relative w-full mb-16 h-10">
                    <div className="absolute left-14 md:left-1/2 md:transform md:-translate-x-1/2 bg-[#0c0c0c] border border-white/10 text-white/90 px-4 md:px-6 py-1.5 md:py-2 rounded-xl font-mono text-base md:text-lg tracking-wider shadow-[0_0_20px_rgba(0,0,0,0.8)] z-20">
                      {exp.year}
                    </div>
                  </div>
                )}

                <div className={`relative flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>

                  {/* Center Node / Dot */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center top-6 md:top-1/2 md:-translate-y-1/2">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-[#080808] ${exp.roles.some(r => r.type === 'current')
                      ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)] text-red-500'
                      : exp.roles.some(r => r.type === 'industry')
                        ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)] text-rose-500'
                        : 'border-white/20 text-white/40'
                      }`}>
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>

                  {/* Render the interactive card */}
                  <ExperienceCard exp={exp} isLeft={isLeft} />

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
