import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Magnetic = ({ children }) => {
  const magneticRef = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magneticRef.current, "x", { duration: 0.8, ease: "power4.out" });
    const yTo = gsap.quickTo(magneticRef.current, "y", { duration: 0.8, ease: "power4.out" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magneticRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.4); // Slightly more pull
      yTo(y * 0.4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const element = magneticRef.current;
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: magneticRef });
};

export default Magnetic;
