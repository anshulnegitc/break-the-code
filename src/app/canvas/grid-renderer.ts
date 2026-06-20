import {Renderer} from './renderer';

export class GridRenderer implements Renderer {
  render(ctx: CanvasRenderingContext2D, width: number, height: number, _time: number): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    ctx.lineWidth = 0.5;
    const size = 80; 
    
    // Grid
    for (let x = 0; x < width; x += size) {
      if (Math.round(x / size) % 4 === 0) {
        ctx.strokeStyle = 'rgba(27, 38, 53, 0.08)';
        ctx.lineWidth = 1;
      } else {
        ctx.strokeStyle = 'rgba(27, 38, 53, 0.05)';
        ctx.lineWidth = 0.5;
      }
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += size) {
      if (Math.round(y / size) % 4 === 0) {
        ctx.strokeStyle = 'rgba(27, 38, 53, 0.08)';
        ctx.lineWidth = 1;
      } else {
        ctx.strokeStyle = 'rgba(27, 38, 53, 0.05)';
        ctx.lineWidth = 0.5;
      }
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Sector Markers
    ctx.fillStyle = '#666';
    ctx.font = '10px monospace';
    for (let x = 0; x < width; x += size * 2) {
      ctx.fillText(`X${Math.floor(x/size)}`, x + 5, 15);
    }
    for (let y = 0; y < height; y += size * 2) {
      ctx.fillText(`Y${Math.floor(y/size)}`, 5, y + 15);
    }
  }
}
