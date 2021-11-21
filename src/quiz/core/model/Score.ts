import { ScoreDetails } from "./ScoreDetails";

export class Score{    
    constructor(
      readonly maxPoints: number,
      readonly userPoints: number,
      readonly totalTimeInSeconds: number,
      readonly details: ScoreDetails[]
    ) {}  
  }
  