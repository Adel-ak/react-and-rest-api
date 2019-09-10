import React, { Component } from 'react';



class Courses extends Component{

    state = {
        courses: null,
    }

    async componentDidMount(){
        const { context } = this.props;
        await context.data.getCourses(`/courses`)
            .then(res => {
                if(res.length > 0){
                    this.setState({
                        courses: res
                    })
                }
            
            });
    }

    render() {
        const { courses }=this.state
        const values = 
        (courses !== null)?
        courses.map(val => (
            <div className="grid-33" key={val.id} >
                <a className="course--module course--link" href={`/courses/${val.id}`}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{val.title}</h3>
                </a>
            </div>
        ))
        :
        false;
        return(
            <div className="bounds">
                { values }
                <div className="grid-33">
                    <a className="course--module course--add--module" href="/courses/create">
                    <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </h3>
                    </a>
                </div>
            </div>
        );
    }
}

export default Courses