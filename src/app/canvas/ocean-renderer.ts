import {Renderer} from './renderer';

export class OceanRenderer implements Renderer {
  render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number): void {
    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#050B12');
    grad.addColorStop(1, '#08111C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Wave bands
    const bands = [
        { baseY: height * 0.15, amp: 2, freq: 0.015 },
        { baseY: height * 0.28, amp: 3, freq: 0.014 },
        { baseY: height * 0.41, amp: 2, freq: 0.016 },
        { baseY: height * 0.54, amp: 3, freq: 0.013 },
        { baseY: height * 0.67, amp: 2, freq: 0.015 },
        { baseY: height * 0.80, amp: 3, freq: 0.014 },
    ];

    ctx.strokeStyle = 'rgba(27, 38, 53, 0.6)';
    ctx.lineWidth = 1;

    for (const band of bands) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 15) {
            const y = band.baseY + Math.sin(x * band.freq + time * 0.00035) * band.amp;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
  }
}
