import { SectionId, PaperPhysicsState } from '../types';

export interface CardAnchorConfig {
  id: SectionId;
  pctX: number; // percentage of viewport width (-0.5 to +0.5)
  pctY: number; // percentage of viewport height (-0.5 to +0.5)
  baseZ: number;
  baseRotX: number;
  baseRotY: number;
  baseRotZ: number;
  prominence: number;
}

// 4 Quadrants Screen Distribution Spec
export const ANCHOR_CONFIGS: Record<SectionId, CardAnchorConfig> = {
  frontpage: {
    id: 'frontpage',
    pctX: -0.26, // Upper-left quadrant (-26%)
    pctY: -0.08, // (-8%)
    baseZ: 25,
    baseRotX: 2.5,
    baseRotY: 4,
    baseRotZ: -1.5,
    prominence: 1.0,
  },
  profiles: {
    id: 'profiles',
    pctX: 0.22,  // Upper-right quadrant (22%)
    pctY: -0.12, // (-12%)
    baseZ: 35,
    baseRotX: -2.0,
    baseRotY: -4,
    baseRotZ: 1.8,
    prominence: 1.03, // Prominent with Mihir's portrait
  },
  business: {
    id: 'business',
    pctX: -0.18, // Lower-left quadrant (-18%)
    pctY: 0.24,  // (24%)
    baseZ: 28,
    baseRotX: 3.0,
    baseRotY: -3.5,
    baseRotZ: 1.2,
    prominence: 1.0,
  },
  directory: {
    id: 'directory',
    pctX: 0.24,  // Lower-right quadrant (24%)
    pctY: 0.22,  // (22%)
    baseZ: 20,
    baseRotX: -2.5,
    baseRotY: 4.5,
    baseRotZ: -2.0,
    prominence: 1.0,
  },
};

export class AntigravityEngine {
  private papers: Map<SectionId, PaperPhysicsState> = new Map();
  private basePositions: Map<SectionId, { x: number; y: number }> = new Map();
  private mousePos: { x: number; y: number } = { x: 0, y: 0 };
  private time: number = 0;
  private isPaused: boolean = false;
  private viewportWidth: number = 1440;
  private viewportHeight: number = 800;

  constructor() {
    this.recomputeAnchors(1440, 800);
  }

  public setViewportSize(width: number, height: number) {
    this.viewportWidth = Math.max(640, width);
    this.viewportHeight = Math.max(500, height);
    this.recomputeAnchors(this.viewportWidth, this.viewportHeight);
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
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
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
    this.recomputeAnchors(this.viewportWidth, this.viewportHeight);
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
      paper.targetZ = 120; // Elevate on Z-axis
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
      paper.targetZ = 160;
    } else {
      const cfg = ANCHOR_CONFIGS[id];
      paper.targetZ = paper.isHovered ? 120 : (cfg ? cfg.baseZ : 0);
    }
  }

  public dragMoveCard(id: SectionId, dx: number, dy: number) {
    const paper = this.papers.get(id);
    if (!paper) return;
    paper.x += dx;
    paper.y += dy;
    paper.vx = dx * 0.75;
    paper.vy = dy * 0.75;

    paper.rotationY = Math.max(-14, Math.min(14, paper.rotationY + dx * 0.06));
    paper.rotationX = Math.max(-14, Math.min(14, paper.rotationX - dy * 0.06));
  }

  public tossCard(id: SectionId, vx: number, vy: number) {
    const paper = this.papers.get(id);
    if (!paper) return;
    paper.vx = Math.max(-24, Math.min(24, vx * 1.1));
    paper.vy = Math.max(-24, Math.min(24, vy * 1.1));
    paper.isDragging = false;
  }

  public step(delta: number): Map<SectionId, PaperPhysicsState> {
    if (this.isPaused) return this.papers;
    this.time += delta * 0.001;

    const paperList = Array.from(this.papers.values());

    // 1. Inter-paper proximity repulsion to prevent visual clipping
    const minDist = 340; // Increased clearance radius for upscaled 360px cards
    for (let i = 0; i < paperList.length; i++) {
      for (let j = i + 1; j < paperList.length; j++) {
        const p1 = paperList[i];
        const p2 = paperList[j];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < minDist * minDist && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = ((minDist - dist) / minDist) * 0.9;
          const nx = dx / dist;
          const ny = dy / dist;

          if (!p1.isDragging) {
            p1.vx -= nx * force * 1.3;
            p1.vy -= ny * force * 1.3;
          }
          if (!p2.isDragging) {
            p2.vx += nx * force * 1.3;
            p2.vy += ny * force * 1.3;
          }
        }
      }
    }

    // 2. Individual physics step
    paperList.forEach((paper, idx) => {
      const cfg = ANCHOR_CONFIGS[paper.id];
      const basePos = this.basePositions.get(paper.id) || { x: 0, y: 0 };
      const phase = idx * 1.57;

      if (!paper.isDragging) {
        // Subtle harmonic floating motion
        const driftX = Math.sin(this.time * 0.55 + phase) * 0.28;
        const driftY = Math.cos(this.time * 0.45 + phase) * 0.32;
        const driftRotZ = Math.sin(this.time * 0.35 + phase) * 0.015;

        paper.vx += driftX;
        paper.vy += driftY;

        // Aerodynamic cursor disturbance
        const mdx = paper.x - this.mousePos.x;
        const mdy = paper.y - this.mousePos.y;
        const mouseDistSq = mdx * mdx + mdy * mdy;
        const mouseFieldRadius = 340;

        if (mouseDistSq < mouseFieldRadius * mouseFieldRadius && mouseDistSq > 1) {
          const mdist = Math.sqrt(mouseDistSq);
          const pushForce = ((mouseFieldRadius - mdist) / mouseFieldRadius) * 0.4;
          paper.vx += (mdx / mdist) * pushForce;
          paper.vy += (mdy / mdist) * pushForce;
        }

        // Soft orbital spring returning toward home quadrant anchor
        const springX = (basePos.x - paper.x) * 0.012;
        const springY = (basePos.y - paper.y) * 0.012;
        paper.vx += springX;
        paper.vy += springY;

        // Apply velocity with air friction damping
        paper.x += paper.vx;
        paper.y += paper.vy;
        paper.vx *= 0.94;
        paper.vy *= 0.94;

        // Smooth orientation harmonization
        const targetRotX = cfg.baseRotX + Math.sin(this.time * 0.45 + phase) * 1.8;
        const targetRotY = cfg.baseRotY + Math.cos(this.time * 0.38 + phase) * 2.0;
        const targetRotZ = cfg.baseRotZ + driftRotZ * 6;

        paper.rotationX += (targetRotX - paper.rotationX) * 0.05;
        paper.rotationY += (targetRotY - paper.rotationY) * 0.05;
        paper.rotationZ += (targetRotZ - paper.rotationZ) * 0.05;
      }

      // Smooth Z-depth transition
      paper.z += (paper.targetZ - paper.z) * 0.12;

      // Smooth scaling on hover
      const targetScale = paper.isHovered
        ? cfg.prominence * 1.06
        : (paper.isDragging ? cfg.prominence * 1.03 : cfg.prominence);
      paper.scale += (targetScale - paper.scale) * 0.12;
    });

    return this.papers;
  }

  public getPaperState(id: SectionId): PaperPhysicsState | undefined {
    return this.papers.get(id);
  }
}
