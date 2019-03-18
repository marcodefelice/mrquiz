import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch,BrowserRouter } from 'react-router-dom'

import InstallApp from './InstallApp';
import {Components,QuestionBox,RegisterForm} from './Components';


ReactDOM.render((

  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Components}/>
      <Route path='/InstallApp/' component={InstallApp}/>
      <Route path='/QuestionBox/:qid' component={QuestionBox}/>
      <Route path='/RegisterForm/' component={RegisterForm}/>
      <Route path='/Start/' component={Components}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
