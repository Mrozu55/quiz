import { Score } from "../model/Score";

export interface ScoreRepository{
    saveScore(score: Score): void;
    getLastScore(): Score | null;
}