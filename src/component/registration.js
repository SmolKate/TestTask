import React, { Component } from 'react';
import { store } from '../index';
import { Navigate } from 'react-router-dom';

// Registration form with checking of fields 
// and redirection to Authorization page after registration
class Registration extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email:'',
      password: '',
      repeate_password: '',
      reg: false,
      error: '',
      eror_text: '',
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
    const { username, password, repeate_password, email} = this.state;

    // Creation of object with information about all users 
    // what is saved in local storage
    const exUsers = JSON.parse(localStorage.getItem('redux_store')).users;
    
    // Check of field values and saving the state and errors into store
    if (exUsers.map(user => user.username).includes(username)) {
      store.dispatch({ type: 'FAILURE', payload: {error: true, text: 'This user already exists.'}})
    }else{
      if(username !='' && repeate_password === password) {
        store.dispatch({ type: 'ADD_USER', payload :{username: username, password: password, email: email}});       
        this.state.reg = true;
      }else if (username == '') {
        store.dispatch({ type: 'FAILURE', payload: {error: true, text: 'Write your name, please.'}})
      }else if (repeate_password !== password){
        store.dispatch({ type: 'FAILURE', payload: {error: true, text: 'Passwords are different.'}})
      }
    };
    
    // Saving store into the local storage
    localStorage.setItem('redux_store', JSON.stringify(store.getState()));

    // Returning results of checks into the state
    this.setState({ 
      ...this.state,
      error: store.getState().error,
      error_text: store.getState().error_text
    })
  }

  render () {
    let { reg, error, error_text } = this.state

    return (
    <div>
      <div class="err">
        {error && <p>{error_text}</p>}
        {reg && (
          <Navigate to="/" />
        )}
      </div>
      <div id="auth-form">
        <form onSubmit={this.handleSubmit}>
          <div class="mb-3">
            <input data-field-name={'username'} type="text" name="username" class="form-control" id="exampleFormControlInput1" placeholder="User Name" value={this.state.username} onChange={this.handleChange}/>
          </div>
          <div class="mb-3">
            <input data-field-name={'email'} type="email" name="email" class="form-control" id="exampleFormControlInput1" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
          </div>
          <div class="mb-3">
            <input data-field-name={'password'} type="password" name="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
          </div>
          <div class="mb-3">
            <input data-field-name={'repeate_password'} type="password" name="repeate_password" class="form-control" id="exampleFormControlInput1" placeholder="Repeat Password" value={this.state.repeate_password} onChange={this.handleChange}/>
          </div>
          <input id="fl-btn" class="btn btn-outline-primary" type="submit" value="Register" />
        </form>
        </div>
    </div>
    )
  } 
}
export default Registration;