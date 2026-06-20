import {Renderer} from './renderer';

export class DefenseLineRenderer implements Renderer {
  render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number): void {
    const defenseX = width * 0.5;
    
    // Line pulse
    const t = (time % 5000) / 5000;
    const lineAlpha = 0.775 + 0.075 * Math.sin(t * 2 * Math.PI);
    
    // Line
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 184, 77, 0.2)';
    ctx.strokeStyle = `rgba(255, 184, 77, ${lineAlpha})`;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(defenseX, 0);
    ctx.lineTo(defenseX, height);
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    ctx.fillStyle = 'rgba(255, 184, 77, 0.65)';
    ctx.font = '600 12px sans-serif';
    ctx.textAlign = 'center';
    if ('letterSpacing' in ctx) {
      (ctx as any).letterSpacing = '1px';
    }
    ctx.fillText('DEFENSE LINE', defenseX, 20);
    
    // Territories
    ctx.fillStyle = 'rgba(125, 140, 163, 0.1)';
    ctx.font = '700 24px sans-serif';
    ctx.textAlign = 'center';
    if ('letterSpacing' in ctx) {
        (ctx as any).letterSpacing = '2px';
    }
    ctx.fillText('FRIENDLY TERRITORY', width * 0.25, height * 0.15);
    ctx.fillText('ENEMY TERRITORY', width * 0.75, height * 0.15);
  }
}
