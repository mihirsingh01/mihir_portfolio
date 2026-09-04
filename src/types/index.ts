export type SectionId = 'dispatch' | 'biography' | 'gazette' | 'classifieds';

export interface ProjectItem {
  id: string;
  title: string;
  date: string;
  leadHeadline: string;
  deckSummary: string;
  detailedDescription: string;
  techStack: string[];
  stampTag: string;
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
  skills: { name: string; variant?: 'red' | 'blue' | 'default' }[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  badge: string;
}

export interface NewspaperSectionMeta {
  id: SectionId;
  editionRoman: string;
  title: string;
  editionName: string;
  issueNo: string;
  leadHeadline: string;
  frontDeck: string;
  stampText: string;
  stampColor: 'red' | 'blue';
  earPieceLeft: string;
  earPieceRight: string;
  accentColor: string;
  dateStr: string;
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
