export interface Renderer {
  render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number): void;
}
