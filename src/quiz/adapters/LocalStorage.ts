import { Score } from "../core/model/Score";
import { ScoreRepository } from "../core/ports/ScoreRepository";

export class LocalStorage implements ScoreRepository{
    private static SCORE: string = "score";
    private storage = window.localStorage;

    saveScore(score: Score): void {
        this.storage.setItem(LocalStorage.SCORE, JSON.stringify(score));
    }

    getLastScore(): Score | null {
        let obj =  this.storage.getItem(LocalStorage.SCORE);
        if (obj === null) return null;
        let score = <Score> JSON.parse(obj);
        return score
    }
}