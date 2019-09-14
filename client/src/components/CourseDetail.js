import React,{ PureComponent,Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends PureComponent {

    state = {
        id:"",
        title: "",
        description: "",
        materialsNeeded: "",
        estimatedTime: "",
        user: {},
        boolean: true,
        isRedirect: false,
        redirectPath: null,
        redirectMessages: null,
    }

    componentDidMount = async () => {
        const { match: { params } } = this.props;
        const { context } = this.props;
        try{
           //fetches course
            const res =  await context.data.getCourses(`/courses/${params.id}`)
           
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
                user: User,
                /*if user is not authenticated or current (logged in) user and course user id
                the boolean will be used to show or not to show the update and deleted 
                depending if the user own or if a guest is viweing it 
                */
                boolean: this.props.context.authenticatedUser === null 
                        || this.props.context.authenticatedUser.id !== User.id
            });

        }catch(err){

            if(!err.title){
                err.title = "Not Found";
                this.setState({
                    isRedirect:true,
                    redirectPath: '/notfound',
                    redirectMessages: err
                });
            } else if(err.status === 500){
                this.setState({
                    isRedirect:true,
                    redirectPath: '/error',
                    redirectMessages: err
                });
            }  
        }
        
    }

    //deletes users course (users must own course and be authenticated)
    delete = async (path) => {
        const { context, history } = this.props;
        const { emailAddress,password } = context.authenticatedUser;
        const decryptedPass = context.cryptr.decrypt(password);//decrypted paswword
        await context.data.deleteCourses( path, emailAddress, decryptedPass );
        history.push('/');//goes to home page after deleted
    }
    
    render(){

        const {
            id,
            title,
            description,
            user,
            materialsNeeded,
            estimatedTime,
            boolean,
            isRedirect,
            redirectPath,
            redirectMessages
        } = this.state;

        //any error occurred user will be directed to an error page
        if(isRedirect){
            return(
                <Redirect to={{
                    pathname: redirectPath,
                    state: redirectMessages
                }} />
            );
        }
             
        return(
            <div>
            <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
                {
                    /*show only if current user owns the course*/
                    (!boolean)?
                    <span>
                        <Link 
                        className="button" 
                        to={`/courses/${this.props.match.params.id}/update`} >
                        Update Course
                        </Link>
                        <Link 
                        className="button" 
                        to="#" 
                        onClick={() => this.delete(`/courses/${id}`)}>
                        Delete Course
                        </Link>
                    </span>
                    :false
                }
                
                <Link
                className="button button-secondary" 
                to="/">
                Return to List
                </Link>
                </div>
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
                    <ReactMarkdown source={description}/>
                </div>
            </div>
            <div className="grid-25 grid-right">
                <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                    {
                        /*only show estimatedTime if its not empty*/
                        (estimatedTime)?
                        <Fragment>
                        <h4>Estimated Time</h4>
                        <h3>{estimatedTime}</h3>
                        </Fragment>
                        :false
                    }
                    </li>
                    <li className="course--stats--list--item">
                    {
                        /*only show materialsNeeded if its not empty*/
                        (materialsNeeded)?
                        <Fragment>
                            <h4>Materials Needed</h4>
                            <ReactMarkdown source={materialsNeeded}/>
                        </Fragment>
                        :false
                    }
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default CourseDetail