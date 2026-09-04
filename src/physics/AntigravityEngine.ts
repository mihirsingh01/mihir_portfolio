import { SectionId, PaperPhysicsState } from '../types';

export interface CardAnchor {
  id: SectionId;
  baseX: number; // relative px offset from center
  baseY: number;
  baseZ: number;
  baseRotX: number;
  baseRotY: number;
  baseRotZ: number;
  prominence: number;
}

// Default layout anchors on desktop
export const DEFAULT_ANCHORS: Record<SectionId, CardAnchor> = {
  dispatch: {
    id: 'dispatch',
    baseX: -260,
    baseY: -70,
    baseZ: 25,
    baseRotX: 3,
    baseRotY: 5,
    baseRotZ: -1.8,
    prominence: 1.04,
  },
  biography: {
    id: 'biography',
    baseX: 260,
    baseY: -70,
    baseZ: 35,
    baseRotX: -2,
    baseRotY: -5,
    baseRotZ: 2.0,
    prominence: 1.08, // Prominent with Mihir's portrait
  },
  gazette: {
    id: 'gazette',
    baseX: -250,
    baseY: 90,
    baseZ: 30,
    baseRotX: 4,
    baseRotY: -4,
    baseRotZ: 1.5,
    prominence: 1.06,
  },
  classifieds: {
    id: 'classifieds',
    baseX: 250,
    baseY: 90,
    baseZ: 20,
    baseRotX: -3,
    baseRotY: 6,
    baseRotZ: -2.2,
    prominence: 1.04,
  },
};

export class AntigravityEngine {
  private papers: Map<SectionId, PaperPhysicsState> = new Map();
  private anchors: Map<SectionId, CardAnchor> = new Map();
  private mousePos: { x: number; y: number } = { x: 0, y: 0 };
  private mouseVelocity: { x: number; y: number } = { x: 0, y: 0 };
  private lastMousePos: { x: number; y: number } = { x: 0, y: 0 };
  private time: number = 0;
  private isPaused: boolean = false;

  constructor() {
    this.reset();
  }

  public reset() {
    const ids: SectionId[] = ['dispatch', 'biography', 'gazette', 'classifieds'];
    ids.forEach((id) => {
      const anchor = DEFAULT_ANCHORS[id];
      this.anchors.set(id, anchor);
      this.papers.set(id, {
        id,
        x: anchor.baseX,
        y: anchor.baseY,
        z: anchor.baseZ,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        rotationX: anchor.baseRotX,
        rotationY: anchor.baseRotY,
        rotationZ: anchor.baseRotZ,
        targetZ: anchor.baseZ,
        scale: anchor.prominence,
        isHovered: false,
        isDragging: false,
      });
    });
  }

  public setPaused(paused: boolean) {
    this.isPaused = paused;
  }

  public updateMouse(x: number, y: number) {
    this.mouseVelocity.x = (x - this.lastMousePos.x) * 0.3;
    this.mouseVelocity.y = (y - this.lastMousePos.y) * 0.3;
    this.lastMousePos = { x, y };
    this.mousePos = { x, y };
  }

  public setCardHover(id: SectionId, hovered: boolean) {
    const paper = this.papers.get(id);
    if (!paper) return;
    paper.isHovered = hovered;
    if (hovered) {
      paper.targetZ = 120; // Bring forward on Z-axis
    } else {
      const anchor = this.anchors.get(id);
      paper.targetZ = anchor ? anchor.baseZ : 0;
    }
  }

  public setCardDragging(id: SectionId, dragging: boolean) {
    const paper = this.papers.get(id);
    if (!paper) return;
    paper.isDragging = dragging;
    if (dragging) {
      paper.targetZ = 160;
    } else {
      const anchor = this.anchors.get(id);
      paper.targetZ = paper.isHovered ? 120 : (anchor ? anchor.baseZ : 0);
    }
  }

  public dragMoveCard(id: SectionId, dx: number, dy: number) {
    const paper = this.papers.get(id);
    if (!paper) return;
    paper.x += dx;
    paper.y += dy;
    paper.vx = dx * 0.75;
    paper.vy = dy * 0.75;
    
    // Dynamic tilt on drag
    paper.rotationY = Math.max(-16, Math.min(16, paper.rotationY + dx * 0.08));
    paper.rotationX = Math.max(-16, Math.min(16, paper.rotationX - dy * 0.08));
  }

  public tossCard(id: SectionId, vx: number, vy: number) {
    const paper = this.papers.get(id);
    if (!paper) return;
    paper.vx = Math.max(-25, Math.min(25, vx * 1.1));
    paper.vy = Math.max(-25, Math.min(25, vy * 1.1));
    paper.isDragging = false;
  }

  public step(delta: number): Map<SectionId, PaperPhysicsState> {
    if (this.isPaused) return this.papers;
    this.time += delta * 0.001;

    const paperList = Array.from(this.papers.values());

    // 1. Inter-paper proximity repulsion to prevent clipping/overlapping
    for (let i = 0; i < paperList.length; i++) {
      for (let j = i + 1; j < paperList.length; j++) {
        const p1 = paperList[i];
        const p2 = paperList[j];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distSq = dx * dx + dy * dy;
        const minDist = 290; // Minimum clearance radius in px

        if (distSq < minDist * minDist && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (minDist - dist) / minDist * 0.85;
          const nx = dx / dist;
          const ny = dy / dist;

          if (!p1.isDragging) {
            p1.vx -= nx * force * 1.2;
            p1.vy -= ny * force * 1.2;
          }
          if (!p2.isDragging) {
            p2.vx += nx * force * 1.2;
            p2.vy += ny * force * 1.2;
          }
        }
      }
    }

    // 2. Individual physics update
    paperList.forEach((paper, idx) => {
      const anchor = this.anchors.get(paper.id) || DEFAULT_ANCHORS[paper.id];
      const phase = idx * 1.57; // 90 degree offset per card

      if (!paper.isDragging) {
        // Natural harmonic zero-gravity drift
        const driftX = Math.sin(this.time * 0.65 + phase) * 0.35;
        const driftY = Math.cos(this.time * 0.5 + phase) * 0.4;
        const driftRotZ = Math.sin(this.time * 0.4 + phase) * 0.02;

        paper.vx += driftX;
        paper.vy += driftY;

        // Mouse Parallax / Aerodynamic Push
        const mdx = paper.x - this.mousePos.x;
        const mdy = paper.y - this.mousePos.y;
        const mouseDistSq = mdx * mdx + mdy * mdy;
        const mouseFieldRadius = 320;

        if (mouseDistSq < mouseFieldRadius * mouseFieldRadius && mouseDistSq > 1) {
          const mdist = Math.sqrt(mouseDistSq);
          const pushForce = ((mouseFieldRadius - mdist) / mouseFieldRadius) * 0.45;
          paper.vx += (mdx / mdist) * pushForce;
          paper.vy += (mdy / mdist) * pushForce;
        }

        // Soft orbital spring returning toward home anchor
        const springX = (anchor.baseX - paper.x) * 0.015;
        const springY = (anchor.baseY - paper.y) * 0.015;
        paper.vx += springX;
        paper.vy += springY;

        // Apply velocity with air friction damping
        paper.x += paper.vx;
        paper.y += paper.vy;
        paper.vx *= 0.94; // Air resistance
        paper.vy *= 0.94;

        // Rotation harmonization
        const targetRotX = anchor.baseRotX + Math.sin(this.time * 0.5 + phase) * 2;
        const targetRotY = anchor.baseRotY + Math.cos(this.time * 0.4 + phase) * 2.5;
        const targetRotZ = anchor.baseRotZ + driftRotZ * 7;

        paper.rotationX += (targetRotX - paper.rotationX) * 0.05;
        paper.rotationY += (targetRotY - paper.rotationY) * 0.05;
        paper.rotationZ += (targetRotZ - paper.rotationZ) * 0.05;
      }

      // Smooth Z-depth transitions
      paper.z += (paper.targetZ - paper.z) * 0.12;

      // Smooth scaling on hover
      const targetScale = paper.isHovered 
        ? anchor.prominence * 1.08 
        : (paper.isDragging ? anchor.prominence * 1.04 : anchor.prominence);
      paper.scale += (targetScale - paper.scale) * 0.12;
    });

    return this.papers;
  }

  public getPaperState(id: SectionId): PaperPhysicsState | undefined {
    return this.papers.get(id);
  }
}
