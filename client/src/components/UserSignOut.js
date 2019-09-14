import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function SignOut({ context:{ actions:{ signOut } } }){
    signOut();
    // removes authenticated user from cookies once signed out
    Cookies.remove('authenticatedUser');
    return <Redirect to='/'/>;
}