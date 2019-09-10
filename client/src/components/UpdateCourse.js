import React, { Component } from 'react';

class UpdateCourse extends Component{

    state = {
        courses: null
    }

    cancel = (event) => {
        event.preventDefault(); 
        window.location.href='/';
    }

    async componentDidMount(){
        const { context } = this.props;
        const { id } = this.props.match.params;
        await context.data.getCourses(`/courses/${id}`)
            .then(res => {
                console.log(res);
                if(res !== null){
                    this.setState({
                        courses: res
                    })
                }
            }).catch(err => {
                console.log(err)

            })
    }

    render(){

        const style = {
            cursor: "pointer"
        }

        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form>
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
                                    defaultValue="Build a Basic Bookcase"/>
                                </div>
                                <p>By Joe Smith</p>
                            </div>
                            <div className="course--description">
                                <div>
                                <textarea 
                                id="description" 
                                name="description" 
                                className="" 
                                placeholder="Course description...">
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
                                        defaultValue="14 hours"/>
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea 
                                        id="materialsNeeded" 
                                        name="materialsNeeded" 
                                        className="" 
                                        placeholder="List materials...">
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
                            onClick={e => this.cancel(e)}>
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