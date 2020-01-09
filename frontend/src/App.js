import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import ChefPanel from './components/panels/ChefPanel';
import Menu from './components/menu/Menu';


class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/menu' component={Menu}/>
            <Route path="/chef" component={ChefPanel}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
