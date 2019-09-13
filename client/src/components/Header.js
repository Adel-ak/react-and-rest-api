import React,{ Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ context:{authenticatedUser} }){
  const style = {
    color:'#fff'
  }
  
  const authUser = authenticatedUser;

  return (
    <Fragment>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo"><Link style={style} to="/">Courses</Link></h1>
          <nav>
          {
            (authUser !== null)?
            <Fragment>
              <span>Welcome,{` ${authUser.firstName} ${authUser.lastName}`} </span>
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