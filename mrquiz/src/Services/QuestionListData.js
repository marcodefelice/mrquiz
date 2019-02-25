import React, { Component } from 'react';
import axios from 'axios';



export class  QuestionListData extends React.Component {
    constructor() {
      super()
      var items = []
    }

  loadJsonData(cb) {
    const filePath = './Data/question.json'
    let promise = new Promise(function(resolve,reject) {
      axios.get(filePath)
     .then(res => {
        const items = res.data;
        resolve({items})
    })
    .catch(function (error) {
    console.log("Calling json file at " +  filePath,error);
    });
  });

  return promise
  }


};
