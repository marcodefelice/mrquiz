import React, { Component } from 'react';

import "./style.scss";

class Start extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start : false
    }

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {
    this.setState(state => ({
      start: true
    }));

  }


  render() {
    const GAME_NAME = localStorage.getItem("GAMENAME")

    if(this.state.start === true) {
      return (
        <div>
          WOOOOOOOOOOOOW
        </div>
      )
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
