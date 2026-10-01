import React, { useEffect } from 'react';
import { X, ExternalLink, ArrowLeft, Building2, GraduationCap, FileText, AlertTriangle } from 'lucide-react';
import {
  PCCOE_GOOGLE_FORM_URL,
  NON_PCCOE_UNSTOP_URL,
  PPT_SUBMISSION_GOOGLE_FORM_URL
} from '../config/registrationConfig';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  // Lock background scroll and handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    // Disable background scrolling while modal is open
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePccoeClick = () => {
    window.open(PCCOE_GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const handleNonPccoeClick = () => {
    window.open(NON_PCCOE_UNSTOP_URL, '_blank', 'noopener,noreferrer');
  };

  const handlePptSubmissionClick = () => {
    window.open(PPT_SUBMISSION_GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#05020a]/85 backdrop-blur-xl animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-4xl bg-[#0d051a] border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(157,78,221,0.25)] my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-purple-900/30 border border-purple-500/20 text-purple-300 hover:text-white hover:bg-purple-800/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 text-center sm:text-left pr-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/25 text-purple-300 text-xs font-mono tracking-widest uppercase">
            <span>REGISTRATION GATEWAY</span>
          </div>
          <h2 id="modal-title" className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
            CHOOSE YOUR <span className="text-gradient-purple">REGISTRATION TYPE</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Select your institution category to continue with IOTHRONE 2026 registration.
          </p>
        </div>

        {/* Two Registration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* CARD ONE: PCCOE STUDENTS */}
          <div className="group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 bg-purple-950/20 border border-purple-500/25 hover:border-purple-400/60 shadow-[0_0_20px_rgba(157,78,221,0.1)] hover:shadow-[0_0_35px_rgba(157,78,221,0.25)] transition-all duration-300 h-full">
            <div className="space-y-5">
              {/* Badge & Category Icon */}
              <div className="flex items-center justify-between">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-semibold tracking-wider uppercase">
                  FREE REGISTRATION
                </span>
                <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-500/20 text-purple-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>

              {/* Title & Price */}
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-wide">
                  PCCOE STUDENTS
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-black text-3xl sm:text-4xl text-emerald-400">
                    ₹0
                  </span>
                  <span className="font-mono text-xs text-emerald-300/80 font-semibold uppercase tracking-wider">
                    — FREE
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Are you a student of Pimpri Chinchwad College of Engineering? Register your team for IOTHRONE 2026 with free registration.
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-6 mt-auto">
              <button
                type="button"
                onClick={handlePccoeClick}
                className="w-full py-3.5 px-5 rounded-xl bg-purple-900/40 hover:bg-purple-800/70 border border-purple-400/40 hover:border-purple-400 text-white font-heading font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(157,78,221,0.3)]"
              >
                <span>Register as PCCOE Team</span>
                <ExternalLink className="w-4 h-4 text-purple-300" />
              </button>
            </div>
          </div>

          {/* CARD TWO: NON-PCCOE STUDENTS */}
          <div className="group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 bg-purple-950/20 border border-purple-500/25 hover:border-purple-400/60 shadow-[0_0_20px_rgba(157,78,221,0.1)] hover:shadow-[0_0_35px_rgba(157,78,221,0.25)] transition-all duration-300">
            <div className="space-y-5">
              {/* Badge & Category Icon */}
              <div className="flex items-center justify-between">
                <span className="inline-block px-3 py-1 rounded-full bg-purple-900/50 border border-purple-400/40 text-purple-200 text-[11px] font-mono font-semibold tracking-wider uppercase">
                  OPEN TO ALL OTHER INSTITUTIONS
                </span>
                <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-500/20 text-purple-300">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

              {/* Title & Price */}
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-wide">
                  NON-PCCOE STUDENTS
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-black text-3xl sm:text-4xl text-purple-300">
                    ₹99
                  </span>
                  <span className="font-mono text-xs text-purple-300/80 font-semibold uppercase tracking-wider">
                    PER TEAM
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Studying at another institution? Join the IOTHRONE 2026 challenge by completing your registration through Unstop.
              </p>

              {/* Primary Action Button: Register via Unstop */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleNonPccoeClick}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-heading font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_20px_rgba(157,78,221,0.4)] transition-all flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                >
                  <span>Register via Unstop</span>
                  <ExternalLink className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* CLEARLY HIGHLIGHTED GOOGLE FORM & PPT SUBMISSION INSTRUCTION */}
              <div className="mt-4 p-4 sm:p-5 rounded-xl bg-gradient-to-br from-purple-950/90 via-[#1a0833]/90 to-[#120524]/95 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.2)] text-left space-y-3 relative overflow-hidden">
                {/* Header with Alert Icon */}
                <div className="flex items-start gap-2.5 text-amber-300 font-mono text-xs font-bold tracking-wider leading-snug uppercase">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>IMPORTANT: NON-PCCOE TEAMS MUST ALSO FILL THE GOOGLE FORM AND UPLOAD THEIR PPT.</span>
                </div>

                {/* Supporting Description */}
                <p className="text-slate-200 text-xs leading-relaxed font-sans">
                  After completing your Unstop registration, fill out the Google Form and upload your project presentation (PPT).
                </p>

                {/* Secondary Action Button: Upload PPT Through Google Form */}
                <button
                  type="button"
                  onClick={handlePptSubmissionClick}
                  className="w-full py-3 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-purple-950 font-heading font-bold text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(251,191,36,0.4)] flex items-center justify-center gap-2 uppercase transform hover:scale-[1.01]"
                >
                  <FileText className="w-4 h-4 text-purple-950" />
                  <span>Upload PPT Through Google Form</span>
                  <ExternalLink className="w-3.5 h-3.5 text-purple-950" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Back Action */}
        <div className="pt-8 border-t border-purple-900/40 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-900/20 hover:bg-purple-900/40 border border-purple-500/20 text-purple-300 hover:text-white font-heading font-semibold text-xs tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Website</span>
          </button>
          <span className="font-mono text-[11px] text-purple-400/60 tracking-wider">
            IOTHRONE 2026 • OFFICIAL REGISTRATION GATEWAY
          </span>
        </div>
      </div>
    </div>
  );
};
