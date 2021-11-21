
export interface QuizController {
    init(): void;
    getTotalQuestions(): number;
    getCurrentIndex(): number;
    setTimeNode(node: HTMLElement): void;
    isQuizReady(): boolean;
    finishQuiz(): void;

    getQuestion(index: number): string;
    previousQuestion(): string;
    nextQuestion(): string;

    addAnswer(answer: number): void;
    getCurrentAnswer(): number;
  }