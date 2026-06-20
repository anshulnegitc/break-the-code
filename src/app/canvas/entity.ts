export interface Entity {
  update(time: number): void;
  render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number): void;
}
