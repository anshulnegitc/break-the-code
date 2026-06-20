import {Renderer} from './renderer';

export class RadarRenderer implements Renderer {
  render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number): void {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.125;
    
    ctx.strokeStyle = 'rgba(57, 217, 138, 0.08)';
    ctx.lineWidth = 1;
    
    // Circles
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Sweep
    ctx.strokeStyle = 'rgba(57, 217, 138, 0.12)';
    const angle = (time / 2000) % (Math.PI * 2);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
    ctx.stroke();
  }
}
