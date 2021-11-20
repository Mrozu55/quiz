import { JsonReader } from "../adapters/JsonReader";
import { LocalStorage } from "../adapters/LocalStorage";
import { TimeCounter } from "../adapters/TimeCounter";
import { Quiz } from "../core/model/Quiz";
import { Summary } from "../core/model/Summary";
import { QuestionRepository } from "../core/ports/QuestionRepository";
import { QuizController } from "../core/ports/QuizController";
import { ScoreRepository } from "../core/ports/ScoreRepository";
import { SummaryController } from "../core/ports/SummaryController";
import { Timer } from "../core/ports/Timer";

export class QuizConfiguration{
    static createQuizController(): QuizController{
        return new Quiz(
            this.#getDefaultTimer(),
            this.#getDefaultTimer(),
            this.#getQuestionRepository(),
            this.#getScoreRepository()
            );
    }

    static createSummaryController(): SummaryController{
        return new Summary(this.#getScoreRepository());
    }

    static #getDefaultTimer(): Timer{
        return new TimeCounter();
    }

    static #getQuestionRepository(): QuestionRepository{
        return new JsonReader();
    }

    static #getScoreRepository(): ScoreRepository{
        return new LocalStorage();
    }
}
