import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import silverOakLogo from '../assets/education/silveroakuni_logo.jpeg';
import kvLogo from '../assets/education/1697306103892.jpeg';

import ciscoCert from '../assets/certificates/Cisco.pdf';
import deloitteCert from '../assets/certificates/Deloitte.pdf';
import ideaToAppCert from '../assets/certificates/From_Idea_to_App.pdf';
import mlHackathonCert from '../assets/certificates/ML_Hacakthon.pdf';
import tataCert from '../assets/certificates/TATA CERTIFICATE.pdf';

import certLogo1 from '../assets/certificates/image.png';
import certLogo2 from '../assets/certificates/image copy.png';
import certLogo3 from '../assets/certificates/image copy 2.png';

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
  {
    id: '01',
    institution: 'Silver Oak University',
    degree: "Bachelor's Degree in Computer Engineering",
    period: '2023 — 2027',
    description: 'Focused on software engineering, full-stack development, cloud technologies, AI systems, and scalable application development through academic and practical projects.',
    status: 'Ongoing',
    type: 'university',
    logo: silverOakLogo,
  },
  {
    id: '02',
    institution: 'Kendriya Vidyalaya No. 2 Kota',
    degree: 'Higher Secondary Education',
    period: 'Completed 2023',
    description: 'Built a strong academic foundation with emphasis on analytical thinking, technical learning, and problem-solving fundamentals.',
    status: 'Completed',
    type: 'school',
    logo: kvLogo,
  },
];

const CERTIFICATIONS = [
  {
    id: 'c01',
    issuer: 'Deloitte',
    title: 'Data Analytics Job Simulation',
    description: 'Completed practical analytics-focused tasks involving data interpretation, business insights, and analytical problem-solving workflows.',
    category: 'Analytics',
    file: deloitteCert,
    logo: certLogo1,
  },
  {
    id: 'c02',
    issuer: 'Cisco',
    title: 'Data Analytics Essentials',
    description: 'Gained foundational knowledge in data analytics concepts, data handling, visualisation, and analytical methodologies.',
    category: 'Analytics',
    file: ciscoCert,
    logo: certLogo2,
  },
  {
    id: 'c03',
    issuer: 'TATA',
    title: 'Virtual Experience Program',
    description: 'Successfully completed the certification program focusing on industry-standard practices and professional development.',
    category: 'Professional',
    file: tataCert,
    logo: certLogo3,
  }
];

const PARTICIPATION = [
  {
    id: 'p01',
    title: 'Machine Learning Hackathon',
    description: 'Participated in collaborative problem-solving and AI-focused development challenges involving practical machine learning concepts and implementation workflows.',
    category: 'Hackathon',
    file: mlHackathonCert,
  },
  {
    id: 'p02',
    title: 'From Idea to Apps',
    description: 'Participated in an application development initiative focused on transforming concepts into functional digital solutions through practical development workflows.',
    category: 'Workshop',
    file: ideaToAppCert,
  },
];

const FlipCard = ({ item, className }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`cert-card group relative h-full min-h-[140px] cursor-pointer ${className || ''}`}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front Face */}
        <div
          className="relative w-full h-full bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 hover:border-white/15 hover:bg-white/[0.05] transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Flip Option Indicator */}
          <div className="absolute top-4 right-4 text-white/30 group-hover:text-white/70 transition-colors z-10" title="Hover to flip">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div className="flex items-start justify-between gap-3 mb-3 pr-8">
            <div className="flex items-center gap-3">
              {item.logo && (
                <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img src={item.logo} alt={`${item.issuer} logo`} className="w-full h-full object-contain p-1" />
                </div>
              )}
              <div>
                {item.issuer && <p className="text-gray-500 text-xs font-mono tracking-wider uppercase mb-1">{item.issuer}</p>}
                <h4 className="text-white font-medium text-sm leading-snug">{item.title}</h4>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/10 font-mono tracking-widest uppercase flex-shrink-0">{item.category}</span>
          </div>
          <p className="text-gray-500 text-sm font-light leading-relaxed">{item.description}</p>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 w-full h-full bg-[#111] border border-white/20 rounded-xl p-6 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {item.file ? (
            <a
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-6 py-2.5 bg-white/10 text-white rounded-lg font-mono text-sm hover:bg-white/20 transition-colors border border-white/20"
            >
              View Certificate
            </a>
          ) : (
            <span className="text-gray-500 font-mono text-sm">Certificate Unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function EducationCerts() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const eduRef = useRef(null);
  const certRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      })
        .fromTo(headerRef.current.children,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
        )
        .fromTo(eduRef.current.querySelectorAll('.edu-card'),
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(certRef.current.querySelectorAll('.cert-card'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full bg-[#030303] py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-red-900/6 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[90rem] mx-auto relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="mb-20 border-b border-white/10 pb-8">
          <p className="text-red-500/80 font-mono text-xs tracking-[0.3em] uppercase font-bold mb-4">[ Education & Certs ]</p>
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white font-sans leading-none">
            Learning &amp; <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white pr-2">Credentials</span>
          </h2>
        </div>

        {/* Education Cards */}
        <div ref={eduRef} className="mb-24">
          <p className="text-gray-500 font-mono text-xs tracking-[0.25em] uppercase mb-8">// Education Background</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION.map((edu) => (
              <div
                key={edu.id}
                className="edu-card group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden ${edu.type === 'university' ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5 border border-white/10'
                      }`}>
                      {edu.logo ? (
                        <img src={edu.logo} alt={`${edu.institution} logo`} className="w-full h-full object-cover bg-white" />
                      ) : edu.type === 'university' ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-red-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-gray-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono tracking-widest uppercase ${edu.status === 'Ongoing'
                        ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                        : 'bg-white/5 text-gray-400 border border-white/10'
                      }`}>{edu.status}</span>
                  </div>
                  <span className="text-gray-600 text-xs font-mono tracking-wide">{edu.period}</span>
                </div>

                <h3 className="text-white font-semibold text-base mb-1 leading-snug">{edu.institution}</h3>
                <p className="text-gray-400 text-sm mb-4 font-medium">{edu.degree}</p>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div ref={certRef}>
          <p className="text-gray-500 font-mono text-xs tracking-[0.25em] uppercase mb-8">// Certifications &amp; Achievements</p>

          {/* Certifications */}
          <div className="mb-10">
            <p className="text-gray-600 text-xs tracking-widest uppercase font-mono mb-4 pl-1">— Certifications</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CERTIFICATIONS.map((cert) => (
                <FlipCard key={cert.id} item={cert} />
              ))}
            </div>
          </div>

          {/* Participation */}
          <div>
            <p className="text-gray-600 text-xs tracking-widest uppercase font-mono mb-4 pl-1">— Participation</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PARTICIPATION.map((item) => (
                <FlipCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
