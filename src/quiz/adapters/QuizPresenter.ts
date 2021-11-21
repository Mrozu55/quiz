import { QuizConfiguration } from "../config/QuizConfiguration";
import { QuizController } from "../core/ports/QuizController";

export module QuizPresenter{

    /* HTML DOM objects */
    const questionNumberNode: HTMLSelectElement = document.querySelector("#question-id")! as HTMLSelectElement;
    const questionNode: HTMLSelectElement = document.querySelector("#question")! as HTMLSelectElement;
    const answerNode: HTMLInputElement = document.querySelector("#answer")! as HTMLInputElement;
    const previousQuestionButton: HTMLButtonElement = document.querySelector("#previous-question")! as HTMLButtonElement;
    const nextQuestionButton: HTMLButtonElement = document.querySelector("#next-question")! as HTMLButtonElement;
    const finishQuizButton: HTMLButtonElement = document.querySelector("#finish-quiz")! as HTMLButtonElement;
    const cancelQuizButton: HTMLButtonElement = document.querySelector("#cancel-quiz")! as HTMLButtonElement;
    const timerNode: HTMLSelectElement = document.querySelector("#timer")! as HTMLSelectElement;

    /* Listeners */
    answerNode.addEventListener("input", onAnswerTyped);
    previousQuestionButton.addEventListener("click", onPrevious);
    nextQuestionButton.addEventListener("click", onNext);
    finishQuizButton.addEventListener("click", onFinish);
    cancelQuizButton.addEventListener("click", onCancel);

    /* variables */
    let disbaledClassName: string = "disabled";
    let activeClassName: string = "accent"; 
    let totalQuestions: number = 0;

    /* Quiz */
    let quiz: QuizController = QuizConfiguration.createQuizController();
    quiz.setTimeNode(timerNode)
    quiz.init();
    totalQuestions = quiz.getTotalQuestions();
    displayQuestion(quiz.getCurrentIndex(), quiz.getQuestion(0));


    // Functions
    function displayQuestion(index:number, question: string){
        showQuestionNumber(index, totalQuestions);
        showQuestion(question)
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
        let index = quiz.getCurrentIndex();
        displayQuestion(index, question);
        index === 1? setDisabled(previousQuestionButton) : setActive(previousQuestionButton);
        setActive(nextQuestionButton);
    }
    
    function onNext(){
        let question = quiz.nextQuestion();
        let index = quiz.getCurrentIndex();
        displayQuestion(index, question);
        index === totalQuestions? setDisabled(nextQuestionButton) : setActive(nextQuestionButton);
        setActive(previousQuestionButton);
    }
    
    function onFinish() {
        quiz.finishQuiz();
    }

    function onCancel() {
        console.log("cancel");
        
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


