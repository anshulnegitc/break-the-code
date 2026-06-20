import {EnemyShipEntity} from './enemy-ship-entity';
import {LevelConfig} from './level-config';

export class EnemyMovementManager {
    private lastMoveTime = performance.now();
    private isPaused = false;

    constructor(private config: LevelConfig) {}

    update(time: number, ships: EnemyShipEntity[]) {
        if (this.isPaused) return;
    }

    pause(duration: number) {
        this.isPaused = true;
        setTimeout(() => {
            this.isPaused = false;
        }, duration);
    }
}
