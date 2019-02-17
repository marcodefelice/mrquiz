import React, { Component } from 'react';
import axios from 'axios';



export class  QuestionListData extends React.Component {
    state = {
      items: []
      }

  loadJsonData() {
    console.log(998)
    const filePath = './Data/question.json'
    axios.get(filePath)
     .then(res => {
        const items = res.data;
        this.setState({items})
    })
    .catch(function (error) {
    console.log("Calling json file at " +  filePath,error);
    });

    return this.state
  }


};
