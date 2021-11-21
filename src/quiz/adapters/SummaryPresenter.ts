import { TimeUtils } from "../../utils/TimeUtils";
import { QuizConfiguration } from "../config/QuizConfiguration";
import { NotFoundError } from "../core/model/NotFoundError";
import { Score } from "../core/model/Score";
import { ScoreDetails } from "../core/model/ScoreDetails";

export module SummaryPresenter{

    /* HTML DOM objects */
    const backToStartButton: HTMLButtonElement = document.querySelector("#back-to-start")! as HTMLButtonElement;
    const totalPointsNode: HTMLSpanElement = document.querySelector("#total-points")! as HTMLSpanElement;
    const totalTimeNode: HTMLSpanElement = document.querySelector("#total-time")! as HTMLSpanElement;
    const detailsTable: HTMLTableElement = document.querySelector("#tbody-details")! as HTMLTableElement;
    
     /* Listeners */
     backToStartButton.addEventListener("click", onBackClicked);

     /* Summary */
     let summary = QuizConfiguration.createSummaryController();
     var score: Score;
     try {
        score = summary.getFinalScore();
        showTotalPoints(score.points, score.details.length);
        showTotalTime(TimeUtils.getTimeAsString(score.totalTimeInSeconds));
        showScoreDetails(score.details);
     } catch (error) {
         showNotFoundError((error as NotFoundError).message);
     }
     
    function showNotFoundError(msg: string) {
        console.log("Sorry, we couldn't find your score:");
        console.log(msg);
    }


    function showTotalPoints(points: number, total: number) {
        totalPointsNode.textContent = `${points} / ${total}`;
    }

    function showTotalTime(time: string) {
        totalTimeNode.textContent = time;
    }

    function showScoreDetails(details: ScoreDetails[]){
        details.forEach((e, index)=>{
            createTableRow(
                index + 1,
                e.question.question,
                e.answer.answer,
                e.answer.timeInSeconds,
                e.points
            );
        });
    }

    function onBackClicked() {
        
    }

    function createTableRow(index: number, question: string, answer: number, time: number, points: number): void{
        let row = detailsTable.insertRow();
        row.insertCell().textContent = `${index}`;
        row.insertCell().textContent = `${question}`;
        row.insertCell().textContent = `${answer}`;
        row.insertCell().textContent = `${time}s`;
        row.insertCell().textContent = `${points}`;
    }
}


