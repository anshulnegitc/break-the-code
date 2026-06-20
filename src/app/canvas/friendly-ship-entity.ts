import {Ship} from './ship';

export class FriendlyShipEntity extends Ship {
  render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number): void {
    const bob = Math.sin(time / 3000 * 2 * Math.PI + this.bobPhase) * 2;
    const roll = Math.sin(time / 4000 * 2 * Math.PI + this.rollPhase) * (0.5 * Math.PI / 180);
    this.drawShipSilhouette(ctx, this.x, this.y, time, this.getScale(width, 0.4), '#38BDF8', false, roll, bob);
  }
}
