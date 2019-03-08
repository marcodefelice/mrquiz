import {QuestionListData} from './QuestionListData';
import {SaveData} from './SaveData';

export class CheckAnswer {
  constructor(qid,answerId) {
    const questiondata = new QuestionListData()
     this.dataToCheck = {
      qid: qid,
      answerId: answerId
    }
  }

  verify(correctAnswer) {
    const SAVE = new SaveData()

    let aid = this.dataToCheck.answerId
    if(correctAnswer == aid) {
      SAVE.putdata(aid,1)
      return true
    }
    SAVE.putdata(aid,0)
    return false;
  }

}
