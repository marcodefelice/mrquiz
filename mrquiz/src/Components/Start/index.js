import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {SaveData} from '../../Services/SaveData';


import "./style.scss";
const SAVE = new SaveData()

class Start extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start : false
    }

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {
    SAVE.install(null)
    this.setState(state => ({
      start: true
    }));

  }


  render() {
    const GAME_NAME = localStorage.getItem("GAMENAME")

    if(this.state.start === true) {
      return <Redirect to='/QuestionBox/1' />
    }

    return (
      <div>
        <p>Nome: {GAME_NAME}</p>
        <button className="button start" onClick={this.handleClick} >START</button>
       </div>
    );
  }
}

export default Start;
