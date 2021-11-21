
export class Question{
  constructor(
    readonly id: number,
    readonly question: string,
    private answer: number,
  ) {}

  checkAnswer(userAnswer: number): boolean{
    return userAnswer === this.answer;
  }
}
