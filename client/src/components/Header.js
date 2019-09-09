import React from 'react';
import { Link } from 'react-router-dom';

function Header({ context }){
    const authUser = context.authenticatedUser;
    return (
        <div className="header">
        <div className="bounds">
          <h1 className="header--logo"><Link to="/">Courses</Link></h1>
          <nav>
          {
            (authUser !== null)?
            <React.Fragment>
              <span>Welcome,{` ${authUser.firstName} ${authUser.lastName}`} </span>
              <Link className="signout" to="/signout">Sign Out</Link>

            </React.Fragment>
            :
            <React.Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </React.Fragment>
          }
          </nav>
        </div>
      </div>
    );
}

export default Header;