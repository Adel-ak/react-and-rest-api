import React,{ PureComponent } from 'react';
import { Link } from 'react-router-dom';

class UsersCourse extends PureComponent {
    state = {
        id:"",
        title: "",
        description: "",
        materialsNeeded: "",
        estimatedTime: "",
        user: {
            firstName: "",
            lastName:""
        },
    }

    async componentDidMount(){
        const { match: { params } } = this.props;
        const { context } = this.props;
        await context.data.getCourses(`/courses/${params.id}`)
            .then(res => {
                const {
                    id,
                    title,
                    description,
                    User,
                    materialsNeeded,
                    estimatedTime
                } = res;    
                this.setState({
                    id,
                    title,
                    description,
                    materialsNeeded,
                    estimatedTime,
                    user: User
                });
            });
            
        }

    render(){
        const {
            id,
            title,
            description,
            user,
            // eslint-disable-next-line
            materialsNeeded,
            estimatedTime 
        } = this.state;  
        
        return(
            <div>
            <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100"><span><Link className="button" to={`/courses/${id}/update`} >Update Course</Link><a className="button" href="/">Delete Course</a></span><a
                    className="button button-secondary" href="/">Return to List</a></div>
            </div>
            </div>
            <div className="bounds course--detail">
            <div className="grid-66">
                <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
                <p>By {`${user.firstName} ${user.lastName}`}</p>
                </div>
                <div className="course--description">
                <p>{ description }</p>
                </div>
            </div>
            <div className="grid-25 grid-right">
                <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                        <li>1/2 x 3/4 inch parting strip</li>
                        <li>1 x 2 common pine</li>
                        <li>1 x 4 common pine</li>
                        <li>1 x 10 common pine</li>
                        <li>1/4 inch thick lauan plywood</li>
                        <li>Finishing Nails</li>
                        <li>Sandpaper</li>
                        <li>Wood Glue</li>
                        <li>Wood Filler</li>
                        <li>Minwax Oil Based Polyurethane</li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default UsersCourse