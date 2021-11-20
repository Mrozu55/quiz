import { Question } from "../model/Question";

export interface QuestionRepository{
    getAllQuestions(): Question[];
}