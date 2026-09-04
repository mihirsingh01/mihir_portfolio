import { SectionId, PaperPhysicsState } from '../types';

export interface CardAnchorConfig {
  id: SectionId;
  pctX: number; // percentage of canvas width from center (-0.5 to +0.5)
  pctY: number; // percentage of canvas height from center (-0.5 to +0.5)
  baseZ: number;
  baseRotX: number;
  baseRotY: number;
  baseRotZ: number;
  prominence: number;
}

// Elevated & Balanced 4-Quadrant Placement Spec
export const ANCHOR_CONFIGS: Record<SectionId, CardAnchorConfig> = {
  frontpage: {
    id: 'frontpage',
    pctX: -0.26, // Upper Left (-26%)
    pctY: -0.30, // Shifted up (-30%)
    baseZ: 20,
    baseRotX: 1.5,
    baseRotY: 2.0,
    baseRotZ: -1.2,
    prominence: 1.0,
  },
  profiles: {
    id: 'profiles',
    pctX: 0.24,  // Upper Right (24%)
    pctY: -0.28, // Elevated into upper-right (-28%)
    baseZ: 25,
    baseRotX: -1.2,
    baseRotY: -2.2,
    baseRotZ: 1.4,
    prominence: 1.02,
  },
  business: {
    id: 'business',
    pctX: -0.20, // Lower Left (-20%)
    pctY: 0.10,  // (10%)
    baseZ: 22,
    baseRotX: 1.8,
    baseRotY: -1.8,
    baseRotZ: 1.0,
    prominence: 1.0,
  },
  directory: {
    id: 'directory',
    pctX: 0.22,  // Lower Right (22%)
    pctY: 0.12,  // (12%)
    baseZ: 18,
    baseRotX: -1.5,
    baseRotY: 2.2,
    baseRotZ: -1.5,
    prominence: 1.0,
  },
};

export class AntigravityEngine {
  private papers: Map<SectionId, PaperPhysicsState> = new Map();
  private basePositions: Map<SectionId, { x: number; y: number }> = new Map();
  private mousePos: { x: number; y: number } = { x: 0, y: 0 };
  private time: number = 0;
  private isPaused: boolean = false;
  private canvasWidth: number = 1440;
  private canvasHeight: number = 720;

  // Exact Card Dimensions (330px x 470px)
  public readonly cardWidth: number = 330;
  public readonly cardHeight: number = 470;

  constructor() {
    this.recomputeAnchors(1440, 720);
  }

  public setViewportSize(width: number, height: number) {
    this.canvasWidth = Math.max(700, width);
    this.canvasHeight = Math.max(480, height);
    this.recomputeAnchors(this.canvasWidth, this.canvasHeight);
  }

  private recomputeAnchors(width: number, height: number) {
    const ids: SectionId[] = ['frontpage', 'profiles', 'business', 'directory'];
    ids.forEach((id) => {
      const cfg = ANCHOR_CONFIGS[id];
      const targetX = width * cfg.pctX;
      const targetY = height * cfg.pctY;
      this.basePositions.set(id, { x: targetX, y: targetY });

      if (!this.papers.has(id)) {
        this.papers.set(id, {
          id,
          x: targetX,
          y: targetY,
          z: cfg.baseZ,
          vx: 0,
          vy: 0,
          rotationX: cfg.baseRotX,
          rotationY: cfg.baseRotY,
          rotationZ: cfg.baseRotZ,
          targetZ: cfg.baseZ,
          scale: cfg.prominence,
          isHovered: false,
          isDragging: false,
        });
      }
    });
  }

  public reset() {
    this.papers.clear();
    this.recomputeAnchors(this.canvasWidth, this.canvasHeight);
  }

  public setPaused(paused: boolean) {
    this.isPaused = paused;
  }

  public updateMouse(x: number, y: number) {
    this.mousePos = { x, y };
  }

  public setCardHover(id: SectionId, hovered: boolean) {
    const paper = this.papers.get(id);
    if (!paper) return;
    paper.isHovered = hovered;
    if (hovered) {
      paper.targetZ = 80;
    } else {
      const cfg = ANCHOR_CONFIGS[id];
      paper.targetZ = cfg ? cfg.baseZ : 0;
    }
  }

  public setCardDragging(id: SectionId, dragging: boolean) {
    const paper = this.papers.get(id);
    if (!paper) return;
    paper.isDragging = dragging;
    if (dragging) {
      paper.targetZ = 120;
    } else {
      const cfg = ANCHOR_CONFIGS[id];
      paper.targetZ = paper.isHovered ? 80 : (cfg ? cfg.baseZ : 0);
    }
  }

  public dragMoveCard(id: SectionId, dx: number, dy: number) {
    const paper = this.papers.get(id);
    if (!paper) return;
    paper.x += dx;
    paper.y += dy;
    paper.vx = dx * 0.7;
    paper.vy = dy * 0.7;

    // Subtle drag tilt
    paper.rotationY = Math.max(-10, Math.min(10, paper.rotationY + dx * 0.04));
    paper.rotationX = Math.max(-10, Math.min(10, paper.rotationX - dy * 0.04));
  }

  public tossCard(id: SectionId, vx: number, vy: number) {
    const paper = this.papers.get(id);
    if (!paper) return;
    paper.vx = Math.max(-18, Math.min(18, vx * 0.9));
    paper.vy = Math.max(-18, Math.min(18, vy * 0.9));
    paper.isDragging = false;
  }

  public step(delta: number): Map<SectionId, PaperPhysicsState> {
    if (this.isPaused) return this.papers;
    this.time += delta * 0.001;

    const paperList = Array.from(this.papers.values());

    // 1. Inter-card smooth linear spring repulsion (minDistance = 340px)
    const minDistance = 340;
    for (let i = 0; i < paperList.length; i++) {
      for (let j = i + 1; j < paperList.length; j++) {
        const p1 = paperList[i];
        const p2 = paperList[j];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < minDistance * minDistance && distSq > 0.01) {
          const currentDist = Math.sqrt(distSq);
          // Smooth linear spring repulsion
          const force = (minDistance - currentDist) * 0.05;
          const nx = dx / currentDist;
          const ny = dy / currentDist;

          if (!p1.isDragging) {
            p1.vx -= nx * force;
            p1.vy -= ny * force;
          }
          if (!p2.isDragging) {
            p2.vx += nx * force;
            p2.vy += ny * force;
          }
        }
      }
    }

    // 2. Soft Viewport Clamping Bounds (accommodating elevated -30% upper and 12% lower anchors)
    const maxX = Math.max(220, this.canvasWidth * 0.40);
    const minX = -maxX;
    const maxY = Math.max(120, this.canvasHeight * 0.28);
    const minY = -Math.max(180, this.canvasHeight * 0.40);

    // 3. Individual physics step
    paperList.forEach((paper, idx) => {
      const cfg = ANCHOR_CONFIGS[paper.id];
      const basePos = this.basePositions.get(paper.id) || { x: 0, y: 0 };
      const phase = idx * 1.57;

      if (!paper.isDragging) {
        // Reduced harmonic drift: 8px-12px vertical bobbing, ±2.5deg pitch
        const driftX = Math.sin(this.time * 0.5 + phase) * 0.16;
        const driftY = Math.cos(this.time * 0.42 + phase) * 0.20;
        const driftRotZ = Math.sin(this.time * 0.35 + phase) * 0.01;

        paper.vx += driftX;
        paper.vy += driftY;

        // Aerodynamic cursor disturbance
        const mdx = paper.x - this.mousePos.x;
        const mdy = paper.y - this.mousePos.y;
        const mouseDistSq = mdx * mdx + mdy * mdy;
        const mouseRadius = 320;

        if (mouseDistSq < mouseRadius * mouseRadius && mouseDistSq > 1) {
          const mdist = Math.sqrt(mouseDistSq);
          const push = ((mouseRadius - mdist) / mouseRadius) * 0.28;
          paper.vx += (mdx / mdist) * push;
          paper.vy += (mdy / mdist) * push;
        }

        // Soft orbital spring returning toward home quadrant anchor
        const springX = (basePos.x - paper.x) * 0.014;
        const springY = (basePos.y - paper.y) * 0.014;
        paper.vx += springX;
        paper.vy += springY;

        // Apply velocity with air friction damping
        paper.x += paper.vx;
        paper.y += paper.vy;
        paper.vx *= 0.93;
        paper.vy *= 0.93;

        // Soft Viewport Boundary Dampening (exponential restore force toward center)
        if (paper.y > maxY) {
          const overlap = paper.y - maxY;
          paper.vy -= overlap * 0.09;
          paper.vy *= 0.85;
        } else if (paper.y < minY) {
          const overlap = minY - paper.y;
          paper.vy += overlap * 0.09;
          paper.vy *= 0.85;
        }

        if (paper.x > maxX) {
          const overlap = paper.x - maxX;
          paper.vx -= overlap * 0.09;
          paper.vx *= 0.85;
        } else if (paper.x < minX) {
          const overlap = minX - paper.x;
          paper.vx += overlap * 0.09;
          paper.vx *= 0.85;
        }

        // Smooth rotation pitch (tightened to ±2.5 deg maximum)
        const targetRotX = Math.max(-2.5, Math.min(2.5, cfg.baseRotX + Math.sin(this.time * 0.4 + phase) * 1.0));
        const targetRotY = Math.max(-2.5, Math.min(2.5, cfg.baseRotY + Math.cos(this.time * 0.35 + phase) * 1.0));
        const targetRotZ = Math.max(-2.0, Math.min(2.0, cfg.baseRotZ + driftRotZ * 4));

        paper.rotationX += (targetRotX - paper.rotationX) * 0.06;
        paper.rotationY += (targetRotY - paper.rotationY) * 0.06;
        paper.rotationZ += (targetRotZ - paper.rotationZ) * 0.06;
      }

      // Smooth Z-depth transition
      paper.z += (paper.targetZ - paper.z) * 0.14;

      // Smooth scale on hover
      const targetScale = paper.isHovered
        ? cfg.prominence * 1.04
        : (paper.isDragging ? cfg.prominence * 1.02 : cfg.prominence);
      paper.scale += (targetScale - paper.scale) * 0.14;
    });

    return this.papers;
  }

  public getPaperState(id: SectionId): PaperPhysicsState | undefined {
    return this.papers.get(id);
  }
}
