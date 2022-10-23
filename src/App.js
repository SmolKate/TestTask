import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, { Component } from 'react';
import Home from './component/home';
import User from './component/user';
import Registration from './component/registration';
import Authorization from './component/authorization';
import NotFound from './component/notfound';
import { store } from './index';

// All url routes of application

class App extends Component {
  
  render () {
    const auth = store.getState().auth
    return (              
      <Routes>
        <Route exact path='/' element={< Authorization />}></Route>
        <Route exact path='/reg' element={< Registration />}></Route>
        <Route exact path='/home' element={< Home />}></Route>
        <Route exact path='/user/:username' element={< User />}></Route>
        <Route exact path='*' element={< NotFound name={auth}/>}></Route>

      </Routes>
    );
  }
}
export default App;

