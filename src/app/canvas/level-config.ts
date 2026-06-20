export interface LevelConfig {
    level: number;
    timer: number;
    moveInterval: number;
    totalWaypoints: number;
}

export const LEVEL_CONFIGS: LevelConfig[] = [
    { level: 1, timer: 60, moveInterval: 10000, totalWaypoints: 6 },
    { level: 2, timer: 55, moveInterval: 8000, totalWaypoints: 7 },
    { level: 3, timer: 50, moveInterval: 6000, totalWaypoints: 8 },
    { level: 4, timer: 45, moveInterval: 5000, totalWaypoints: 9 },
    { level: 5, timer: 40, moveInterval: 4000, totalWaypoints: 10 }
];
