import React, { Component } from 'react';
import {SaveData} from '../../Services/SaveData';

import "./style.scss";

const SAVE = new SaveData()

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        SAVE.install(this.state.value)
        event.preventDefault();
      }

  render() {
    return (
        <form className="register-form" onSubmit={this.handleSubmit}>
            <input type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Nome della squadra"
            />
            <input type="submit" value="INVIA" />
        </form>
    );
  }
}

export default RegisterForm;
