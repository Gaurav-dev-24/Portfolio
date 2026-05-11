import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const textRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power4.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power4.out" });
    
    const fxTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power2.out" });
    const fyTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power2.out" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      fxTo(e.clientX);
      fyTo(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnterLink = (e) => {
      setIsHovering(true);
      const text = e.currentTarget.getAttribute('data-cursor-text');
      if (text) setCursorText(text);
    };
    const handleMouseLeaveLink = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const updateLinks = () => {
      const interactiveElements = document.querySelectorAll('a, button, .interactive, [data-cursor-text]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnterLink);
        el.addEventListener('mouseleave', handleMouseLeaveLink);
      });
    };

    updateLinks();
    const observer = new MutationObserver(updateLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      const size = cursorText ? 80 : 1.5;
      gsap.to(cursorRef.current, { 
        scale: size, 
        backgroundColor: cursorText ? 'rgba(255, 255, 255, 1)' : 'rgba(220, 38, 38, 0.8)', 
        duration: 0.4,
        ease: "power3.out"
      });
      gsap.to(followerRef.current, { 
        scale: cursorText ? 0 : 2.5, 
        opacity: cursorText ? 0 : 1,
        duration: 0.4 
      });
      if (cursorText) {
        gsap.to(textRef.current, { opacity: 1, scale: 1, duration: 0.3 });
      }
    } else {
      gsap.to(cursorRef.current, { scale: 1, backgroundColor: '#fff', duration: 0.4 });
      gsap.to(followerRef.current, { scale: 1, opacity: 1, duration: 0.4 });
      gsap.to(textRef.current, { opacity: 0, scale: 0, duration: 0.3 });
    }
  }, [isHovering, cursorText]);

  useEffect(() => {
    if (isClicking) {
      gsap.to([cursorRef.current, followerRef.current], { scale: 0.8, duration: 0.2 });
    } else {
      gsap.to([cursorRef.current, followerRef.current], { scale: isHovering ? (cursorText ? 80 : 1.5) : 1, duration: 0.2 });
    }
  }, [isClicking, isHovering, cursorText]);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center overflow-hidden"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <span ref={textRef} className="text-[10px] font-bold text-black opacity-0 scale-0 tracking-tighter uppercase leading-none text-center">
          {cursorText}
        </span>
      </div>
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-white/30 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;
