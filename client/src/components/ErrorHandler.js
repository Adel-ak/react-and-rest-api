import React,{ Fragment } from 'react';

const ErrorHandler = ({location:{ state }}) => {

let title;
let message;
//if state is empty its means user has quested for an unknown page
if(!state){
    title = 'Not Found';
    message = 'Sorry! We couldn\'t find the page you\'re looking for.';
}else{
    //else server error occurred or a forbidden page
    title = state.title;
    message = state.message;
}

return(
    <Fragment>
        <h1>{title}</h1>
        <p>{message}</p>
    </Fragment>)
};

export default ErrorHandler;