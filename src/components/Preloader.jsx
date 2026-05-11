import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

const Preloader = ({ onComplete }) => {
  const nameRef    = useRef(null);
  const lineRef    = useRef(null);
  const taglineRef = useRef(null);
  const glowRef    = useRef(null);
  const panelsRef  = useRef([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const initAnimation = () => {
      if (!nameRef.current) return;

      const split = new SplitType(nameRef.current, { types: 'chars' });
      const chars = split.chars;

      // Scale the char shift relative to viewport so it feels right on mobile too
      const shiftX = Math.min(24, window.innerWidth * 0.06);

      // ── INITIAL STATES ────────────────────────────────────────────
      gsap.set(chars,              { opacity: 0, x: shiftX });
      gsap.set(lineRef.current,    { scaleX: 0, transformOrigin: 'left center', opacity: 0 });
      gsap.set(taglineRef.current, { opacity: 0, y: 6 });
      gsap.set(glowRef.current,    { opacity: 0 });
      gsap.set(panelsRef.current,  { xPercent: 100 });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }
      });

      // 1. Glow blooms in
      tl.to(glowRef.current, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0);

      // 2. Underline draws left → right
      tl.to(lineRef.current, { opacity: 1, scaleX: 1, duration: 0.7, ease: 'power3.out' }, 0.2);

      // 3. Characters flow in left→right — ink on paper
      tl.to(chars, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: { amount: 1.8, from: 'start', ease: 'none' }
      }, 0.5);

      // 4. Tagline fades in after name written
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 2.9);

      // 5. Tagline + line fade out
      tl.to([taglineRef.current, lineRef.current], { opacity: 0, duration: 0.5, ease: 'power2.in' }, 4.0);

      // 6. Name erases right→left
      tl.to([...chars].reverse(), {
        opacity: 0,
        x: -shiftX * 0.8,
        duration: 0.35,
        ease: 'power2.in',
        stagger: { amount: 0.65, from: 'start', ease: 'power1.in' }
      }, 4.3);

      // 7. Glow fades
      tl.to(glowRef.current, { opacity: 0, duration: 0.5, ease: 'power2.in' }, 4.3);

      // 8. Panels wipe IN from right
      tl.to(panelsRef.current, { xPercent: 0, stagger: 0.08, duration: 0.7, ease: 'expo.inOut' }, 5.0);

      // 9. Panels wipe OUT to left — site revealed
      tl.to(panelsRef.current, { xPercent: -100, stagger: 0.06, duration: 0.65, ease: 'expo.inOut' }, 5.8);

      return () => { tl.kill(); split.revert(); };
    };

    const timeout = setTimeout(initAnimation, 150);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  const panelColors = ['#0d0d0d', '#b91c1c', '#0d0d0d', '#1a1a1a'];

  return (
    <div className="fixed inset-0 z-[99999] bg-[#080808] select-none flex items-center justify-center px-4">

      {/* Ambient red glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(185,28,28,0.10) 0%, transparent 70%)',
          opacity: 0,
        }}
      />

      {/* Name + tagline — floats freely on background, no overflow clip */}
      <div className="relative z-10 flex flex-col items-center w-full" style={{ gap: '2.5vh' }}>

        {/*
          Font size: pure vw so it always fits width.
          "Gaurav Jangid" (13 chars in Great Vibes) needs ~11vw per effective char-em.
          Tested: 11vw fits single-line from 320px → 1920px with 8px side padding.
          lineHeight:2 gives full vertical room for cursive ascenders + descenders.
        */}
        <h1
          ref={nameRef}
          className="font-['Great_Vibes'] text-white text-center w-full"
          style={{
            fontSize: 'clamp(1.8rem, 10.5vw, 9rem)',
            lineHeight: 2,
            textShadow: '0 0 80px rgba(255,255,255,0.07)',
            whiteSpace: 'nowrap',
          }}
        >
          Gaurav Jangid
        </h1>

        {/* Underline — spans only the text width on desktop, full on mobile */}
        <div
          ref={lineRef}
          className="w-full max-w-[80vw]"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)',
          }}
        />

        {/* Tagline — tighter tracking on mobile */}
        <p
          ref={taglineRef}
          className="font-['Outfit'] font-light text-white/30 uppercase text-center"
          style={{
            fontSize: 'clamp(8px, 2.2vw, 12px)',
            letterSpacing: 'clamp(0.25em, 0.5em, 0.65em)',
          }}
        >
          Cloud · AI · Full Stack
        </p>
      </div>

      {/* Cinematic horizontal wipe panels */}
      {panelColors.map((color, i) => (
        <div
          key={i}
          ref={el => panelsRef.current[i] = el}
          className="absolute inset-0 will-change-transform"
          style={{ zIndex: 100000 + i, backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default Preloader;
