import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PopupModal } from 'react-calendly';

gsap.registerPlugin(ScrollTrigger);


export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      })
        .fromTo(
          sectionRef.current.querySelectorAll('.animate-element'),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.target);
    // TODO: Replace with your actual Web3Forms Access Key
    formData.append("access_key", "ecd570a3-dc5a-402c-86b3-e0855a4217f2");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const data = await res.json();

      if (data.success) {
        setSubmitStatus('success');
        e.target.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);

    // Clear status message after 5 seconds
    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#030303] flex flex-col items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[800px] h-[500px] bg-red-600/10 rounded-full blur-[150px] mix-blend-screen opacity-50" />
      </div>

      <div className="max-w-2xl w-full relative z-10 flex flex-col items-center text-center">

        {/* Header Block */}
        <div className="mb-12 animate-element">
          <p className="text-red-500 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4">
            [ Contact ]
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white font-sans leading-none mb-6 drop-shadow-xl">
            Let's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white font-serif italic pr-2">
              Connect
            </span>
          </h2>
          <p className="text-gray-400 font-light text-lg tracking-wide leading-relaxed max-w-xl mx-auto">
            Whether you have a project in mind, want to collaborate, or just want to talk about technology — I'm open to conversations. Feel free to reach out.
          </p>
        </div>


        {/* Divider */}
        <div className="w-full flex items-center gap-4 mb-10 animate-element">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-gray-600 text-xs font-mono tracking-[0.2em] uppercase">or send a message</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        {/* Form Block */}
        <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="relative group animate-element">
              <input
                type="text"
                name="name"
                id="name"
                required
                className="peer w-full bg-white/5 border border-white/10 text-white text-base rounded-xl px-5 pt-7 pb-3 outline-none transition-all duration-300 focus:bg-white/10 focus:border-red-500/50 focus:shadow-[0_0_20px_rgba(239,68,68,0.2)] placeholder-transparent"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute left-5 top-5 text-gray-500 text-base pointer-events-none transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-red-400 peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-400"
              >
                Name
              </label>
            </div>

            {/* Email Input */}
            <div className="relative group animate-element">
              <input
                type="email"
                name="email"
                id="email"
                required
                className="peer w-full bg-white/5 border border-white/10 text-white text-base rounded-xl px-5 pt-7 pb-3 outline-none transition-all duration-300 focus:bg-white/10 focus:border-red-500/50 focus:shadow-[0_0_20px_rgba(239,68,68,0.2)] placeholder-transparent"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-5 top-5 text-gray-500 text-base pointer-events-none transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-red-400 peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-400"
              >
                Email
              </label>
            </div>
          </div>

          {/* Message Textarea */}
          <div className="relative group animate-element">
            <textarea
              name="message"
              id="message"
              required
              rows="5"
              className="peer w-full bg-white/5 border border-white/10 text-white text-base rounded-xl px-5 pt-7 pb-3 outline-none transition-all duration-300 focus:bg-white/10 focus:border-red-500/50 focus:shadow-[0_0_20px_rgba(239,68,68,0.2)] placeholder-transparent resize-none"
              placeholder="Message"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-5 top-5 text-gray-500 text-base pointer-events-none transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-red-400 peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-400"
            >
              Message
            </label>
          </div>

          {/* Submit Button & Status Message */}
          <div className="animate-element pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative group overflow-hidden rounded-full w-full sm:w-auto px-10 py-4 border border-red-500/30 bg-black text-white text-sm uppercase tracking-[0.2em] font-medium transition-all duration-500 ${isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:scale-[1.02] hover:border-red-500 shadow-[0_0_0_rgba(239,68,68,0)] hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                }`}
            >
              {!isSubmitting && <span className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />}
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {!isSubmitting && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-red-500">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                )}
              </span>
            </button>

            <span className="text-gray-500 font-mono text-xs uppercase tracking-widest hidden sm:block">OR</span>

            <button
              type="button"
              onClick={() => setIsCalendlyOpen(true)}
              className="relative group overflow-hidden rounded-full w-full sm:w-auto px-10 py-4 border border-white/20 bg-transparent text-white text-sm uppercase tracking-[0.2em] font-medium transition-all duration-500 hover:scale-[1.02] hover:border-white/50 hover:bg-white/5 flex items-center justify-center space-x-3 cursor-pointer"
            >
              <span>Schedule Call</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-white transition-colors duration-300">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center">
             {/* Status Messages */}
             {submitStatus === 'success' && (
               <p className="text-green-400 text-sm font-mono animate-pulse mt-4">Message sent successfully! I'll be in touch soon.</p>
             )}
             {submitStatus === 'error' && (
               <p className="text-red-400 text-sm font-mono animate-pulse mt-4">Oops! Something went wrong. Please try again later.</p>
             )}
          </div>

        </form>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="relative z-10 mt-28 w-full max-w-[90rem] mx-auto px-6 md:px-12">

        {/* Top gradient divider */}
        <div className="w-full h-[1px] mb-12"
          style={{ background: 'linear-gradient(to right, transparent, rgba(239,68,68,0.4), rgba(255,255,255,0.15), transparent)' }}
        />

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 mb-14">

          {/* ── Brand column */}
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold tracking-widest uppercase text-sm">
              GAURAV JANGID
            </span>
            <p className="text-gray-500 text-sm font-light leading-relaxed max-w-xs">
              Building cloud-native products, AI systems, and full-stack experiences that scale.
            </p>
          </div>

          {/* ── Quick links column */}
          <div className="flex flex-col gap-4 md:items-center">
            <p className="text-white/40 text-[10px] font-mono tracking-[0.3em] uppercase mb-1">Navigate</p>
            <nav className="flex flex-col gap-3">
              {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 text-sm hover:text-red-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  style={{ transition: 'color 0.3s, transform 0.3s' }}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Contact & socials column */}
          <div className="flex flex-col gap-4 md:items-end">
            <p className="text-white/40 text-[10px] font-mono tracking-[0.3em] uppercase mb-1">Get in touch</p>

            <a
              href="mailto:jangidgaurav244@gmail.com"
              className="group flex items-center gap-2 text-gray-300 text-sm hover:text-red-400 transition-colors duration-300"
            >
              {/* Email icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500/70 group-hover:text-red-400 transition-colors">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              jangidgaurav244@gmail.com
            </a>

            <div className="flex items-center gap-3 mt-2">
              {/* GitHub */}
              <a href="https://www.github.com/Gaurav-dev-24" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-red-500/50 hover:shadow-[0_0_14px_rgba(239,68,68,0.3)] transition-all duration-300">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/gauravjangid-14" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-red-500/50 hover:shadow-[0_0_14px_rgba(239,68,68,0.3)] transition-all duration-300">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="https://x.com/GauravJ39435375" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-red-500/50 hover:shadow-[0_0_14px_rgba(239,68,68,0.3)] transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-white/[0.06] pt-6 pb-8 flex items-center justify-center">
          <p className="text-gray-700 text-[10px] font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} Gaurav Jangid — All rights reserved.
          </p>
        </div>

      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />

      {typeof window !== 'undefined' && document.getElementById('root') && (
        <PopupModal
          url="https://calendly.com/jangidgaurav244"
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={document.getElementById('root')}
        />
      )}
    </section>
  );
}
