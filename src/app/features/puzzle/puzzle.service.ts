import {Injectable, signal} from '@angular/core';
import {Puzzle} from './puzzle.model';

export interface Mission {
  name: string;
  timer: number;
  puzzle: Puzzle;
}

@Injectable({providedIn: 'root'})
export class PuzzleService {
  private readonly missions: Mission[] = [
    { name: 'Enemy Scouts Detected', timer: 30, puzzle: { question: ['A', '_', 'C'], options: ['B', 'D', 'E', 'F'], answer: 'B' } },
    { name: 'Convoy Route Intercepted', timer: 30, puzzle: { question: ['B', 'E', '_', 'K'], options: ['H', 'G', 'I', 'J'], answer: 'H' } },
    { name: 'Reinforcement Fleet Located', timer: 60, puzzle: { question: [1, 3, 5, 7, '_', 11], options: [9, 10, 8, 12], answer: 9 } },
    { name: 'Flagship Signal Captured', timer: 45, puzzle: { question: [1, 1, 2, 3, 5, '_', 13], options: [8, 7, 9, 6], answer: 8 } },
    { name: 'Final Naval Offensive', timer: 30, puzzle: { question: [1, 8, 27, 64, '_', 216], options: [125, 100, 150, 200], answer: 125 } }
  ];

  readonly totalMissions = this.missions.length;
  currentPuzzleIndex = signal(0);
  isSolved = signal(false);

  getCurrentPuzzle() {
    return this.missions[this.currentPuzzleIndex()].puzzle;
  }

  getCurrentMission() {
    return this.missions[this.currentPuzzleIndex()];
  }

  getMissionName(missionIndex: number): string {
    return this.missions[missionIndex].name;
  }

  checkAnswer(answer: string | number): boolean {
    if (answer === this.getCurrentPuzzle().answer) {
      this.isSolved.set(true);
      return true;
    }
    return false;
  }

  nextMission() {
    if (this.currentPuzzleIndex() < this.totalMissions - 1) {
      this.currentPuzzleIndex.update(i => i + 1);
      this.isSolved.set(false);
    }
  }

  nextPuzzle() {
    // Not applicable if only 1 puzzle per mission
    this.isSolved.set(false);
  }

  isLastPuzzleInMission(): boolean {
    return true; 
  }
}
