export interface TimelineStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  date: string;
  time?: string;
  activity?: string;
  description: string;
  badge: string;
  status: 'upcoming' | 'current' | 'future';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface RuleCategory {
  id: string;
  title: string;
  rules: string[];
}

export const COMPETITION_TIMELINE: TimelineStage[] = [
  {
    id: 'registration',
    number: '01',
    title: 'REGISTRATION & PPT SUBMISSION',
    subtitle: 'Submission Phase',
    date: 'Deadline: 5 October 2026',
    description: 'Complete registration and submit your presentation before the deadline.',
    badge: 'STAGE 01',
    status: 'current'
  },
  {
    id: 'round1',
    number: '02',
    title: 'ROUND 1 — PROTOTYPE PRESENTATION',
    subtitle: 'Demonstration & Concept Evaluation',
    date: '9 October 2026',
    time: '9:00 AM – 4:00 PM',
    activity: 'Prototype presentation and demonstration.',
    description: 'Present your concept, demonstrate your prototype, and showcase how your system works.',
    badge: 'STAGE 02',
    status: 'upcoming'
  },
  {
    id: 'round2',
    number: '03',
    title: 'ROUND 2 — REAL-TIME MODIFICATION & INTEGRATION',
    subtitle: 'Live Implementation Challenge',
    date: '10 October 2026',
    time: '9:00 AM – 4:00 PM',
    activity: 'Real-time modification, integration, and implementation of the system.',
    description: 'Modify and integrate your system in real time according to the challenge requirements.',
    badge: 'STAGE 03',
    status: 'future'
  }
];

export const ABOUT_CARDS = [
  {
    number: '01',
    title: 'INNOVATION',
    description: 'Turn creative ideas into working technological solutions.',
    icon: 'Lightbulb'
  },
  {
    number: '02',
    title: 'INTEGRATION',
    description: 'Connect hardware, software, sensors and intelligent systems.',
    icon: 'Cpu'
  },
  {
    number: '03',
    title: 'IMPACT',
    description: 'Build solutions designed to solve real-world problems.',
    icon: 'Zap'
  }
];

export const CHALLENGE_STAGES = [
  {
    id: 'ideate',
    step: '01',
    title: 'IDEATE',
    subtitle: 'Conceptualize the Solution',
    description: 'Formulate your IoT architectural blueprint, define sensor inputs, and outline system communication protocols.',
    icon: 'Sparkles'
  },
  {
    id: 'build',
    step: '02',
    title: 'BUILD',
    subtitle: 'Hardware & Code Assembly',
    description: 'Construct the physical prototype, wire microcontrollers, program edge sensors, and establish cloud telemetry.',
    icon: 'Wrench'
  },
  {
    id: 'integrate',
    step: '03',
    title: 'INTEGRATE',
    subtitle: 'Real-Time System Connectivity',
    description: 'Unify edge devices, machine learning models, and real-time control streams into one resilient power core.',
    icon: 'Share2'
  }
];

export const PROCESS_NODES = [
  { step: '01', title: 'REGISTER', desc: 'Form your team and register before the submission deadline.' },
  { step: '02', title: 'DESIGN', desc: 'Architect hardware schematics and intelligent connectivity workflows.' },
  { step: '03', title: 'BUILD', desc: 'Assemble physical prototypes, edge modules, and cloud software interfaces.' },
  { step: '04', title: 'PRESENT', desc: 'Demonstrate prototype capabilities during Round 1 evaluation.' },
  { step: '05', title: 'INTEGRATE', desc: 'Execute live real-time system modifications under competition conditions.' },
  { step: '06', title: 'INNOVATE', desc: 'Pioneer the future of connected IoT systems and claim the core.' }
];

export const RULES_DATA: RuleCategory[] = [
  {
    id: 'general',
    title: '01. ELIGIBILITY & PARTICIPATION',
    rules: [
      '[ADD OFFICIAL ELIGIBILITY DETAILS]',
      'Teams must consist of eligible student or independent developer participants.',
      'All team members must be registered before the registration deadline on 5 October 2026.',
      'Cross-institutional collaboration is subject to official guidelines.'
    ]
  },
  {
    id: 'prototype',
    title: '02. PROTOTYPE & HARDWARE RULES',
    rules: [
      'Prototypes demonstrated in Round 1 (9 October 2026) must incorporate functional IoT hardware, sensors, or microcontroller units.',
      'Real-time modifications during Round 2 (10 October 2026) must be performed on-site using authorized development gear.',
      'Safety compliance: High-voltage systems must include standard circuit protection.'
    ]
  },
  {
    id: 'judging',
    title: '03. EVALUATION & CONDUCT',
    rules: [
      '[ADD OFFICIAL EVALUATION CRITERIA]',
      '[ADD OFFICIAL PRIZES]',
      'Judges decision regarding prototype scores and live integration challenges will be final.',
      'Academic integrity and original code work are strictly enforced.'
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is IOTHRONE?',
    answer: 'IOTHRONE is a premier, high-intensity IoT innovation competition where engineers, developers, and visionaries design, build, and demonstrate intelligent connected systems.'
  },
  {
    id: 'faq-2',
    question: 'Who can participate?',
    answer: '[ADD OFFICIAL ELIGIBILITY DETAILS] Participation is open to students, developers, and technology enthusiasts who register prior to 5 October 2026.'
  },
  {
    id: 'faq-3',
    question: 'What technologies can be used?',
    answer: 'You may utilize any modern IoT microcontrollers (ESP32, Raspberry Pi, STM32, Arduino), edge sensors, cloud infrastructure, AI models, and communication protocols (MQTT, HTTP, LoRaWAN, WebSockets).'
  },
  {
    id: 'faq-4',
    question: 'What is required for Round 1?',
    answer: 'For Round 1 (9 October 2026, 9:00 AM – 4:00 PM), teams must present their working IoT prototype and demonstrate its functionality to the evaluation panel.'
  },
  {
    id: 'faq-5',
    question: 'What happens during Round 2?',
    answer: 'In Round 2 (10 October 2026, 9:00 AM – 4:00 PM), qualified teams undertake a live, real-time modification and integration challenge to adapt their system to new competition parameters.'
  },
  {
    id: 'faq-6',
    question: 'What should participants bring?',
    answer: '[ADD OFFICIAL PARTICIPANT PACK LIST] Participants should bring their hardware prototypes, development laptops, microcontrollers, sensors, debug cables, and power supplies.'
  },
  {
    id: 'faq-7',
    question: 'How will the prototype be demonstrated?',
    answer: 'Prototypes will be demonstrated live in physical presentation booths equipped with power and networking. System telemetry and hardware actions must be demonstrated in real time.'
  }
];
