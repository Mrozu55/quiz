import { Question } from "../core/model/Question";
import { QuestionRepository } from "../core/ports/QuestionRepository";
import * as jsonFile from '../../files/questions.json'

export class JsonReader implements QuestionRepository{

    getAllQuestions(): Question[] {
        var questions: Question[] = new Array();

         Object.keys(jsonFile).forEach( (e) => {
            if (isNaN(parseInt(e))) return;
            let q = jsonFile[parseInt(e)];
            questions.push(new Question(q.id, q.question, q.answer));
        })

        return questions;
    }
}