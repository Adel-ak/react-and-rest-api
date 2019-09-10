import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

function SignOut({ context }){
    context.actions.signOut();
    Cookies.remove('authenticatedUser');
    return(
        <Redirect to='/'/>
    );
}

export default SignOut;