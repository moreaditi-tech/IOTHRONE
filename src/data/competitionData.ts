export interface TimelineStage {
  id: string;
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  date: string;
  time?: string;
  venue?: string;
  participants?: string;
  description?: string;
  evaluatesTitle?: string;
  evaluatesPoints?: string[];
  notes?: string[];
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
  rules: {
    num: string;
    title: string;
    description: string;
  }[];
}

export const COMPETITION_TIMELINE: TimelineStage[] = [
  {
    id: 'round1',
    number: '01',
    badge: 'STAGE 01',
    title: 'ROUND 1',
    subtitle: 'ONLINE — PPT EVALUATION',
    date: 'Online',
    evaluatesTitle: 'Round 1 evaluates:',
    evaluatesPoints: [
      'Problem Statement',
      'Proposed Solution',
      'Innovation',
      'Technology Stack',
      'System Architecture',
      'Implementation Plan',
      'Feasibility & Impact'
    ],
    notes: ['The PPT must be submitted along with event registration.'],
    status: 'current'
  },
  {
    id: 'round2',
    number: '02',
    badge: 'STAGE 02',
    title: 'ROUND 2',
    subtitle: 'OFFLINE — PROTOTYPE DEMONSTRATION',
    date: '9 October 2026',
    time: '9:00 AM – 4:00 PM',
    venue: '6206 LAB & 6218 LAB',
    notes: [
      'Each team will receive an individual presentation slot.',
      'Top 15 teams advance to Round 3.'
    ],
    status: 'upcoming'
  },
  {
    id: 'round3',
    number: '03',
    badge: 'STAGE 03',
    title: 'ROUND 3',
    subtitle: 'OFFLINE — REAL-TIME IMPLEMENTATION',
    date: '10 October 2026',
    time: '10:00 AM – 2:00 PM',
    venue: '6206 LAB & 6218 LAB',
    participants: 'Top 15 teams from Round 2',
    evaluatesTitle: 'Round 3 focuses on:',
    evaluatesPoints: [
      'Real-time integration',
      'Functionality',
      'Adaptability',
      'Technical implementation',
      'Innovation',
      'Demonstration'
    ],
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
    id: 'concept',
    step: '01',
    title: 'CONCEPT',
    subtitle: 'Conceptualize the Solution',
    description: 'Formulate your IoT architectural blueprint, define sensor inputs, and outline system communication protocols for Round 1 PPT evaluation.',
    icon: 'Lightbulb'
  },
  {
    id: 'prototype',
    step: '02',
    title: 'PROTOTYPE',
    subtitle: 'Hardware & Code Assembly',
    description: 'Construct the physical prototype, program edge sensors, and demonstrate working hardware capabilities during Round 2 evaluation.',
    icon: 'Wrench'
  },
  {
    id: 'integrate',
    step: '03',
    title: 'REAL-TIME INTEGRATION',
    subtitle: 'Live System Implementation',
    description: 'Unify edge devices, real-time control streams, and execute live system modifications during Round 3 implementation.',
    icon: 'Share2'
  }
];

export const PROCESS_NODES = [
  { step: '01', title: 'REGISTER', desc: 'Form your team, register, and submit your PPT for Round 1 evaluation.' },
  { step: '02', title: 'DESIGN', desc: 'Architect hardware schematics and intelligent connectivity workflows.' },
  { step: '03', title: 'BUILD', desc: 'Assemble physical prototypes, edge modules, and cloud software interfaces.' },
  { step: '04', title: 'DEMO', desc: 'Demonstrate prototype capabilities during Round 2 offline evaluation.' },
  { step: '05', title: 'INTEGRATE', desc: 'Execute live real-time system implementation in Round 3 for top 15 teams.' },
  { step: '06', title: 'INNOVATE', desc: 'Pioneer the future of connected IoT systems and claim the core.' }
];

export const RULES_DATA: RuleCategory[] = [
  {
    id: 'general',
    title: '01. ELIGIBILITY & REGISTRATION',
    rules: [
      {
        num: '01',
        title: 'TEAM SIZE',
        description: 'Teams must consist of 2–4 members.'
      },
      {
        num: '02',
        title: 'REGISTRATION',
        description: 'Teams must complete registration within the given registration timeline.'
      },
      {
        num: '03',
        title: 'ROUND 1 PPT SUBMISSION',
        description: 'The PPT must be submitted along with the registration for Round 1 evaluation.'
      }
    ]
  },
  {
    id: 'prototype',
    title: '02. HARDWARE & ORIGINALITY',
    rules: [
      {
        num: '04',
        title: 'ORIGINALITY',
        description: 'All projects must be original work. Plagiarism or copied projects may lead to disqualification.'
      },
      {
        num: '05',
        title: 'HARDWARE & COMPONENTS',
        description: 'Participants are responsible for bringing the required hardware, components, and equipment for their project.'
      },
      {
        num: '08',
        title: 'PROTOTYPE SAFETY',
        description: 'The prototype must be safe to operate and demonstrate.'
      }
    ]
  },
  {
    id: 'conduct',
    title: '03. CONDUCT & EVALUATION',
    rules: [
      {
        num: '06',
        title: 'REPORTING & TIMING',
        description: 'Teams must report according to their assigned slot and timing.'
      },
      {
        num: '07',
        title: 'ORGANIZER INSTRUCTIONS',
        description: 'Participants must follow the instructions provided by the organizing team and judging panel.'
      },
      {
        num: '09',
        title: 'JUDGING DECISION',
        description: 'The decision of the judging panel will be final.'
      },
      {
        num: '10',
        title: 'SCHEDULE / VENUE CHANGES',
        description: 'Any changes in schedule, venue, or round requirements will be communicated by the organizing team.'
      }
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
    question: 'Who can participate & what is the registration fee?',
    answer: 'Participation is open to students and developers. Registration Fee: PCCOE Students — FREE | Non-PCCOE Students — ₹99 / Team. Teams must consist of 2–4 members.'
  },
  {
    id: 'faq-3',
    question: 'What technologies can be used?',
    answer: 'You may utilize any modern IoT microcontrollers (ESP32, Raspberry Pi, STM32, Arduino), edge sensors, cloud infrastructure, AI models, and communication protocols (MQTT, HTTP, LoRaWAN, WebSockets).'
  },
  {
    id: 'faq-4',
    question: 'What is required for Round 1?',
    answer: 'Round 1 is an Online PPT Evaluation evaluating Problem Statement, Proposed Solution, Innovation, Technology Stack, System Architecture, Implementation Plan, Feasibility & Impact. PPT must be submitted along with registration.'
  },
  {
    id: 'faq-5',
    question: 'What happens during Round 2 and Round 3?',
    answer: 'Round 2 (9 October 2026, 9:00 AM – 4:00 PM at 6206 LAB & 6218 LAB) is an Offline Prototype Demonstration. The top 15 teams from Round 2 advance to Round 3 (10 October 2026, 10:00 AM – 2:00 PM at 6206 LAB & 6218 LAB) for Real-Time Implementation.'
  },
  {
    id: 'faq-6',
    question: 'What should participants bring?',
    answer: 'Participants should bring their hardware prototypes, development laptops, microcontrollers, sensors, debug cables, and power supplies.'
  },
  {
    id: 'faq-7',
    question: 'How will the prototype be demonstrated?',
    answer: 'Prototypes will be demonstrated live in physical presentation booths equipped with power and networking. System telemetry and hardware actions must be demonstrated in real time.'
  }
];
