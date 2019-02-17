import React, { Component } from 'react';
import {QuestionListData} from '../../Services/QuestionListData';
import './style.scss';

const questiondata = new QuestionListData()
var da = questiondata.loadJsonData()

class QuestionBox extends Component {
  render() {

    console.log(da.items,123)
    return (
      <div className="QuestionBox">
        <div class="question">
          <p>{this.props.question} PIPPO</p>
        </div>

        <div class="answer">

        </div>
      </div>
    );
  }
}

export default QuestionBox;
