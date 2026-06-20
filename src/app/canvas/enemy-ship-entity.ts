import {Ship} from './ship';

export class EnemyShipEntity extends Ship {
  private waypoints: {x: number, y: number}[] = [];
  private currentWaypointIndex = 0;
  private speed = 0.5; // Adjust as needed

  constructor(x: number, y: number, private threatLevel = 1, waypoints: {x: number, y: number}[]) {
    super(x, y);
    this.waypoints = waypoints;
  }

  override update(time: number): void {
    super.update(time);
    if (this.currentWaypointIndex < this.waypoints.length - 1) {
        const next = this.waypoints[this.currentWaypointIndex + 1];
        const dx = next.x - this.x;
        const dy = next.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.speed) {
            this.x = next.x;
            this.y = next.y;
            this.currentWaypointIndex++;
        } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
    }
  }

  render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number): void {
    const bob = Math.sin(time / 2500 * 2 * Math.PI + this.bobPhase) * 3;
    const roll = Math.sin(time / 3500 * 2 * Math.PI + this.rollPhase) * (0.8 * Math.PI / 180);
    this.drawShipSilhouette(ctx, this.x, this.y, time, this.getScale(width, 0.4), '#E04F5F', true, roll, bob);
  }
}
