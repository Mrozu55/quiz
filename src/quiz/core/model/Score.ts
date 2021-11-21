import { ScoreDetails } from "./ScoreDetails";

export class Score{    
    constructor(
      readonly points: number,
      readonly totalTimeInSeconds: number,
      readonly details: ScoreDetails[]
    ) {}  
  }
  