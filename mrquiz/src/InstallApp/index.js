import "./style.scss";

import React, { Component } from 'react';
import {SaveData} from '../Services/SaveData';
import { Redirect } from 'react-router-dom'


const SAVE = new SaveData()

class InstallApp extends Component {

  constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
        toStart: false,
      }
    
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      let gamename= this.state.value
      SAVE.saveGameName(gamename)
      localStorage.setItem("GAMENAME", gamename)
      this.setState(() => ({
        toStart: true
      }))

      //TODO: maybe you need attempt table creation
      event.preventDefault();
    }

    componentDidMount() {
      SAVE.init()
    }

  render() {

    if (this.state.toStart === true) {
      return <Redirect to='/start' />
    }

    return (
        <form className="install-form" onSubmit={this.handleSubmit}>
            <input type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Nome della partita"
            />
            <input type="submit" value="INVIA" />
        </form>
    );
  }

}

export default InstallApp;
