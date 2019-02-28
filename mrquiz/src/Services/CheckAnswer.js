import React, { Component } from 'react';
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
    if(correctAnswer == this.dataToCheck.answerId) {
      console.log("answer correct")
      return true
    }
    console.log("answer wrong")
    return false;
  }

}
