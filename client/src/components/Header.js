import React,{ Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ context:{ authenticatedUser } }){
  //css style for logo color
  const style = {
    color:'#fff'
  }

  return (
    <Fragment>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo"><Link style={style} to="/">Courses</Link></h1>
          <nav>
          {
            //if your is authenticated then render welcome message and sign out button in header
            (authenticatedUser !== null)?
            <Fragment>
              <span>Welcome,{` ${authenticatedUser.firstName} ${authenticatedUser.lastName}`} </span>
              <Link className="signout" to="/signout">Sign Out</Link>
            </Fragment>
            :
            <Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </Fragment>
          }
          </nav>
        </div>
      </div>
    </Fragment>
  );
}