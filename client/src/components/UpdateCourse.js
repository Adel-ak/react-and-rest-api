import React, { Component } from 'react';

class UpdateCourse extends Component{

    state = {
        id:'',
        title:'',
        description:'',
        estimatedTime:'',
        materialsNeeded:'',
        user : '',
        errorMessages: null,
    }

    chnage = (e)  => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }

    cancel = (e) => {
        e.preventDefault(); 
        this.props.history.push('/');
    }

    async componentDidMount(){
        const { context } = this.props;
        const { id } = this.props.match.params;
        await context.data.getCourses(`/courses/${id}`)
            .then(res => {
                const {
                    id,
                    description,
                    estimatedTime,
                    materialsNeeded,
                    title,
                    User,
                } = res;
                if(res !== null){
                    this.setState({
                        id,
                        title,
                        description,
                        estimatedTime,
                        materialsNeeded,
                        user : User,
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    submit = (e) => {
        e.preventDefault();
        const { context } = this.props;
        const {
            description,
            estimatedTime,
            materialsNeeded,
            title,
            User,
        } = this.state;

        const body = {
            description,
            estimatedTime,
            materialsNeeded,
            title,
            User,
        };

        const { emailAddress,password } = context.authenticatedUser;
        const decryptedString = context.cryptr.decrypt(password);

        context.data.updateCourse(`/courses/${this.state.id}`, body, emailAddress, decryptedString)
        .then(res => {
            if(res.message){
                throw res
            }
        }).catch(err => {
            if(err.message){
                this.setState({errorMessages: err.message})
            }
        })
    }

    render(){

        const style = {
            cursor: "pointer"
        };

        const {
            title,
            description,
            materialsNeeded,
            estimatedTime,
            user,
            errorMessages
        }= this.state;

        const { errDisplay,cancel } = this.props.context.actions

        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                {
                    (errorMessages)?
                    errDisplay(errorMessages)
                    :false
                }
                <div>
                    <form onSubmit={this.submit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                    id="title" 
                                    name="title" 
                                    type="text" 
                                    className="input-title course--title--input" 
                                    placeholder="Course title..."
                                    value={title}
                                    onChange={this.chnage}
                                    />
                                </div>
                                <p>By {`${user.firstName} ${user.lastName}`}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                <textarea 
                                id="description" 
                                name="description" 
                                className="" 
                                placeholder="Course description..."
                                value={description}
                                onChange={this.chnage}>
                                </textarea>
                            </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input 
                                        id="estimatedTime" 
                                        name="estimatedTime" 
                                        type="text" 
                                        className="course--time--input"
                                        placeholder="Hours" 
                                        value={estimatedTime}
                                        onChange={this.chnage}/>
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea 
                                        id="materialsNeeded" 
                                        name="materialsNeeded" 
                                        className="" 
                                        placeholder="List materials..."
                                        value={materialsNeeded}
                                        onChange={this.chnage}>
                                        </textarea>
                                    </div>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button 
                            style={style}
                            className="button" 
                            type="submit">
                            Update Course
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
            </div>
        );
    }
}

export default UpdateCourse