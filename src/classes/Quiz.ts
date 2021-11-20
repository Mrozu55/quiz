import { Question } from './Question'
import * as jsonFile from '../files/questions.json'
import { Answer } from './Answer';
import { TimeCounter } from './TimeCounter';
import { Score } from './Score';


export class Quiz {
    private questions: Question[] = new Array();
    private answers: Answer[] = new Array();
    private timer: TimeCounter = new TimeCounter();
    private answerTimer: TimeCounter = new TimeCounter();
    public points: number = 0;
    public currentQuestionIndex: number = 0;
    public totalQuestions: number = 0;

    init = (timerNode?: HTMLSelectElement) => {
        this.loadQuestions()
        if (timerNode) this.timer.setDOMElement(timerNode);
        this.timer.start();
        this.answerTimer.start();
    }

    loadQuestions = () =>{
        Object.keys(jsonFile).forEach( (e) => {
            if (isNaN(parseInt(e))) return;
            let q = jsonFile[parseInt(e)];
            this.questions.push(new Question(q.id, q.question, q.answer));
        })

        // Initialize empty answers for each question
        this.questions.forEach( e => this.answers.push(new Answer(e.id)))
        this.totalQuestions = this.questions.length;
    }

    addAnswer = (userAnswer: number) =>{
        this.answers[this.currentQuestionIndex].answer = userAnswer;
    }

    getQuestion = () => {
        
        return this.questions[this.currentQuestionIndex];
    }

    getUserAnswer = () => {
        return this.answers[this.currentQuestionIndex].answer;
    }

    nextQuestion = () => {
        if(this.currentQuestionIndex + 1 < this.totalQuestions) {
            this.calculateAnswerTime();
            this.currentQuestionIndex++;
            this.startCountingAnswerTime();
        }
            
        return this.getQuestion();
    }

    previousQuestion = () => {
        if(this.currentQuestionIndex - 1 >= 0){
            this.calculateAnswerTime();
            this.currentQuestionIndex--;
            this.startCountingAnswerTime();
        }
        return this.getQuestion();
    }

    isQuizReady() {
        for (let a of this.answers) {
            if (isNaN(a.answer)) return false;
        }
        return true;
    }

    startCountingAnswerTime = () => {
        this.answerTimer.start();
    }

    calculateAnswerTime = () => {
        this.answerTimer.stop();
        this.answers[this.currentQuestionIndex].timeInSeconds += this.answerTimer.timeInSeconds;
        this.answerTimer.reset();
    }

    getFinalScore = () => {
        this.timer.stop();
        this.calculateAnswerTime();
        let points = this.calculatePoints();
        return new Score(points, this.questions, this.answers, this.timer.timeInSeconds);
    }

    calculatePoints = () => {
        var points = 0;
        for( let i=0; i<this.totalQuestions; i++){
            if (this.questions[i].checkAnswer(this.answers[i].answer)) points++;
        }
        return points;
    }

}


