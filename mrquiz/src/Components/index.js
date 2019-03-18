import React, { Component } from 'react';
import QuestionBox from './QuestionBox';
import RegisterForm from './RegisterForm';
import Start from './Start';
import { Redirect } from 'react-router-dom'


/**
 * @return bool
 */
function checkIfGameEsist() {
  let game = localStorage.getItem("GAMENAME")
  if (game !== null) {
    return true
  }
  return false
}

class Components extends Component {

  render() {
    if(!checkIfGameEsist()) {
      return <Redirect to='/InstallApp' />
    }
    
    return (
    <Start />
    );
  }
}

export { // without default
  Components,
  QuestionBox,
  RegisterForm,
  
}
