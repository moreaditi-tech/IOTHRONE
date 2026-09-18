import React from 'react';
import { Mail, Globe, Share2, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Challenge', href: '#challenge' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Rules', href: '#rules' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative bg-[#040108] border-t border-purple-900/40 py-16 px-4 sm:px-6 lg:px-8 text-slate-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-900 flex items-center justify-center border border-purple-400/40">
                <span className="font-heading font-black text-white text-xs">IO</span>
              </div>
              <span className="font-heading font-bold text-2xl tracking-widest text-white">
                IOTHRONE
              </span>
            </div>
            <p className="text-xs font-mono tracking-wider text-purple-300">
              POWERING THE NEXT GENERATION OF INNOVATORS.
            </p>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              The national IoT innovation hackathon and hardware connectivity challenge. Build real-time embedded systems, sensor arrays, and AI edge intelligence.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-mono text-xs text-purple-300 tracking-widest uppercase">
              // QUICK LINKS
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-slate-400 hover:text-purple-300 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Placeholder Section (Rule 7 Requirement) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs text-purple-300 tracking-widest uppercase">
              // OFFICIAL CONTACT
            </h4>
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-purple-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>[ADD OFFICIAL CONTACT]</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Organizing Secretariat & Technical Helpdesk
              </p>
            </div>
          </div>
        </div>

        {/* Social Icons & Bottom Row */}
        <div className="pt-8 border-t border-purple-950/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <a href="#contact" aria-label="Portal Link" className="p-2 rounded-lg bg-purple-950/40 hover:text-purple-300 transition-colors flex items-center gap-1.5 text-xs">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>IOTHRONE PORTAL</span>
            </a>
            <a href="#contact" aria-label="Share Event" className="p-2 rounded-lg bg-purple-950/40 hover:text-purple-300 transition-colors flex items-center gap-1.5 text-xs">
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>SHARE</span>
            </a>
            <a href="#contact" aria-label="External Link" className="p-2 rounded-lg bg-purple-950/40 hover:text-purple-300 transition-colors flex items-center gap-1.5 text-xs">
              <ExternalLink className="w-4 h-4 text-purple-400" />
            </a>
          </div>

          <div className="text-center sm:text-right">
            <span>© 2026 IOTHRONE. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
