import { Question } from "../model/Question";

export interface QuizController {
    init(): void;
    getTotalQuestions(): number;
    setTimeNode(node: HTMLElement): void;
    isQuizReady(): boolean;
    finishQuiz(): void;

    getQuestion(index: number): Question;
    previousQuestion(): Question;
    nextQuestion(): Question;

    addAnswer(answer: number): void;
    getCurrentAnswer(): number;
  }