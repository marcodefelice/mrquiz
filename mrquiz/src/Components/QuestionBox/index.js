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
      const qid = this.props.match.params.qid
      const questiondata = new QuestionListData()
      var self = this;
        questiondata.loadJsonData(qid).then(function(data){
              self.setState({
                question: data.items.question,
                timing: data.items.time,
                id: data.items.id,
                answer: data.items.answer
              });
          })
  }

  compileAnswer(a) {
    var showData = []
    if (a != undefined) {
        Object.keys(a).map(function(objectKey, index) {
          var value = a[objectKey];
          showData[index] = <li>{value}</li>
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
            <ul>{this.compileAnswer(this.state.answer)}</ul>
        </div>
      </div>
    );
  }
}

export default QuestionBox;
