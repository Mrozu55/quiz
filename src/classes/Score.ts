import { Answer } from "./Answer";
import { Question } from "./Question";
import { getTime } from "./Utils";

export class Score{    
    constructor(
      public points: number,
      public questions: Question[],
      public userAnswers: Answer[],
      public totalTimeInSeconds: number 
    ) {}  

    getTimeAsString = () => {
        return getTime(this.totalTimeInSeconds);
    }
  }
  