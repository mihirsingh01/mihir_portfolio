export type SectionId = 'frontpage' | 'profiles' | 'business' | 'directory';

export interface ProjectItem {
  id: string;
  title: string;
  date: string;
  leadHeadline: string;
  deckSummary: string;
  detailedDescription: string;
  techStack: string[];
  kicker: string;
  category: string;
  architectureHighlights: string[];
  liveUrl: string;
  githubUrl: string;
  stat: string;
  statLabel: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; isHighlight?: boolean }[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  kicker: string;
}

export interface NewspaperSectionMeta {
  id: SectionId;
  sectionNumber: string;
  kicker: string;
  title: string;
  subtitle: string;
  leadHeadline: string;
  frontDeck: string;
  earPieceLeft: string;
  earPieceRight: string;
  dateline: string;
  hasPhoto?: boolean;
}

export interface PaperPhysicsState {
  id: SectionId;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  targetZ: number;
  scale: number;
  isHovered: boolean;
  isDragging: boolean;
}
