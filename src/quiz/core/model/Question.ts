import { Validator } from '../../../interfaces/Validator'


export class Question implements Validator{
  constructor(
    readonly id: number,
    readonly question: string,
    private answer: number,
  ) {}

  checkAnswer = (userAnswer: number) => {
    return userAnswer === this.answer;
  }

}
