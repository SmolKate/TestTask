import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { store } from '../index';

// Header component of pages that available for authorized users
function Header (props) {
    let navigate = useNavigate();
    const params = useParams(); 
    
    // Redirection to Authorization page after Exit button click
    const handleClick = (event) => {
        store.dispatch({ type: 'LOG_OUT'});
        localStorage.setItem('redux_store', JSON.stringify(store.getState()));
        navigate("/")
    }
   
    return (
        <div class="head">
            <div id="fl-btn1">
                <h2>{ props.name }, welcome to this site!</h2>
            </div>
            <div id="fl-btn2"> 
                <button id="ex-btn" class="btn btn-outline-dark" onClick={handleClick}>Exit</button>
            </div>
        </div>
    )
}
export default Header;