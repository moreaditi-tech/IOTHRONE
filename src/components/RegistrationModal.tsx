import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldAlert, QrCode, Download, ExternalLink, FileText, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GOOGLE_FORM_CONFIG } from '../config/googleFormConfig';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  teamName: string;
  track: string;
  leaderName: string;
  institution: string;
  projectTitle: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    track: 'Smart IoT Systems',
    leaderName: '',
    institution: '',
    projectTitle: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passData, setPassData] = useState<FormData | null>(null);

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
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required.';
    if (!formData.track.trim()) newErrors.track = 'Competition track is required.';
    if (!formData.leaderName.trim()) newErrors.leaderName = 'Team leader name is required.';
    if (!formData.institution.trim()) newErrors.institution = 'Institution name is required.';
    if (!formData.projectTitle.trim()) newErrors.projectTitle = 'Project title is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setPassData({
      teamName: formData.teamName.trim(),
      track: formData.track.trim(),
      leaderName: formData.leaderName.trim(),
      institution: formData.institution.trim(),
      projectTitle: formData.projectTitle.trim(),
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
  };

  const handleOpenOfficialForm = () => {
    window.open(GOOGLE_FORM_CONFIG.FORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#05020a]/85 backdrop-blur-xl animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-3xl bg-[#0d051a] border-2 border-purple-500/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_50px_rgba(157,78,221,0.4)] my-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          /* REGISTRATION / DIGITAL PASS GENERATOR FORM */
          <div className="space-y-6">
            <div className="space-y-2 pr-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/25 text-purple-300 text-xs font-mono tracking-widest uppercase">
                DIGITAL PASS GENERATOR
              </div>
              <h2 id="modal-title" className="font-heading font-bold text-2xl sm:text-3xl text-white">
                GENERATE <span className="text-gradient-purple">DIGITAL PASS</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm">
                Enter basic team details below to generate your IOTHRONE 2026 Digital Entry Pass.
              </p>
            </div>

            {/* Registration Fee Information */}
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 font-mono text-xs text-purple-200 space-y-1.5">
              <div className="font-bold text-purple-300 tracking-wider text-[11px] uppercase">
                REGISTRATION FEE
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
                <span className="text-slate-200">PCCOE Students — <strong className="text-emerald-400 font-bold">FREE</strong></span>
                <span className="hidden sm:inline text-purple-500/60">•</span>
                <span className="text-slate-200">Non-PCCOE Students — <strong className="text-purple-300 font-bold">₹99 / Team</strong></span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* ROW 1: Team Name & Competition Track */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">
                    TEAM NAME <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="e.g. CyberQuantum"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  />
                  {errors.teamName && <p className="text-xs text-red-400">{errors.teamName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">
                    COMPETITION TRACK <span className="text-purple-400">*</span>
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#160a2a] border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
                  >
                    <option value="Smart IoT Systems">Smart IoT Systems</option>
                    <option value="Robotics & Autonomous Devices">Robotics & Autonomous Devices</option>
                    <option value="Industrial Automation & AI Edge">Industrial Automation & AI Edge</option>
                  </select>
                  {errors.track && <p className="text-xs text-red-400">{errors.track}</p>}
                </div>
              </div>

              {/* ROW 2: Team Leader Name & Institution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">
                    TEAM LEADER <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.leaderName}
                    onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                    placeholder="Full Leader Name"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  />
                  {errors.leaderName && <p className="text-xs text-red-400">{errors.leaderName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">
                    INSTITUTION <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="University or College Name"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  />
                  {errors.institution && <p className="text-xs text-red-400">{errors.institution}</p>}
                </div>
              </div>

              {/* ROW 3: Project Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-purple-300 tracking-wider">
                  PROJECT TITLE <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  placeholder="Enter your project / prototype title"
                  className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
                {errors.projectTitle && <p className="text-xs text-red-400">{errors.projectTitle}</p>}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 text-white font-heading font-bold text-sm tracking-widest shadow-[0_0_25px_rgba(157,78,221,0.5)] hover:shadow-[0_0_40px_rgba(199,125,255,0.8)] transition-all"
                >
                  GENERATE DIGITAL PASS
                </button>

                {/* Secondary Options */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-mono text-slate-400">
                  <a
                    href="/IOTHRONE_Rulebook_2026_New.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-white font-semibold underline flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-purple-400" />
                    <span>VIEW RULEBOOK</span>
                    <ExternalLink className="w-3 h-3 text-purple-400" />
                  </a>
                  <span className="text-purple-500/60 hidden sm:inline">•</span>
                  <div className="flex items-center gap-1">
                    <span>Prefer official form?</span>
                    <button
                      type="button"
                      onClick={handleOpenOfficialForm}
                      className="text-purple-300 hover:text-white font-semibold underline flex items-center gap-1"
                    >
                      <span>OPEN GOOGLE FORM ↗</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* HOLOGRAPHIC DIGITAL PASS RESULT */
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-purple-900/50 border border-purple-400 text-purple-300">
                <CheckCircle2 className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">
                DIGITAL PASS GENERATED
              </h3>
              <p className="text-xs text-slate-300">
                Your Digital Entry Pass has been generated.
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

              {/* Pass Fields Grid (EXACTLY 5 FIELDS - NO REFERENCE NUMBER) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-purple-300/70 block">TEAM:</span>
                  <span className="font-heading font-bold text-sm text-white">{passData?.teamName}</span>
                </div>
                <div>
                  <span className="text-purple-300/70 block">TRACK:</span>
                  <span className="font-heading font-bold text-sm text-white">{passData?.track}</span>
                </div>
                <div>
                  <span className="text-purple-300/70 block">TEAM LEADER:</span>
                  <span className="font-heading font-bold text-sm text-white">{passData?.leaderName}</span>
                </div>
                <div>
                  <span className="text-purple-300/70 block">INSTITUTION:</span>
                  <span className="font-heading font-bold text-sm text-white">{passData?.institution}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-purple-300/70 block">PROJECT TITLE:</span>
                  <span className="font-heading font-bold text-sm text-white">{passData?.projectTitle}</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center gap-2 text-[10px] font-mono text-purple-300">
                <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
                <span>UNVERIFIED DIGITAL PASS — SUBJECT TO OFFICIAL CONFIRMATION</span>
              </div>
            </div>

            {/* Highly Visible Google Form Callout Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/90 via-[#1d093a]/90 to-[#0d051a]/95 border-2 border-purple-400 shadow-[0_0_35px_rgba(157,78,221,0.5)] text-left space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold tracking-wider uppercase">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>IMPORTANT — COMPLETE YOUR REGISTRATION</span>
              </div>
              
              <div className="space-y-1.5 text-xs text-slate-200 leading-relaxed">
                <p className="font-semibold text-white">
                  Your Digital Pass has been generated, but your official registration is NOT complete yet.
                </p>
                <p className="text-slate-300">
                  Please complete the official IOTHRONE 2026 Google Form to submit your full registration details and Round 1 presentation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenOfficialForm}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-heading font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(199,125,255,0.6)] transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]"
              >
                <span>COMPLETE OFFICIAL REGISTRATION ↗</span>
              </button>
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
