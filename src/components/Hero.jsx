import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { vertexShader, fragmentShader } from './HeroShaders';
import imgMan from '../assets/man/Gaurav.png';
import imgSpiderman from '../assets/spiderman/generate_image.png';
import Magnetic from './Magnetic';

export default function Hero({ isPreloaderFinished }) {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  
  const uniformRef = useRef(null);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.5 });
  
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !isPreloaderFinished) return;

    const container = containerRef.current;
    
    // Smooth entrance reveal
    gsap.fromTo(container, 
      { opacity: 0, scale: 1.1 }, 
      { opacity: 1, scale: 1, duration: 2, ease: "expo.out" }
    );
    
    if (textRef.current) {
      const elements = textRef.current.querySelectorAll('.reveal-el');
      gsap.fromTo(elements,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.8 }
      );
    }
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    let isTexturesLoaded = false;
    
    const uniforms = {
      uTexture1: { value: null },
      uTexture2: { value: null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHovered: { value: 0.0 },
      uRadius: { value: 0.4 },
      uSoftness: { value: 0.15 },
      uScale: { value: 0.05 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uImageResolution: { value: new THREE.Vector2(1024, 571) }
    };
    
    uniformRef.current = uniforms;

    Promise.all([
      textureLoader.loadAsync(imgMan),
      textureLoader.loadAsync(imgSpiderman)
    ]).then(([tex1, tex2]) => {
      tex1.generateMipmaps = false;
      tex1.minFilter = THREE.LinearFilter;
      tex1.magFilter = THREE.LinearFilter;
      
      tex2.generateMipmaps = false;
      tex2.minFilter = THREE.LinearFilter;
      tex2.magFilter = THREE.LinearFilter;
      
      uniforms.uTexture1.value = tex1;
      uniforms.uTexture2.value = tex2;
      
      if (tex1.image) {
        uniforms.uImageResolution.value.set(tex1.image.width, tex1.image.height);
      }
      
      isTexturesLoaded = true;
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderTick = () => {
      if (!isTexturesLoaded) return;
      
      mouseCurrent.current.x = gsap.utils.interpolate(mouseCurrent.current.x, mouseTarget.current.x, 0.1);
      mouseCurrent.current.y = gsap.utils.interpolate(mouseCurrent.current.y, mouseTarget.current.y, 0.1);
      
      uniforms.uMouse.value.set(mouseCurrent.current.x, mouseCurrent.current.y);
      
      if(cursorRef.current) {
        gsap.set(cursorRef.current, {
           x: mouseCurrent.current.x * width,
           y: mouseCurrent.current.y * height,
        });
      }

      renderer.render(scene, camera);
    };
    
    gsap.ticker.add(renderTick);

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width;
      const y = 1.0 - ((e.clientY - rect.top) / height);
      
      mouseTarget.current.x = x;
      mouseTarget.current.y = y;
    };
    
    const onMouseEnter = () => {
      setIsHovered(true);
      gsap.to(uniforms.uHovered, {
        value: 1.0,
        duration: 1.2,
        ease: "power3.out"
      });
      if(cursorRef.current) {
         gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };
    
    const onMouseLeave = () => {
      setIsHovered(false);
      gsap.to(uniforms.uHovered, {
        value: 0.0,
        duration: 1.2,
        ease: "power3.out"
      });
      if(cursorRef.current) {
         gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
      }
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    
    window.addEventListener('resize', onResize);

    return () => {
      gsap.ticker.remove(renderTick);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [isPreloaderFinished]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 select-none cursor-none"
      />
      
      {/* Custom Cursor / Light Bloom Overlay */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-20 mix-blend-screen opacity-0 scale-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Foreground UI Components */}
      <div ref={textRef} className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center mx-auto w-full max-w-[90rem] px-8 lg:px-16 mt-20">
        <div 
          className="w-full flex flex-col md:flex-row justify-between md:items-end transition-all duration-700 ease-out transform gap-6 md:gap-10" 
          style={{ transform: isHovered ? 'translateY(-20px)' : 'translateY(0px)' }}
        >
            
          {/* Left Side: Intro and Title */}
          <div className="flex-1 max-w-sm md:max-w-md lg:max-w-md text-left">
            <p className="reveal-el text-sm md:text-base text-gray-300 font-medium tracking-widest uppercase mb-4 md:mb-6 opacity-90 drop-shadow-md">
              Hey, I'm Gaurav Jangid
            </p>
            
            <h1 className="reveal-el text-[2.5rem] leading-[1] sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold tracking-tighter drop-shadow-2xl md:leading-[1.05] font-sans">
              Building <br />
              Scalable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 font-serif italic font-light pr-2">Cloud</span> &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 font-serif italic font-light pr-2">AI</span><br />
              Solutions
            </h1>
          </div>
          
          {/* Right Side: Description and CTAs */}
          <div className="flex-1 max-w-md text-left md:text-right flex flex-col md:items-end mt-2 md:mt-0">
            <p className="reveal-el text-sm sm:text-base md:text-lg text-gray-300 drop-shadow-xl font-light tracking-wide leading-relaxed mb-6 md:mb-8 max-w-sm">
              I develop production-ready applications focused on scalability, performance, and clean system architecture. My work combines modern web development, cloud infrastructure, and AI-driven workflows.
            </p>
            
            <div className="reveal-el flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 pointer-events-auto">
              <Magnetic>
                <a
                  href="#contact"
                  className="px-7 py-3 rounded-full bg-white text-black text-sm tracking-[0.15em] uppercase font-bold hover:bg-gray-200 transition-all duration-500 text-center"
                >
                  Let's Talk
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#projects"
                  className="px-7 py-3 rounded-full border border-white/30 text-white text-sm tracking-[0.15em] uppercase font-bold hover:bg-white/10 transition-all duration-500 text-center"
                >
                  View Work
                </a>
              </Magnetic>
            </div>
          </div>
            
        </div>
      </div>
      
      {/* Overlay border/frame for cinematic effect */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}
