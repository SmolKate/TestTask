import React from 'react';
import Header from './header';
import {  AiOutlineUser } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { store } from '../index';
import NotFound from './notfound';
  
// Home page with list of all users exept authorized one

// Creation of list element with icon and user name
function ListItem(props) {
    let navigate = useNavigate();

    //Redirection to the page with detailed information about 
    //the user those icon was clicked
    const handleClick = (event) => {
        localStorage.setItem('redux_store', JSON.stringify(store.getState()));
        navigate("/user/" + props.value)  
    }

    return (
        <div class="list">
            <div>
            <button class="btn btn-outline-secondary" onClick={handleClick}><AiOutlineUser size={70}/></button>
            <div id="name">
                <h4>{props.value}</h4>
            </div>
            </div>
        </div>
    )
}

// Creation of the list of users
function ListConstractor (props) { 
        
    const exUsers = JSON.parse(localStorage.getItem('redux_store')).users;
    const listForUser = exUsers.filter(user => {if (user.username !== props.name) return user})
    const listOfUsers = listForUser.map(user => user.username);
    const list = listOfUsers.map((user) => 
        <ListItem key={user} value={user} />); 
        
    return (
        <div class="cont"> {list} </div>
    )
}

// Combine of the header and the list of users
function Home () {
    const auth = store.getState().auth;
    
    return (
        <div>
            {auth && 
                <div>
                    <Header name={auth}/>
                    <h4>Other Users:</h4>
                    <ListConstractor name={auth}/>
                </div>}
            {!auth && <NotFound name={''} />}
        </div>
    )
}
export default Home;