import { Answer } from "./Answer";
import { Question } from "./Question";

export class ScoreDetails{
    constructor(
        readonly question: Question,
        readonly answer: Answer,
        readonly points: number,
        readonly isCorrect: boolean
    ){}
}