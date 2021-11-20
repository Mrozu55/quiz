import { Utils } from "../../../utils/TimeUtils";
import { Answer } from "./Answer";
import { Question } from "./Question";

export class Score{    
    constructor(
      public points: number,
      public questions: Question[],
      public userAnswers: Answer[],
      public totalTimeInSeconds: number 
    ) {}  

    getTimeAsString = () => {
        return Utils.getTimeAsString(this.totalTimeInSeconds);
    }
  }
  