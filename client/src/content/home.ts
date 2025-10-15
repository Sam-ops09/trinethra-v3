import { type IconType } from 'react-icons';
import {
  FaShieldAlt,
  FaRocket,
  FaLock,
  FaGlobe,
  FaProjectDiagram,
  FaSatellite,
  FaTools,
  FaUsersCog,
  FaDesktop,
  FaCheckCircle
} from 'react-icons/fa';

export interface StatItem { value: string; label: string; }
export interface CapabilityItem { icon: IconType; title: string; description: string; }
export interface ProcessStep { title: string; description: string; icon: IconType; }
export interface SolutionItem { title: string; description: string; icon: IconType; capabilities: string[]; link: string; }
export interface AssuranceHighlight { title: string; description: string; icon: IconType; }

export const homeSeo = {
  title: 'TRINETHRA DEFENTECH | Advanced Defense Technology Solutions',
  description:
    'Leading provider of military-grade cable harness systems, rugged storage solutions, edge server compute platforms, and panel PCs for defense and security operations. Engineered for mission-critical environments.',
  keywords:
    'TRINETHRA DEFENTECH, defense technology, cable harness, storage solutions, edge server, panel pc, defense-grade hardware',
  ogType: 'website' as const
};

export const homeStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'TRINETHRA DEFENTECH - Advanced Defense Technology Solutions',
  description:
    'Leading provider of military-grade defense technology including cable harness systems, rugged storage solutions, edge server platforms, and panel PCs for defense and security operations.',
  keywords:
    'TRINETHRA DEFENTECH, defense technology, cable harness, storage solutions, edge server, panel pc, military systems, tactical equipment',
  inLanguage: 'en-US',
  mainEntity: {
    '@type': 'Organization',
    name: 'TRINETHRA DEFENTECH',
    url: 'https://trinethra-defentech.com',
    logo: 'https://trinethra-defentech.com/logo.png',
    description: 'Premier provider of advanced defense technology solutions engineered for mission-critical environments.',
    sameAs: [
      'https://linkedin.com/company/trinethra-defentech',
      'https://twitter.com/trinethra_def'
    ]
  }
};

export const heroStats: StatItem[] = [
  { value: '18+', label: 'Mission Programs' },
  { value: '250+', label: 'Systems Deployed' },
  { value: '9.2/10', label: 'Client Rating' },
  { value: '24/7', label: 'Technical Support' }
];

export const capabilities: CapabilityItem[] = [
  { icon: FaShieldAlt, title: 'Battle-Tested Reliability', description: 'Engineered to exceed MIL-STD specifications' },
  { icon: FaRocket, title: 'Rapid Deployment', description: 'Quick integration with existing defense infrastructure' },
  { icon: FaLock, title: 'Secure by Design', description: 'FIPS 140-2 compliant encryption and security protocols' },
  { icon: FaGlobe, title: 'Global Standards', description: 'NATO-compatible systems and interfaces' }
];

export const processSteps: ProcessStep[] = [
  { title: 'Mission Discovery', description: 'Collaborate to capture operational requirements & environmental constraints.', icon: FaProjectDiagram },
  { title: 'Engineering & Prototyping', description: 'Iterate rugged architectures & validate against MIL-STD baselines.', icon: FaTools },
  { title: 'Qualification & Compliance', description: 'Execute environmental, EMI/EMC & security testing with full documentation.', icon: FaSatellite },
  { title: 'Lifecycle Support', description: 'Provide sustainment, obsolescence management & field engineering.', icon: FaUsersCog }
];

export const integratedSolutions: SolutionItem[] = [
  {
    title: 'ISR & Recon Platforms',
    description: 'GPU-accelerated edge servers with multi-sensor fusion delivering real-time intelligence.',
    icon: FaSatellite,
    capabilities: ['Modular EO/IR integration', 'Real-time AI analytics', 'Encrypted data links'],
    link: '/solutions#isr'
  },
  {
    title: 'Command Mission Suites',
    description: 'Ruggedized panel PCs with secure communications powering mobile & fixed command centers.',
    icon: FaDesktop,
    capabilities: ['Cross-domain security', 'Battlefield visualization', 'Zero-day hardening'],
    link: '/solutions#command'
  },
  {
    title: 'Field Sustainment Kits',
    description: 'Deployable maintenance & diagnostics kits enabling rapid readiness in austere environments.',
    icon: FaTools,
    capabilities: ['In-field diagnostics', 'Rugged storage', 'Secure firmware updates'],
    link: '/solutions#sustainment'
  }
];

export const assuranceHighlights: AssuranceHighlight[] = [
  { title: 'Design-to-Deployment', description: 'Program support from requirements analysis through fielding & sustainment.', icon: FaProjectDiagram },
  { title: 'Security-First Engineering', description: 'Hardware root of trust, crypto modules & secured supply chain.', icon: FaLock },
  { title: 'Environmental Survivability', description: 'Operates under vibration, temperature, humidity & EMI extremes.', icon: FaShieldAlt }
];

export const certificationStandards: string[] = [
  'MIL-STD-810H',
  'MIL-STD-461G',
  'IEC 61508',
  'FIPS 140-2',
  'AS9100D',
  'ITAR/EAR'
];

export const partners = [
  'ADE-DRDO',
  'CABS-DRDO',
  'GTRE-DRDO',
  'MTRDC-DRDO',
  'HAL',
  'ISRO'
];

export const iconBullet = FaCheckCircle;