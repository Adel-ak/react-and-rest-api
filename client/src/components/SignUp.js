import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component{

    state = {
        firstName:'',
        lastName:'',
        emailAddress:'',
        password:'',
        confirmPassword:'',
        errorsDisplay: null,
        errLength: 0,
    }

    submit = (e) => {
        e.preventDefault();
        const { context } = this.props;

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        } = this.state;
    
        // Create user
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        };
    
        context.data.createUser(user)
          .then( errors => {
            if (errors.length) {
              throw errors;
            } 
            // else {
            //     // if(password !== confirmPassword){
            //     //     errors = ['Passwords Does Not Match']
            //     //     throw errors;
            //     // }else{
            //     //     // context.actions.signIn(emailAddress, password)
            //     //     //     .then(() => {});
            //     // }
            // }
          })
          .catch(err => {
            this.setState({
              errorsDisplay: () => (
                <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                    {err.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
                </div>
                ),
                errLength : err.length

            });
          }); 
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

    cancel = (event) => {
        event.preventDefault(); 
        window.location.href='/';
    }

    render(){

        const style = {
            cursor: "pointer"
        }

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        } = this.state;

        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                {
                    (this.state.errLength > 0)
                    ?this.state.errorsDisplay()
                    :false
                }
                <div>
                    <form onSubmit={this.submit}>
                        <div>
                            <input 
                            id="firstName" 
                            name="firstName" 
                            type="text" 
                            className="" 
                            placeholder="First Name" 
                            value={firstName} 
                            onChange={this.change} />
                            
                        </div>
                        <div>
                            <input 
                            id="lastName" 
                            name="lastName" 
                            type="text" 
                            className="" 
                            placeholder="Last Name" 
                            value={lastName} 
                            onChange={this.change} />
                        </div>
                        <div>
                            <input 
                            id="emailAddress" 
                            name="emailAddress" 
                            type="text" 
                            className="" 
                            placeholder="Email Address" 
                            value={emailAddress} 
                            onChange={this.change} />
                        </div>
                        <div>
                            <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            className="" 
                            placeholder="Password" 
                            value={password} 
                            onChange={this.change} 
                            autoComplete="off"
                            />
                        </div>
                        <div>
                            <input 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            className="" 
                            placeholder="Confirm Password"
                            value={confirmPassword} 
                            onChange={this.change} 
                            autoComplete="off"
                            />
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button 
                            style={style} 
                            className="button" 
                            type="submit">
                            Sign Up
                            </button>
                            <button 
                            style={style} 
                            className="button button-secondary" 
                            onClick={(e) => this.cancel(e)}>
                            Cancel
                            </button>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        );
    }
}

export default SignUp