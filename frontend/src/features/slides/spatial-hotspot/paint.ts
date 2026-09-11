const GX = 48, GY = 27;
export function paintHeat(ctx: CanvasRenderingContext2D, pts: Float32Array, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';
  const cells = new Float32Array(GX * GY);
  for (let i = 0; i < pts.length; i += 2) {
    const gx = Math.min(GX - 1, (pts[i] * GX) | 0);
    const gy = Math.min(GY - 1, (pts[i + 1] * GY) | 0);
    cells[gy * GX + gx]++;
  }
  let max = 1;
  for (const c of cells) if (c > max) max = c;
  const r = Math.max(w, h) * 0.07;
  for (let gy = 0; gy < GY; gy++) {
    for (let gx = 0; gx < GX; gx++) {
      const t = cells[gy * GX + gx] / max;
      if (t === 0) continue;
      const cx = ((gx + 0.5) / GX) * w;
      const cy = ((gy + 0.5) / GY) * h;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const red = Math.round(255);
      const green = Math.round(176 - (176 - 77) * t);
      const blue = Math.round(32 + (109 - 32) * t);
      g.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${0.22 + 0.55 * t})`);
      g.addColorStop(1, 'rgba(255, 90, 60, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    }
  }
}
