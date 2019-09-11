import React, { Component } from 'react';

class NewCourse extends Component{

  state = {
      title:'',
      description:'',
      estimatedTime:'',
      materialsNeeded:'',
      user : this.props.context.authenticatedUser,
      errorMessages: null,
  }

  submit = (e) => {
    e.preventDefault();
    const { context } = this.props;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    } = this.state;

    const data = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    }

    const { emailAddress,password } = context.authenticatedUser;
    const decryptedString = context.cryptr.decrypt(password);

    context.data.createCourses('/courses',data,emailAddress,decryptedString)
    .then(res => {
      this.props.history.push('/');  
    })
    .catch(err => { 
      if(err.message){
        this.setState({errorMessages:err.message});
      }
    })
  }


  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }



  render(){
    const style = {
      cursor: "pointer"
    };

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user,
      errorMessages
    } = this.state;

  const { errDisplay,cancel } = this.props.context.actions
      return(
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          {
            (errorMessages !== null)
            ?errDisplay(errorMessages)
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
                    onChange={this.change}
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
                    onChange={this.change}>
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
                        onChange={this.change}
                        />
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
                        onChange={this.change}>
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
                Create Course
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

export default NewCourse