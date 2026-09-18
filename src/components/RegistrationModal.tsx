import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ShieldAlert, QrCode, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  teamName: string;
  track: string;
  leaderName: string;
  email: string;
  institution: string;
  abstract: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    track: 'Smart IoT Systems',
    leaderName: '',
    email: '',
    institution: '',
    abstract: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passData, setPassData] = useState<{
    refId: string;
    teamName: string;
    track: string;
    leaderName: string;
    institution: string;
    timestamp: string;
  } | null>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required.';
    if (!formData.leaderName.trim()) newErrors.leaderName = 'Team leader name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required.';
    if (!formData.institution.trim()) newErrors.institution = 'Institution is required.';
    if (!formData.abstract.trim()) newErrors.abstract = 'Project abstract is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate unique frontend reference ID
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const generatedRefId = `IOT-2026-${randomHex}`;

    setPassData({
      refId: generatedRefId,
      teamName: formData.teamName,
      track: formData.track,
      leaderName: formData.leaderName,
      institution: formData.institution,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    setIsSubmitted(true);

    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9d4edd', '#c77dff', '#e0aaff', '#ffffff']
      });
    } catch {
      // Ignore fallback
    }

    /* 
      ======================================================
      FUTURE BACKEND API CONNECTOR PLACEHOLDER
      ======================================================
      To connect a real registration backend later:
      
      const payload = {
        teamName: formData.teamName,
        track: formData.track,
        leaderName: formData.leaderName,
        email: formData.email,
        institution: formData.institution,
        abstract: formData.abstract,
        submittedAt: new Date().toISOString()
      };

      await fetch('/api/v1/iothrone/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      ======================================================
    */
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#05020a]/85 backdrop-blur-xl animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#0d051a] border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(157,78,221,0.4)] my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          /* REGISTRATION FORM */
          <div className="space-y-6">
            <div className="space-y-2 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/25 text-purple-300 text-xs font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                ENTER THE CHALLENGE
              </div>
              <h2 id="modal-title" className="font-heading font-bold text-2xl sm:text-3xl text-white">
                TEAM <span className="text-gradient-purple">REGISTRATION</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm">
                Register your team details to initialize your IOTHRONE entry pass.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Team Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">TEAM NAME *</label>
                  <input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="e.g. CyberQuantum"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  />
                  {errors.teamName && <p className="text-xs text-red-400">{errors.teamName}</p>}
                </div>

                {/* Track */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">COMPETITION TRACK</label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#160a2a] border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
                  >
                    <option value="Smart IoT Systems">Smart IoT Systems</option>
                    <option value="Robotics & Autonomous Devices">Robotics & Autonomous Devices</option>
                    <option value="Industrial Automation & AI Edge">Industrial Automation & AI Edge</option>
                  </select>
                </div>

                {/* Team Leader Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">TEAM LEADER NAME *</label>
                  <input
                    type="text"
                    value={formData.leaderName}
                    onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                    placeholder="Full Leader Name"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  />
                  {errors.leaderName && <p className="text-xs text-red-400">{errors.leaderName}</p>}
                </div>

                {/* Leader Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">LEADER EMAIL *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="leader@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              {/* Institution */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-purple-300 tracking-wider">INSTITUTION / ORGANIZATION *</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="University or College Name"
                  className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
                {errors.institution && <p className="text-xs text-red-400">{errors.institution}</p>}
              </div>

              {/* Project Abstract */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-purple-300 tracking-wider">PROJECT ABSTRACT BRIEF *</label>
                <textarea
                  rows={3}
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Brief summary of your IoT prototype concept and proposed hardware architecture..."
                  className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 resize-none"
                />
                {errors.abstract && <p className="text-xs text-red-400">{errors.abstract}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 text-white font-heading font-bold text-sm tracking-widest shadow-[0_0_25px_rgba(157,78,221,0.5)] hover:shadow-[0_0_40px_rgba(199,125,255,0.8)] transition-all"
                >
                  INITIALIZE DIGITAL PASS
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* HOLOGRAPHIC DIGITAL PASS RESULT */
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-purple-900/50 border border-purple-400 text-purple-300 animate-bounce">
                <CheckCircle2 className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">
                PASS GENERATED
              </h3>
              <p className="text-xs font-mono text-purple-300">
                REF ID: {passData?.refId}
              </p>
            </div>

            {/* Futuristic Holographic Digital Pass Card */}
            <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-purple-950/90 via-[#180933]/90 to-[#0d051a]/95 border-2 border-purple-400/80 shadow-[0_0_40px_rgba(199,125,255,0.4)] text-left overflow-hidden">
              {/* Holographic Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent transform -rotate-45 pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-purple-500/30 pb-4 mb-6">
                <div>
                  <span className="font-heading font-black text-2xl tracking-wider text-gradient-purple">
                    IOTHRONE
                  </span>
                  <span className="block font-mono text-[10px] text-purple-300 tracking-widest">
                    2026 DIGITAL ENTRY PASS
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-purple-900/50 border border-purple-500/30 text-purple-300">
                  <QrCode className="w-10 h-10 text-purple-200" />
                </div>
              </div>

              {/* Pass Fields Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-purple-300/70 block">TEAM NAME</span>
                  <span className="font-heading font-bold text-sm text-white">{passData?.teamName}</span>
                </div>
                <div>
                  <span className="text-purple-300/70 block">COMPETITION TRACK</span>
                  <span className="font-heading font-bold text-sm text-white">{passData?.track}</span>
                </div>
                <div>
                  <span className="text-purple-300/70 block">TEAM LEADER</span>
                  <span className="font-heading font-bold text-sm text-white">{passData?.leaderName}</span>
                </div>
                <div>
                  <span className="text-purple-300/70 block">INSTITUTION</span>
                  <span className="font-heading font-bold text-sm text-white">{passData?.institution}</span>
                </div>
              </div>

              {/* Important Disclaimer Rule 9 Requirement */}
              <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center gap-2 text-[10px] font-mono text-purple-300">
                <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
                <span>UNVERIFIED DIGITAL PASS — SUBJECT TO OFFICIAL CONFIRMATION</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-purple-900/40 border border-purple-500/30 text-white font-heading font-bold text-xs tracking-wider hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-purple-300" />
                SAVE / PRINT PASS
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-heading font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(157,78,221,0.5)] hover:bg-purple-700 transition-colors"
              >
                RETURN TO SITE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
