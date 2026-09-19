import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ShieldAlert, QrCode, Download, ExternalLink, FileText, AlertTriangle } from 'lucide-react';
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
  email: string;
  leaderPhone: string;
  institution: string;
  member2: string;
  member3: string;
  member4: string;
  projectTitle: string;
  abstract: string;
  technologies: string;
  prototypeStatus: string;
  projectLink: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    track: 'Smart IoT Systems',
    leaderName: '',
    email: '',
    leaderPhone: '',
    institution: '',
    member2: '',
    member3: '',
    member4: '',
    projectTitle: '',
    abstract: '',
    technologies: '',
    prototypeStatus: 'Idea / Concept',
    projectLink: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passData, setPassData] = useState<{
    refId: string;
    teamName: string;
    track: string;
    leaderName: string;
    institution: string;
    membersCount: number;
    projectTitle: string;
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
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required.';
    if (!formData.track.trim()) newErrors.track = 'Competition track is required.';
    if (!formData.leaderName.trim()) newErrors.leaderName = 'Team leader name is required.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Leader email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.leaderPhone.trim()) {
      newErrors.leaderPhone = 'Leader contact number is required.';
    } else if (!/^[6-9]\d{9}$/.test(formData.leaderPhone.trim().replace(/\D/g, ''))) {
      newErrors.leaderPhone = 'Enter a valid 10-digit mobile number.';
    }

    if (!formData.institution.trim()) newErrors.institution = 'Institution name is required.';
    if (!formData.member2.trim()) newErrors.member2 = 'Team member 2 is required.';
    if (!formData.member3.trim()) newErrors.member3 = 'Team member 3 is required.';
    if (!formData.projectTitle.trim()) newErrors.projectTitle = 'Project title is required.';
    if (!formData.abstract.trim()) newErrors.abstract = 'Project abstract brief is required.';
    if (!formData.prototypeStatus.trim()) newErrors.prototypeStatus = 'Prototype status is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const entryIds = GOOGLE_FORM_CONFIG.ENTRY_IDS;

    // Prepare Google Form submission payload
    const formParams = new URLSearchParams();
    formParams.append(entryIds.TEAM_NAME, formData.teamName.trim());
    formParams.append(entryIds.TRACK, formData.track.trim());
    formParams.append(entryIds.LEADER_NAME, formData.leaderName.trim());
    formParams.append(entryIds.LEADER_EMAIL, formData.email.trim());
    formParams.append(entryIds.LEADER_PHONE, formData.leaderPhone.trim());
    formParams.append(entryIds.INSTITUTION, formData.institution.trim());
    formParams.append(entryIds.MEMBER_2, formData.member2.trim());
    formParams.append(entryIds.MEMBER_3, formData.member3.trim());
    
    if (formData.member4.trim()) {
      formParams.append(entryIds.MEMBER_4, formData.member4.trim());
    }

    formParams.append(entryIds.PROJECT_TITLE, formData.projectTitle.trim());
    formParams.append(entryIds.ABSTRACT, formData.abstract.trim());

    // Technologies mapping or custom string handling
    const rawTech = formData.technologies.trim();
    const defaultTechOption = 'Microcontrollers (Arduino, ESP32, Raspberry Pi)';
    const techPayload = rawTech.length > 0 ? rawTech : defaultTechOption;
    formParams.append(entryIds.TECHNOLOGIES, techPayload);

    // Prototype status mapping to exact Google Form option string
    const mappedStatus = GOOGLE_FORM_CONFIG.PROTOTYPE_STATUS_MAPPING[formData.prototypeStatus] || formData.prototypeStatus;
    formParams.append(entryIds.PROTOTYPE_STATUS, mappedStatus);

    // Confirmation checkbox required by Google Form
    formParams.append(entryIds.CONFIRMATION, GOOGLE_FORM_CONFIG.CONFIRMATION_TEXT);

    try {
      // Execute POST request to Google Form formResponse endpoint
      await fetch(GOOGLE_FORM_CONFIG.SUBMIT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formParams.toString(),
      });

      // Calculate total team members count
      const totalMembers = 3 + (formData.member4.trim() ? 1 : 0);
      const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
      const generatedRefId = `IOT-2026-${randomHex}`;

      setPassData({
        refId: generatedRefId,
        teamName: formData.teamName,
        track: formData.track,
        leaderName: formData.leaderName,
        institution: formData.institution,
        membersCount: totalMembers,
        projectTitle: formData.projectTitle,
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });

      setIsSubmitted(true);
      setSubmissionError(null);

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
    } catch (err) {
      console.error('Google Form submission error:', err);
      setSubmissionError('REGISTRATION COULD NOT BE SUBMITTED');
    } finally {
      setIsSubmitting(false);
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
                Complete your registration details to submit directly to the official Google Form database.
              </p>
            </div>

            {/* Error Banner */}
            {submissionError && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-mono space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-red-400">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{submissionError}</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Please try again or submit your registration using the official form.
                </p>
                <button
                  type="button"
                  onClick={handleOpenOfficialForm}
                  className="mt-1 px-3 py-1.5 rounded-lg bg-red-900/50 border border-red-400/40 text-white font-mono text-xs hover:bg-red-800 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>OPEN GOOGLE FORM</span>
                </button>
              </div>
            )}

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

              {/* ROW 2: Team Leader Name & Leader Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">
                    TEAM LEADER NAME <span className="text-purple-400">*</span>
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
                    LEADER EMAIL <span className="text-purple-400">*</span>
                  </label>
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

              {/* ROW 3: Leader Contact & Project Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">
                    LEADER CONTACT NUMBER <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.leaderPhone}
                    onChange={(e) => setFormData({ ...formData, leaderPhone: e.target.value })}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  />
                  {errors.leaderPhone && <p className="text-xs text-red-400">{errors.leaderPhone}</p>}
                </div>

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
              </div>

              {/* ROW 4: Institution / Organization */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-purple-300 tracking-wider">
                  INSTITUTION / ORGANIZATION <span className="text-purple-400">*</span>
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

              {/* ROW 5 & 6: Team Members (3-4 members total including Leader) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">
                    TEAM MEMBER 2 <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.member2}
                    onChange={(e) => setFormData({ ...formData, member2: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  />
                  {errors.member2 && <p className="text-xs text-red-400">{errors.member2}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">
                    TEAM MEMBER 3 <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.member3}
                    onChange={(e) => setFormData({ ...formData, member3: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  />
                  {errors.member3 && <p className="text-xs text-red-400">{errors.member3}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-purple-300 tracking-wider">
                  TEAM MEMBER 4 <span className="text-slate-500">(OPTIONAL)</span>
                </label>
                <input
                  type="text"
                  value={formData.member4}
                  onChange={(e) => setFormData({ ...formData, member4: e.target.value })}
                  placeholder="Full Name (Optional)"
                  className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
                <span className="block text-[11px] font-mono text-purple-300/60">
                  Note: Teams consist of 3–4 members total (Leader + Member 2 + Member 3 + optional Member 4).
                </span>
              </div>

              {/* ROW 7: Project Abstract Brief */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-purple-300 tracking-wider">
                  PROJECT ABSTRACT BRIEF <span className="text-purple-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Briefly describe your IoT prototype, the problem it addresses, and your proposed solution..."
                  className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 resize-none"
                />
                {errors.abstract && <p className="text-xs text-red-400">{errors.abstract}</p>}
              </div>

              {/* ROW 8: Technologies / Hardware / Software Used */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-purple-300 tracking-wider">
                  TECHNOLOGIES, SENSORS, HARDWARE & SOFTWARE USED
                </label>
                <textarea
                  rows={2}
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="e.g. ESP32, Arduino, sensors, React, Node.js, MQTT..."
                  className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 resize-none"
                />
              </div>

              {/* ROW 9: Prototype Status & Project Demo Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">
                    PROTOTYPE STATUS <span className="text-purple-400">*</span>
                  </label>
                  <select
                    value={formData.prototypeStatus}
                    onChange={(e) => setFormData({ ...formData, prototypeStatus: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#160a2a] border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
                  >
                    <option value="Idea / Concept">Idea / Concept</option>
                    <option value="Prototype in Development">Prototype in Development</option>
                    <option value="Working Prototype">Working Prototype</option>
                    <option value="Fully Demonstrable Prototype">Fully Demonstrable Prototype</option>
                  </select>
                  {errors.prototypeStatus && <p className="text-xs text-red-400">{errors.prototypeStatus}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-purple-300 tracking-wider">
                    PROJECT / GITHUB / DEMO LINK
                  </label>
                  <input
                    type="url"
                    value={formData.projectLink}
                    onChange={(e) => setFormData({ ...formData, projectLink: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 text-white font-heading font-bold text-sm tracking-widest shadow-[0_0_25px_rgba(157,78,221,0.5)] hover:shadow-[0_0_40px_rgba(199,125,255,0.8)] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'INITIALIZING...' : 'INITIALIZE DIGITAL PASS'}
                </button>

                {/* Secondary Option */}
                <div className="flex items-center justify-center gap-2 pt-2 text-xs font-mono text-slate-400">
                  <span>Prefer the official form?</span>
                  <button
                    type="button"
                    onClick={handleOpenOfficialForm}
                    className="text-purple-300 hover:text-white font-semibold underline flex items-center gap-1"
                  >
                    <span>OPEN GOOGLE FORM</span>
                    <ExternalLink className="w-3 h-3 text-purple-400" />
                  </button>
                </div>
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
                REGISTRATION INITIALIZED
              </h3>
              <p className="text-xs font-mono text-purple-300">
                REFERENCE: {passData?.refId}
              </p>
              <p className="text-xs text-slate-300">
                Registration details submitted successfully to Google Form response database.
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
                <div>
                  <span className="text-purple-300/70 block">PROJECT TITLE:</span>
                  <span className="font-heading font-bold text-sm text-white">{passData?.projectTitle}</span>
                </div>
                <div>
                  <span className="text-purple-300/70 block">REFERENCE:</span>
                  <span className="font-heading font-bold text-sm text-white">{passData?.refId}</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center gap-2 text-[10px] font-mono text-purple-300">
                <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
                <span>UNVERIFIED DIGITAL PASS — SUBJECT TO OFFICIAL CONFIRMATION</span>
              </div>
            </div>

            {/* PPT File Upload Notice & Complete PPT Submission Button */}
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-purple-300">
                <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                <span>COMPLETE PPT / PRESENTATION SUBMISSION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Registration details submitted successfully. If you have not uploaded your presentation file yet, complete your file upload via the official form.
              </p>
              <button
                type="button"
                onClick={handleOpenOfficialForm}
                className="mt-1 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-mono text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>COMPLETE PPT SUBMISSION</span>
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
