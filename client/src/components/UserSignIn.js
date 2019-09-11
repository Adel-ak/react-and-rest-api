import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component{

  state = {
      emailAddress: '',
      password: '',
      errorMessages: null,
  }

  change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState(() => {
        return {
          [name]: value
        };
      });
    }
  
    submit = (e) => {
      e.preventDefault();
      const { context } = this.props;
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      const { emailAddress, password } = this.state;
  
      context.actions.signIn(emailAddress || 'ak@ak.com', password||'12')
        .then(user => {
          if (user.isNull) {
            throw user
          } 
          else {
            this.props.history.push(from);
          }
        }).catch(err => {
          if(err.errors){
            this.setState({errorMessages:err.errors});
          }
          
        }); 
    }

    render(){

        const style = {
            cursor: "pointer"
        }

        const {
            emailAddress,
            password,
            errorMessages
          } = this.state;

        const { errDisplay,cancel } = this.props.context.actions

        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    {
                      (errorMessages)?
                      errDisplay(errorMessages)
                      :false
                    }
                    <div>
                        <form onSubmit={this.submit}>
                            <div>
                                <input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="text" 
                                className="" 
                                placeholder="Email Address" 
                                value={emailAddress||'ak@ak.com'}
                                onChange={this.change} 
                                />
                            </div>
                            <div>
                                <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                className="" 
                                placeholder="Password" 
                                value={password||"12"}
                                onChange={this.change}
                                autoComplete="off"
                                />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button 
                                style={style} 
                                className="button" 
                                type="">
                                Sign In
                                </button>
                                <button 
                                style={style} 
                                className="button button-secondary" 
                                onClick={e => cancel(e)}>
                                Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup" >Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }
}

export default SignIn