import {RouteEntity} from './route-entity';

export class RouteManager {
  private routes: RouteEntity[] = [];

  addRoute(route: RouteEntity): void {
    this.routes.push(route);
  }

  showRoute(index: number): void {
    if (this.routes[index]) {
      this.routes[index].isVisible = true;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    for (const route of this.routes) {
      route.render(ctx);
    }
  }
}
