import { Question } from './Question'
import { Answer } from './Answer';
import { Score } from './Score';
import { Timer } from '../ports/Timer';
import { ScoreDetails } from './ScoreDetails';
import { QuizController } from '../ports/QuizController';
import { QuestionRepository } from '../ports/QuestionRepository';
import { ScoreRepository } from '../ports/ScoreRepository';
import { ArrayUtils } from '../../../utils/ArrayUtils';


export class Quiz implements QuizController{
    private questions: Question[] = new Array();
    private answers: Answer[] = new Array();
    private currentQuestionIndex: number = 0;
    private totalQuestions: number = 0;

    constructor(
       private timer: Timer,
       private answerTimer: Timer,
       private questionRepository: QuestionRepository,
       private scoreRepository: ScoreRepository,
       private correctAnswerValue: number
    ) {}

    init = () => {
        this.#loadQuestions()
        this.timer.start();
        this.answerTimer.start();
    }

    setTimeNode(node: HTMLElement): void {
        this.timer.setHtmlElement(node);
    }

    getCurrentIndex(): number {
        return this.currentQuestionIndex + 1;
    }

    getTotalQuestions(): number {
        return this.totalQuestions;
    }

    getQuestion = (index: number): string => {
        return this.questions[index].question;
    }

    nextQuestion = (): string => {
        if(this.currentQuestionIndex + 1 < this.totalQuestions) {
            this.#calculateAnswerTime();
            this.currentQuestionIndex++;
            this.#startCountingAnswerTime();
        }
            
        return this.getQuestion(this.currentQuestionIndex);
    }

    previousQuestion = (): string => {
        if(this.currentQuestionIndex - 1 >= 0){
            this.#calculateAnswerTime();
            this.currentQuestionIndex--;
            this.#startCountingAnswerTime();
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
        this.#calculateAnswerTime();
        let points = this.#calculatePoints();
        let details = this.#getScoreDetails();
        let score = new Score(points, this.timer.getTimeInSeconds(), details);
        this.scoreRepository.saveScore(score);
    }

    #getScoreDetails = (): ScoreDetails[] => {
        let details: ScoreDetails[] = new Array();
        for(let i = 0; i<this.totalQuestions; i++){
            let question = this.questions[i];
            let answer = this.answers[i]
            let isCorrect = question.checkAnswer(answer.answer);
            details.push(
                new ScoreDetails(
                    question, 
                    answer, 
                    isCorrect? this.correctAnswerValue : 0,
                    isCorrect));
        }
        return details;
    }

    #loadQuestions = () =>{
        let allQuestions = this.questionRepository.getAllQuestions();
        this.questions = ArrayUtils.shuffle(allQuestions);
        this.questions.forEach(e => this.answers.push(new Answer(e.id)))
        this.totalQuestions = this.questions.length;
    }

    #startCountingAnswerTime = () => {
        this.answerTimer.start();
    }

    #calculateAnswerTime = () => {
        this.answerTimer.stop();
        this.answers[this.currentQuestionIndex].timeInSeconds += this.answerTimer.getTimeInSeconds();
        this.answerTimer.reset();
    }

    #calculatePoints = () => {
        var points = 0;
        for( let i=0; i<this.totalQuestions; i++){
            if (this.questions[i].checkAnswer(this.answers[i].answer)) points += this.correctAnswerValue;
        }
        return points;
    }
}
