import { Question } from './Question'

import { Answer } from './Answer';
import { TimeCounter } from '../../adapters/TimeCounter';
import { Score } from './Score';
import { QuizController } from '../ports/QuizController';
import { Timer } from '../ports/Timer';
import { QuestionRepository } from '../ports/QuestionRepository';
import { ScoreRepository } from '../ports/ScoreRepository';


export class Quiz implements QuizController{
    private questions: Question[] = new Array();
    private answers: Answer[] = new Array();
    private currentQuestionIndex: number = 0;
    private totalQuestions: number = 0;

    constructor(
       private timer: Timer,
       private answerTimer: Timer,
       private questionRepository: QuestionRepository,
       private scoreRepository: ScoreRepository
    ) {}

    init = () => {
        this._loadQuestions()
        this.timer.start();
        this.answerTimer.start();
    }

    setTimeNode(node: HTMLElement): void {
        this.timer.setHtmlElement(node);
    }

    getTotalQuestions(): number {
        return this.totalQuestions;
    }

    getQuestion = (index: number) => {
        return this.questions[index];
    }

    nextQuestion = () => {
        if(this.currentQuestionIndex + 1 < this.totalQuestions) {
            this._calculateAnswerTime();
            this.currentQuestionIndex++;
            this._startCountingAnswerTime();
        }
            
        return this.getQuestion(this.currentQuestionIndex);
    }

    previousQuestion = () => {
        if(this.currentQuestionIndex - 1 >= 0){
            this._calculateAnswerTime();
            this.currentQuestionIndex--;
            this._startCountingAnswerTime();
        }
        return this.getQuestion(this.currentQuestionIndex);
    }

    getCurrentAnswer(): number {
        return this.answers[this.currentQuestionIndex].answer;
    }

    addAnswer = (userAnswer: number) =>{
        this.answers[this.currentQuestionIndex].answer = userAnswer;
    }

    isQuizReady() {
        for (let a of this.answers) {
            if (isNaN(a.answer)) return false;
        }
        return true;
    }

    finishQuiz(): void {
        this.timer.stop();
        this._calculateAnswerTime();
        let points = this._calculatePoints();
        let score = new Score(points, this.questions, this.answers, this.timer.getTimeInSeconds());
        this.scoreRepository.saveScore(score);
    }

    _loadQuestions = () =>{
        this.questions = this.questionRepository.getAllQuestions();
        this.questions.forEach(e => this.answers.push(new Answer(e.id)))
        this.totalQuestions = this.questions.length;
    }

    _startCountingAnswerTime = () => {
        this.answerTimer.start();
    }

    _calculateAnswerTime = () => {
        this.answerTimer.stop();
        this.answers[this.currentQuestionIndex].timeInSeconds += this.answerTimer.getTimeInSeconds();
        this.answerTimer.reset();
    }

    _calculatePoints = () => {
        var points = 0;
        for( let i=0; i<this.totalQuestions; i++){
            if (this.questions[i].checkAnswer(this.answers[i].answer)) points++;
        }
        return points;
    }
}
