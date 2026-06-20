import {Ship} from './ship';

export class EnemyFlagshipEntity extends Ship {
  render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number): void {
    const bob = Math.sin(time / 2500 * 2 * Math.PI + this.bobPhase) * 3;
    const roll = Math.sin(time / 3500 * 2 * Math.PI + this.rollPhase) * (0.8 * Math.PI / 180);
    this.drawShipSilhouette(ctx, this.x, this.y, time, this.getScale(width, 0.6), '#E04F5F', true, roll, bob);
  }
}
