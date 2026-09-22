import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // ScrollSpy active link detection
      const sections = ['home', 'about', 'challenge', 'timeline', 'rules', 'faq', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'CHALLENGE', href: '#challenge', id: 'challenge' },
    { label: 'TIMELINE', href: '#timeline', id: 'timeline' },
    { label: 'RULES', href: '#rules', id: 'rules' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#080314]/80 backdrop-blur-xl border-b border-purple-500/20 shadow-[0_4px_30px_rgba(157,78,221,0.15)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
            {/* IIRIS Organizer / Club Brand (Left Side) */}
            <div className="hidden sm:flex items-center pr-3 sm:pr-4 border-r border-purple-500/30 select-none">
              <span className="font-heading font-black text-xl md:text-2xl tracking-widest text-gradient-purple drop-shadow-[0_0_18px_rgba(199,125,255,0.9)]">
                IIRIS
              </span>
            </div>

            {/* IOTHRONE Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg p-1"
            >
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-900 flex items-center justify-center border border-purple-400/40 shadow-[0_0_15px_rgba(157,78,221,0.5)] group-hover:shadow-[0_0_25px_rgba(224,170,255,0.8)] transition-all duration-300">
                <span className="font-heading font-black text-white text-base tracking-tighter">IO</span>
                <div className="absolute inset-0 rounded-lg bg-purple-400/20 animate-ping opacity-30" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl md:text-2xl tracking-widest text-gradient-purple">
                  IOTHRONE
                </span>
                <span className="text-[9px] font-mono tracking-widest text-purple-300/70 -mt-1 hidden sm:block">
                  CORE SYSTEM 2026
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-4 py-1.5 rounded-full bg-purple-950/20 border border-purple-500/15 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-purple-600/60 to-indigo-600/60 border border-purple-400/50 shadow-[0_0_12px_rgba(199,125,255,0.4)]'
                      : 'text-slate-300 hover:text-white hover:bg-purple-900/30'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Section: Core Status & CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Core Online Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/20 text-xs text-purple-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-wider">CORE ONLINE</span>
            </div>

            {/* CTA Button */}
            <button
              onClick={onOpenRegister}
              className="relative group overflow-hidden rounded-full p-[1px] font-semibold text-xs transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 rounded-full animate-spin-slow opacity-80 group-hover:opacity-100" />
              <span className="relative block px-4 py-2 rounded-full bg-[#0d051a] text-purple-200 group-hover:text-white group-hover:bg-purple-950/80 transition-all duration-300 flex items-center gap-1.5 font-heading tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
                ENTER CHALLENGE
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg bg-purple-900/30 border border-purple-500/30 text-purple-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col justify-between bg-[#05020a]/95 backdrop-blur-2xl border-b border-purple-500/20 p-6 pt-24 animate-fadeIn">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
              <span className="font-mono text-xs text-purple-400 tracking-widest">// NAVIGATION CORE</span>
              <div className="flex items-center gap-2 text-xs text-purple-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                ONLINE
              </div>
            </div>

            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-heading text-sm tracking-wider transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-900/60 to-indigo-900/40 text-purple-200 border border-purple-500/30 font-bold'
                      : 'text-slate-300 hover:bg-purple-950/30 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-purple-400" />
                </a>
              );
            })}
          </div>

          <div className="pt-6 border-t border-purple-900/40 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-heading font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(157,78,221,0.5)] active:scale-95 transition-transform"
            >
              ENTER THE CHALLENGE
            </button>
          </div>
        </div>
      )}
    </>
  );
};
