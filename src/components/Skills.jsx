import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Logo imports
import logoAWS        from '../assets/skills assets/download.png';
import logoPython     from '../assets/skills assets/download (1).png';
import logoReact      from '../assets/skills assets/download (2).png';
import logoNode       from '../assets/skills assets/download (3).png';
import logoNext       from '../assets/skills assets/download (4).png';
import logoDocker     from '../assets/skills assets/download (5).png';
import logoMongoDB    from '../assets/skills assets/download (6).png';
import logoExpress    from '../assets/skills assets/download (7).png';
import logoOpenCV     from '../assets/skills assets/download (8).png';
import logoNLP        from '../assets/skills assets/download (9).png';
import logoGit        from '../assets/skills assets/download (10).png';
import logoJS         from '../assets/skills assets/download (11).png';
import logoFirebase   from '../assets/skills assets/download (12).png';
import logoMySQL      from '../assets/skills assets/download (13).png';
import logoREST       from '../assets/skills assets/download (14).png';
import logoPrompt     from '../assets/skills assets/download (15).png';
import logoDeepLearn  from '../assets/skills assets/download (1).jpeg';
import logoPyCharm    from '../assets/skills assets/download (2).jpeg';
import logoCpp        from '../assets/skills assets/png-clipart-c-logo-the-c-programming-language-computer-icons-computer-programming-source-code-programming-miscellaneous-template.png';
import logoYOLO       from '../assets/skills assets/download.jpeg';
import logoJava       from '../assets/skills assets/java.png';
import logoNumpy      from '../assets/skills assets/image copy.png';
import logoTensorFlow from '../assets/skills assets/image.png';
import logoPyTorch    from '../assets/skills assets/image copy 2.png';

gsap.registerPlugin(ScrollTrigger);

const SKILLS_ROW_1 = [
  { name: 'Python',      color: '#3776AB', logo: logoPython  },
  { name: 'JavaScript',  color: '#F7DF1E', logo: logoJS      },
  { name: 'React.js',   color: '#61DAFB', logo: logoReact   },
  { name: 'Node.js',    color: '#339933', logo: logoNode    },
  { name: 'Next.js',    color: '#ffffff', logo: logoNext    },
  { name: 'Express.js', color: '#ffffff', logo: logoExpress },
  { name: 'MongoDB',    color: '#47A248', logo: logoMongoDB },
  { name: 'AWS',        color: '#FF9900', logo: logoAWS     },
  { name: 'Docker',     color: '#2496ED', logo: logoDocker  },
  { name: 'Git',        color: '#F05032', logo: logoGit     },
  { name: 'C++',        color: '#00599C', logo: logoCpp     },
  { name: 'MySQL',      color: '#4479A1', logo: logoMySQL   },
];

const SKILLS_ROW_2 = [
  { name: 'OpenCV',          color: '#5C3EE8', logo: logoOpenCV   },
  { name: 'Deep Learning',   color: '#FF6B6B', logo: logoDeepLearn},
  { name: 'Firebase',        color: '#FFCA28', logo: logoFirebase },
  { name: 'REST APIs',       color: '#25D366', logo: logoREST     },
  { name: 'NLP',             color: '#9B59B6', logo: logoNLP      },
  { name: 'Prompt Eng.',     color: '#1ABC9C', logo: logoPrompt   },
  { name: 'PyCharm',         color: '#21D789', logo: logoPyCharm  },
  { name: 'YOLO',            color: '#00B4D8', logo: logoYOLO     },
  { name: 'Java',            color: '#E76F00', logo: logoJava     },
  { name: 'NumPy',           color: '#013243', logo: logoNumpy    },
  { name: 'TensorFlow',      color: '#FF6F00', logo: logoTensorFlow},
  { name: 'PyTorch',         color: '#EE4C2C', logo: logoPyTorch  },
];

const SkillPill = ({ skill }) => (
  <div className="group flex-shrink-0 flex items-center gap-3 bg-white/[0.04] border border-white/[0.09] rounded-full px-5 py-2.5 mx-2 hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-default">
    <img
      src={skill.logo}
      alt={skill.name}
      className="w-5 h-5 object-contain flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
      style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.15))' }}
    />
    <span className="text-sm font-medium tracking-wide text-gray-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
      {skill.name}
    </span>
  </div>
);

const MarqueeRow = ({ skills, direction = 'left' }) => {
  const doubled = [...skills, ...skills];

  return (
    <div className="overflow-hidden w-full" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
      <div
        className={`flex items-center ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })
      .fromTo(headerRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-black py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-900/8 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 mb-16 border-b border-white/10 pb-8">
          <p className="text-red-500/80 font-mono text-xs tracking-[0.3em] uppercase font-bold mb-4">[ Stack ]</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white font-sans leading-none">
              Technical <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white pr-2">Skills</span>
            </h2>
            <p className="text-gray-400 font-light text-base md:text-right max-w-sm leading-relaxed">
              Tools and technologies I work with regularly across development, AI, and cloud.
            </p>
          </div>
        </div>

        {/* Skill Category Labels */}
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 mb-8 flex flex-wrap gap-3">
          {[
            { label: 'Programming Languages', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
            { label: 'Web Development',        color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
            { label: 'AI & ML',                color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
            { label: 'Cloud & Database',       color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' },
          ].map((cat) => (
            <span key={cat.label} className={`text-xs px-3 py-1.5 rounded-full border font-mono tracking-wider ${cat.color}`}>
              {cat.label}
            </span>
          ))}
        </div>

        {/* Marquee Rows */}
        <div className="space-y-5 py-4 mb-24">
          <MarqueeRow skills={SKILLS_ROW_1} direction="left"  />
          <MarqueeRow skills={SKILLS_ROW_2} direction="right" />
        </div>

        {/* Skill Proficiency Grouping */}
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-white font-sans leading-none mb-4">
              Proficiency <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white pr-2">Overview</span>
            </h3>
            <div className="h-px w-16 bg-red-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                category: 'AI & Machine Learning',
                skills: [
                  { name: 'Python', level: 90 },
                  { name: 'Computer Vision / OpenCV', level: 85 },
                  { name: 'Deep Learning', level: 80 },
                  { name: 'NLP & Prompt Engineering', level: 85 }
                ]
              },
              {
                category: 'Web Development',
                skills: [
                  { name: 'React.js & Next.js', level: 90 },
                  { name: 'JavaScript', level: 90 },
                  { name: 'Node.js & Express', level: 85 },
                  { name: 'REST APIs', level: 90 }
                ]
              },
              {
                category: 'Cloud & Database',
                skills: [
                  { name: 'AWS & Deployment', level: 80 },
                  { name: 'Docker', level: 75 },
                  { name: 'MySQL & PostgreSQL', level: 85 },
                  { name: 'MongoDB', level: 85 }
                ]
              }
            ].map((group, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors duration-300">
                <h4 className="text-red-400 font-mono text-sm tracking-widest uppercase mb-8">{group.category}</h4>
                <div className="space-y-6">
                  {group.skills.map((item, i) => (
                    <div key={i} className="group/skill">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm font-medium tracking-wide group-hover/skill:text-white transition-colors">{item.name}</span>
                        <span className="text-gray-600 text-xs font-mono">{item.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transform origin-left transition-transform duration-1000 ease-out"
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
