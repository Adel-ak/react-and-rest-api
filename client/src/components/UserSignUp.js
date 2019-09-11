import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component{

    state = {
        firstName:'',
        lastName:'',
        emailAddress:'',
        password:'',
        confirmPassword:'',
        errorMessages: null,

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
    
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        };
    
        context.data.createUser(user)
        .then(res => {
            context.actions.signIn(emailAddress, password)
                .then(() => this.props.history.push('/'));
        }).catch(err => {
            if(err.message){
            this.setState({errorMessages:err.message});
            }
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
            errorMessages
        } = this.state;

        const { errDisplay,cancel } = this.props.context.actions


        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                {
                    (errorMessages)?
                    errDisplay(errorMessages)
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
                            onClick={e => cancel(e)}>
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