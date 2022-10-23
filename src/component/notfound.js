import React from 'react';
import {Navigate, Link} from 'react-router-dom';
import Header from './header';

// Not Found page with link to Home page
function NotFound (props) {

    return (
        <div>
            {props.name && <div>
                <Header name={props.name}/>
                <h2>404: This page does not exist.</h2>
                <Link to="/home">Return to Home page.</Link>
            </div>}
            {!props.name && <Navigate to="/" />}
        </div>
    )
}
export default NotFound;