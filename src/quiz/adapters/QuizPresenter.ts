import { QuizConfiguration } from "../config/QuizConfiguration";
import { Question } from "../core/model/Question";
import { QuizController } from "../core/ports/QuizController";

export module QuizPresenter{

    /* HTML DOM objects */
    const questionNumberNode: HTMLSelectElement = document.querySelector("#question-id")! as HTMLSelectElement;
    const questionNode: HTMLSelectElement = document.querySelector("#question")! as HTMLSelectElement;
    const answerNode: HTMLInputElement = document.querySelector("#answer")! as HTMLInputElement;
    const previousQuestionButton: HTMLButtonElement = document.querySelector("#previous-question")! as HTMLButtonElement;
    const nextQuestionButton: HTMLButtonElement = document.querySelector("#next-question")! as HTMLButtonElement;
    const finishQuizButton: HTMLButtonElement = document.querySelector("#finish-quiz")! as HTMLButtonElement;
    const timerNode: HTMLSelectElement = document.querySelector("#timer")! as HTMLSelectElement;

    /* Listeners */
    answerNode.addEventListener("input", onAnswerTyped);
    previousQuestionButton.addEventListener("click", onPrevious);
    nextQuestionButton.addEventListener("click", onNext);
    finishQuizButton.addEventListener("click", onFinish);

    /* variables */
    let disbaledClassName: string = "disabled";
    let activeClassName: string = "accent"; 

    /* Quiz */
    let quiz: QuizController = QuizConfiguration.createQuizController();
    quiz.setTimeNode(timerNode)
    quiz.init();
    displayQuestion(quiz.getQuestion(0));


    // Functions
    function displayQuestion(question: Question){
        showQuestionNumber(question.id, quiz.getTotalQuestions());
        showQuestion(question.question)
        showUserAnswer(quiz.getCurrentAnswer())
    }
    
    function showQuestionNumber(id: number, total: number){
        questionNumberNode.textContent = `Pytanie ${id} z ${total}`;
    }
    
    function showQuestion(question: string){
        questionNode.textContent = `${question} = ?`;
    }
    
    function showUserAnswer(answer: number) {
        isNaN(answer)? answerNode.value = '' : answerNode.value = answer.toString();  
    }
    
    function onPrevious(){
        let question = quiz.previousQuestion();
        displayQuestion(question);
    }
    
    function onNext(){
        let question = quiz.nextQuestion();
        displayQuestion(question);
    }
    
    function onFinish() {
        quiz.finishQuiz();
        window.open("summary.html", "_self");
    }
    
    function onAnswerTyped(){
        quiz.addAnswer(answerNode.valueAsNumber);
        quiz.isQuizReady()? setActive(finishQuizButton) : setDisabled(finishQuizButton);
    }
    
    function setDisabled(button: HTMLButtonElement) {
        button.classList.add(disbaledClassName);
        button.classList.remove(activeClassName);
    }
    
    function setActive(button: HTMLButtonElement) {
        button.classList.add(activeClassName);
        button.classList.remove(disbaledClassName);
    }
}
