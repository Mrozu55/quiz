import { Score } from "../model/Score";

export interface SummaryController {
    getFinalScore(): Score; 
}