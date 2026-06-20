export interface Waypoint {
  x: number;
  y: number;
}

export class RouteEntity {
  constructor(public waypoints: Waypoint[], public isVisible = false) {}

  render(ctx: CanvasRenderingContext2D): void {
    if (!this.isVisible || this.waypoints.length < 2) return;

    ctx.strokeStyle = '#00FF66';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(this.waypoints[0].x, this.waypoints[0].y);
    for (let i = 1; i < this.waypoints.length; i++) {
      ctx.lineTo(this.waypoints[i].x, this.waypoints[i].y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
