import React, { Component } from 'react';
import {QuestionListData} from '../../Services/QuestionListData';
import {CheckAnswer} from '../../Services/CheckAnswer';
import './style.scss';

class QuestionBox extends Component {
      constructor(props) {
        super(props)
        this.state = {
            question: [],
            timing: null,
            id: null,
            answer: [],
            correctAnswer: null
        };
    }

    componentDidMount() {
      const qid = this.props.match.params.qid
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
      console.log("OK")
    }
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
