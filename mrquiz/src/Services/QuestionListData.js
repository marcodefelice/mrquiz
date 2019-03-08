import { Component } from 'react';
import axios from 'axios';

export class  QuestionListData extends Component {
    constructor() {
      super()
      var items = []
    }

  loadJsonData(qid) {
    const filePath = window.location.origin+'/Data/question.json'
    let promise = new Promise(function(resolve,reject) {
      axios.get(filePath)
     .then(res => {
        const items = res.data[qid];
        console.log(items)
        resolve({items})
    })
    .catch(function (error) {
    console.log("Calling json file at " +  filePath,error);
    });
  });

  return promise
  }


};
