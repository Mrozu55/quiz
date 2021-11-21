import { ScoreRepository } from "../ports/ScoreRepository";
import { SummaryController } from "../ports/SummaryController";
import { NotFoundError } from "./NotFoundError";
import { Score } from "./Score";

export class Summary implements SummaryController {
    constructor(
        private scoreRepository: ScoreRepository
    ) {}

    getFinalScore(): Score{
        let score = this.scoreRepository.getLastScore();
        if (score === null)
            throw new NotFoundError("Score not found.");
        else
            return score;
    }
}