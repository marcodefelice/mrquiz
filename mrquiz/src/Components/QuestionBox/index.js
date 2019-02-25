import React, { Component } from 'react';
import {QuestionListData} from '../../Services/QuestionListData';
import './style.scss';

class QuestionBox extends Component {
      constructor(props) {
        super(props)
        this.state = {
            question: [],
            timing: 0,
            id: 0,
            answer: [],
        };
    }

    componentDidMount() {
      const questiondata = new QuestionListData()
      var self = this;
        questiondata.loadJsonData().then(function(data){
              self.setState({
                question: data.items.question,
                timing: data.items.time,
                id: data.items.id,
                answer: data.items.answer
              });
          })
  }

  compileQuestion(q) {
    var showData = []
    console.log(q)
    if (q != undefined) {
        Object.keys(q).map(function(objectKey, index) {
          var value = q[objectKey];
          if(!Array.isArray(value)) {
            showData[index] = <li>{value}</li>
          }
      });
    }
    return showData
  }

  render() {
    return (
      <div className="QuestionBox">
        <div className="question">
      gino
        </div>
        <div className="answer">
        { this.state && this.state.question &&
              <ul>{this.compileQuestion(this.state.question)}</ul>
            }
        </div>
      </div>
    );
  }
}

export default QuestionBox;
