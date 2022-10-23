import React, { Component } from 'react';
import { store } from '../index';
import { Navigate, Link } from 'react-router-dom';
import '../App.css';

// Authorization form with checking of fields 
// and redirection to Home page after authorization

class Authorization extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email:'',
      password: '',
      auth: false,
      error: false,
      error_text:''
    };
  }
  // Responce on form field changing and save the field values into the state
  handleChange = (event) => {
    const value = event.target.value
    const fieldName = event.target.dataset.fieldName     
    this.setState({ 
      ...this.state,
      [fieldName]: value });
    
  }

  // Responce on form submit, check of the field values and save them or 
  // error messages into the state
  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    
    // Creation of object with information about all users 
    // what is saved in local storage
    const exUsers = JSON.parse(localStorage.getItem('redux_store')).users
    
    // Check of field values and saving the state and errors into store
    if (!exUsers.map(user => user.username).includes(username)) {
      store.dispatch({ type: 'FAILURE', payload: {error: true, text: 'There is no such User'}})
    }else{
      let userInfo = exUsers.filter(user => user.username == username)[0]
      if (userInfo.password === password) {
        store.dispatch({ type: 'LOG_IN', payload: username})     
      }else if (userInfo.password !== password){
        store.dispatch({ type: 'FAILURE', payload: {error: true, text: 'Password is wrong'}})
      }
    }
    

    // Saving store into the local storage
    localStorage.setItem('redux_store', JSON.stringify(store.getState()));
    
    // Returning results of checks into the state
    this.setState({ 
      ...this.state,
      auth: store.getState().auth,
      error: store.getState().error,
      error_text: store.getState().error_text
    
    });
  }
  
  render () {
    
    let { auth, error, error_text } = this.state
    return (
      <div>
        <div class="err">
          {error && <p>{error_text}</p>}
          {auth && (
            <Navigate to="/home" />
          )}
        </div>
        <div id="auth-form">
          <form onSubmit={this.handleSubmit}> 
            <div class="mb-3">
              <input data-field-name={'username'} type="text" name="username" class="form-control" id="exampleFormControlInput1" placeholder="User Name" value={this.state.username} onChange={this.handleChange}/>
            </div>
            <div class="mb-3">
              <input data-field-name={'password'} type="password" name="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
            </div>
              <input id="fl-btn" class="btn btn-outline-primary" type="submit" value="Log In" />
              <button id="fl-link" class="btn btn-light" type="button"><Link to="/reg">Registration</Link></button>

          </form>
        </div>  
      </div>
    )
  }
}
export default Authorization;