import {Entity} from './entity';

export abstract class Ship implements Entity {
  protected bobPhase: number = Math.random() * 2 * Math.PI;
  protected rollPhase: number = Math.random() * 2 * Math.PI;

  constructor(protected x: number, protected y: number) {}

  get positionX(): number {
    return this.x;
  }

  set positionX(val: number) {
    this.x = val;
  }

  update(_time: number): void {
    // No longer updating position directly to prevent drifting.
  }

  abstract render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number): void;

  protected getScale(width: number, baseScale: number): number {
    return width < 768 ? baseScale * 0.6 : baseScale;
  }

  protected drawShipSilhouette(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    _time: number,
    scale: number,
    color: string,
    mirror: boolean = false,
    rotation: number = 0,
    yOffset: number = 0
  ): void {
    ctx.save();
    ctx.translate(x, y + yOffset);
    ctx.rotate(rotation);
    ctx.scale(scale * (mirror ? -1 : 1), scale);

    const W = 138;
    const hullHeight = W * 0.25;
    const cabinWidth = W * 0.28 * 1.1;
    const cabinHeight = W * 0.18 * 0.85;
    const rearDeckWidth = W * 0.20;
    const rearDeckHeight = W * 0.09;
    const chimneyWidth = W * 0.03;
    const chimneyHeight = W * 0.07;
    const gunLength = W * 0.08;
    const gunHeight = W * 0.015;
    const bowExtension = W * 0.10;

    ctx.fillStyle = color;
    ctx.beginPath();

    // Hull (1.0 * W wide, 0.25 * W tall)
    // Starting at stern -57.5 approx, rounded
    const sterndRadius = hullHeight * 0.12;
    ctx.moveTo(-W / 2 + sterndRadius, 0); 
    // Rounded stern
    ctx.quadraticCurveTo(-W / 2, 0, -W / 2, sterndRadius);
    ctx.lineTo(-W / 2, hullHeight);
    ctx.lineTo(W / 2 - bowExtension, hullHeight); // Keel
    // Bow (Sharp, 60-65 degree angle)
    ctx.lineTo(W / 2 + bowExtension, -hullHeight * 0.15); // Tip above
    ctx.lineTo(W / 2 - bowExtension, 0); // To deck
    ctx.closePath();
    ctx.fill();

    // Cabin (Rounded top corners, square bottom)
    const cabinX = -W / 2 + 0.42 * W - cabinWidth / 2;
    const cabinY = -cabinHeight;
    const radius = W * 0.03;
    ctx.beginPath();
    ctx.moveTo(cabinX + radius, cabinY);
    ctx.lineTo(cabinX + cabinWidth - radius, cabinY);
    ctx.quadraticCurveTo(cabinX + cabinWidth, cabinY, cabinX + cabinWidth, cabinY + radius);
    ctx.lineTo(cabinX + cabinWidth, cabinY + cabinHeight);
    ctx.lineTo(cabinX, cabinY + cabinHeight);
    ctx.lineTo(cabinX, cabinY + radius);
    ctx.quadraticCurveTo(cabinX, cabinY, cabinX + radius, cabinY);
    ctx.closePath();
    ctx.fill();

    // Rear upper deck extension
    ctx.beginPath();
    ctx.rect(cabinX + cabinWidth, cabinY + cabinHeight - W * 0.09, W * 0.20, W * 0.09);
    ctx.fill();

    // Chimney (Centered on cabin roof)
    ctx.beginPath();
    ctx.rect(cabinX + cabinWidth / 2 - chimneyWidth / 2, cabinY - chimneyHeight, chimneyWidth, chimneyHeight);
    ctx.fill();

    // Gun Barrel (Forward deck)
    ctx.beginPath();
    ctx.rect(W / 2 - bowExtension - gunLength - 5, -gunHeight, gunLength, gunHeight);
    ctx.fill();

    // Windows (2 vertical, centered)
    const winW = W * 0.04;
    const winH = W * 0.05;
    const winGap = W * 0.03;
    ctx.beginPath();
    ctx.rect(cabinX + cabinWidth / 2 - winW - winGap / 2, cabinY + (cabinHeight - winH) / 2, winW, winH);
    ctx.rect(cabinX + cabinWidth / 2 + winGap / 2, cabinY + (cabinHeight - winH) / 2, winW, winH);
    ctx.fill();

    ctx.restore();
  }
}
