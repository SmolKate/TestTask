import React from 'react';
import {useParams} from 'react-router-dom';
import Header from './header';
import { store } from '../index';
import NotFound from './notfound';

// Page with detailed information about user
function User () {
    
    // Getting of information about thee user saved into the local storage
    const params = useParams(); 
    const auth = store.getState().auth;
    const exUsers = JSON.parse(localStorage.getItem('redux_store')).users;
    const UserInfo = exUsers.filter(user => {if (user.username == params.username) return user});
    if (UserInfo.length == 0) {
        params.username = '';

        return <div><NotFound name={auth} /></div>
    }
    const email = UserInfo.map(user => user.email);

    return (
        <div>
            {auth && <div>
                <Header name={auth}/>
                <div id="user">
                <h2>Info about user: { params.username }</h2>
                
                
                Details:
                <table class="table">
                    <tbody>
                        <tr>
                            <th class="th">Email:</th>
                            <td class="th">{email}</td>
                        </tr>
                    </tbody>   
                </table>
                </div>
                
            </div>}
            {!auth && <NotFound name={''} />}
        </div>
    )
}
export default User;