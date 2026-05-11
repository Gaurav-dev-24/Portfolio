import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * PageLoader — slim red progress bar at the top of the page.
 * Runs on every page load (independent of the Preloader session gate).
 * Calls onComplete when the animation is finished so the parent can unmount it.
 */
const PageLoader = ({ onComplete }) => {
  const barRef    = useRef(null);
  const glowRef   = useRef(null);
  const wrapRef   = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Start at 0 width
    gsap.set(barRef.current,  { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(glowRef.current, { opacity: 1 });
    gsap.set(wrapRef.current, { opacity: 1 });

    // Fill bar 0 → 100% in two eased steps (feels like real loading)
    tl
      .to(barRef.current, {
        scaleX: 0.7,
        duration: 0.9,
        ease: 'power2.out',
      })
      .to(barRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: 'power3.inOut',
      })
      // Fade the whole bar out
      .to(wrapRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
      });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={wrapRef}
      className="fixed top-0 left-0 w-full z-[999999] pointer-events-none"
      style={{ opacity: 0 }}
    >
      {/* Track */}
      <div className="w-full h-[2px] bg-white/5">
        {/* Progress bar */}
        <div
          ref={barRef}
          className="h-full w-full"
          style={{
            background: 'linear-gradient(to right, #b91c1c, #ef4444, #fca5a5)',
          }}
        />
      </div>

      {/* Glow dot at the leading edge */}
      <div
        ref={glowRef}
        className="absolute top-0 right-0 w-12 h-[2px]"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(239,68,68,0.8))',
          boxShadow: '0 0 10px 2px rgba(239,68,68,0.6)',
        }}
      />
    </div>
  );
};

export default PageLoader;
