import {Renderer} from './renderer';
import {OceanRenderer} from './ocean-renderer';
import {GridRenderer} from './grid-renderer';
import {RadarRenderer} from './radar-renderer';
import {DefenseLineRenderer} from './defense-line-renderer';
import {Entity} from './entity';
import {FriendlyShipEntity} from './friendly-ship-entity';
import {EnemyShipEntity} from './enemy-ship-entity';
import {FlagshipEntity} from './flagship-entity';
import {EnemyFlagshipEntity} from './enemy-flagship-entity';
import {RouteManager} from './route-manager';
import {RouteEntity} from './route-entity';
import {EnemyMovementManager} from './enemy-movement-manager';
import {LEVEL_CONFIGS} from './level-config';
import {SoundService} from '../core/sound.service';

export class GameEngine {
  private ctx: CanvasRenderingContext2D;
  private renderers: Renderer[] = [];
  private entities: Entity[] = [];
  public routeManager = new RouteManager();
  private movementManager?: EnemyMovementManager;
  private animationFrameId = 0;
  private onGameOver: (message: string) => void;

  constructor(private canvas: HTMLCanvasElement, onGameOver: (message: string) => void, private sound: SoundService) {
    this.ctx = canvas.getContext('2d')!;
    this.onGameOver = onGameOver;
    this.renderers.push(new OceanRenderer());
    this.renderers.push(new GridRenderer());
    this.renderers.push(new RadarRenderer());
    this.renderers.push(new DefenseLineRenderer());
    
    this.resize();
    this.setLevel(0);
  }

  private targetECenterX: number = 0;
  private currentECenterX: number = 0;

  setLevel(levelIndex: number) {
    const config = LEVEL_CONFIGS[levelIndex] || LEVEL_CONFIGS[0];
    this.movementManager = new EnemyMovementManager(config);
    const centerX = this.canvas.width * 0.25; 
    const centerY = this.canvas.height * 0.5;

    const startX = this.canvas.width * 0.8;
    const endX = this.canvas.width * 0.55;
    this.targetECenterX = startX - (levelIndex) * ((startX - endX) / 4);
    
    if (this.currentECenterX === 0) {
        this.currentECenterX = this.targetECenterX;
    }
    
    this.entities = [
        new FlagshipEntity(centerX, centerY),
        new FriendlyShipEntity(centerX - 60, centerY - 120),
        new FriendlyShipEntity(centerX, centerY - 60),
        new FriendlyShipEntity(centerX - 120, centerY - 60),
        new FriendlyShipEntity(centerX, centerY + 60),
        new FriendlyShipEntity(centerX - 120, centerY + 60),
        new FriendlyShipEntity(centerX - 60, centerY + 120),
        new FriendlyShipEntity(centerX - 120, centerY),
        new EnemyFlagshipEntity(this.currentECenterX, centerY),
        new EnemyShipEntity(this.currentECenterX + 60, centerY - 120, 1, []),
        new EnemyShipEntity(this.currentECenterX, centerY - 60, 1, []),
        new EnemyShipEntity(this.currentECenterX + 120, centerY - 60, 1, []),
        new EnemyShipEntity(this.currentECenterX, centerY + 60, 1, []),
        new EnemyShipEntity(this.currentECenterX + 120, centerY + 60, 1, []),
        new EnemyShipEntity(this.currentECenterX + 60, centerY + 120, 1, []),
        new EnemyShipEntity(this.currentECenterX + 120, centerY, 1, [])
    ];
    this.routeManager = new RouteManager();
  }

  private updateEnemyPositions(delta: number) {
      for (const entity of this.entities) {
          if (entity instanceof EnemyShipEntity || entity instanceof EnemyFlagshipEntity) {
              entity.positionX += delta;
          }
      }
  }

  private generateWaypoints(startX: number, startY: number, endX: number, endY: number, count: number): {x: number, y: number}[] {
      const waypoints = [];
      for (let i = 0; i < count; i++) {
          const t = i / (count - 1);
          waypoints.push({
              x: startX + (endX - startX) * t,
              y: startY + (endY - startY) * t
          });
      }
      return waypoints;
  }

  resize() {
    this.canvas.width = this.canvas.parentElement!.clientWidth;
    this.canvas.height = this.canvas.parentElement!.clientHeight;
  }

  start() {
    this.loop();
  }

  stop() {
    cancelAnimationFrame(this.animationFrameId);
  }

  private loop() {
    const time = performance.now();
    this.update(time);
    this.render(time);
    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }

  public isGameOver = false;
  public gameOverMessage = '';

  private triggerLose(message: string) {
    if (this.isGameOver) return;
    this.isGameOver = true;
    this.gameOverMessage = message;
    this.stop();
    this.onGameOver(message);
  }

  private update(time: number) {
    if (this.isGameOver) return;

    // Fleet movement animation
    if (Math.abs(this.currentECenterX - this.targetECenterX) > 0.5) {
        const delta = (this.targetECenterX - this.currentECenterX) * 0.02;
        this.currentECenterX += delta;
        this.updateEnemyPositions(delta);
        if (Math.random() < 0.05) this.sound.playSonarTone();
    }

    for (const entity of this.entities) {
      entity.update(time);
      if (entity instanceof EnemyShipEntity && entity.positionX < this.canvas.width / 2) {
        this.triggerLose('Enemy breached defense line.');
      }
    }
  }

  private render(time: number) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const renderer of this.renderers) {
      renderer.render(this.ctx, this.canvas.width, this.canvas.height, time);
    }
    this.routeManager.render(this.ctx);
    for (const entity of this.entities) {
      entity.render(this.ctx, this.canvas.width, this.canvas.height, time);
    }
  }
}
