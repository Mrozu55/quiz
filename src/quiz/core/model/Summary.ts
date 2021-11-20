import { ScoreRepository } from "../ports/ScoreRepository";
import { SummaryController } from "../ports/SummaryController";
import { Score } from "./Score";

export class Summary implements SummaryController {
    constructor(
        private scoreRepository: ScoreRepository
    ) {}

    getFinalScore(): Score{
        let score = this.scoreRepository.getLastScore();
        if (score === null)
            throw new Error("Score not found.");
        else
            return score;
    }
}