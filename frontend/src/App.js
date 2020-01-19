import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import ChefPanel from './components/panels/ChefPanel';
import Menu from './components/menu/Menu';
import DrawGraph from './components/draw/DrawGraph';
import SignIn from './components/auth/signin/SignIn';
import SignOut from './components/auth/signout/SignOut';
import SignUp from './components/auth/signup/SignUp';

import './App.css';

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/menu' component={Menu}/>
            <Route path="/chef" component={ChefPanel}/>
            <Route path="/graph" component={DrawGraph}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signout" component={SignOut}/>
            <Route path="/signup" component={SignUp}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
