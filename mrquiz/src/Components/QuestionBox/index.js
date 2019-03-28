import React, { Component } from 'react';
import {QuestionListData} from '../../Services/QuestionListData';
import {CheckAnswer} from '../../Services/CheckAnswer';
import { Redirect } from 'react-router-dom'

import './style.scss';

class QuestionBox extends Component {
      constructor(props) {
        super(props)
        this.state = {
            question: [],
            timing: null,
            id: null,
            answer: [],
            correctAnswer: null,
            next: false
        };
    }

  componentDidMount() {
    this.loadContent(this.props.match.params.qid)
  }

  loadContent(id) {
      const qid = id
      
    const questiondata = new QuestionListData()

      var self = this;
        questiondata.loadJsonData(qid).then(function(data){
              self.setState({
                question: data.items.question,
                timing: data.items.time,
                id: data.items.id,
                answer: data.items.answer,
                correctAnswer: data.items.correctAnswer
              });
          })
  }

  onItemClick(i,a) {
    console.log("checkAnswer",i,a)
    const check = new CheckAnswer(this.state.id,i);
    const res = check.verify(a)
    if(res) {
      //todo: insert into table
      console.log("OK")
    }
    this.setState({next:true})
  }

  compileAnswer(a,self) {
    var showData = []
    if (a != undefined) {
        Object.keys(a).map(function(objectKey, i) {
          var value = a[objectKey];
          var href = "checkQuestion/" + i
          showData[i] = <li><button type="button" onClick={
            (e) => {self.onItemClick(objectKey,self.state.correctAnswer)
            }
          }>{value}</button></li>
      });
    }
    return showData
  }

  render() {

    if(this.state.next === true) {
      let idQuestion = this.state.id + 1
      let address = "/QuestionBox/"+idQuestion
      this.loadContent(idQuestion)
      this.setState({next:false})
    }
    
    return (
      <div className="QuestionBox">
        <div className="question">
            <ul>{this.state.question}</ul>
        </div>
        <div className="timing">{this.state.timing}</div>
        <div className="answer">
            <ul> {this.compileAnswer(this.state.answer,this)}</ul>
        </div>
      </div>
    );
  }
}

export default QuestionBox;
