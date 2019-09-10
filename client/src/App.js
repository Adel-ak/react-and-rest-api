import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import NewCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const NewCourseWithContext = withContext(NewCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UsersCourseWithContext = withContext(CourseDetail);
const SignUpWithContext = withContext(UserSignUp);
const SignInWithContext = withContext(UserSignIn);
const SignOutWithContext = withContext(UserSignOut);


function App() {
  return (
    <Router>
    <React.Fragment>
      <HeaderWithContext />
      <Switch>
      <Route exact path="/" component={CoursesWithContext} />
      <PrivateRoute path="/courses/create" component={NewCourseWithContext} />
      <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
      <Route path="/courses/:id" component={UsersCourseWithContext} />
      <Route path="/signup" component={SignUpWithContext} />
      <Route path="/signin" component={SignInWithContext} />
      <Route path="/signOut" component={SignOutWithContext} />
      </Switch>
    </React.Fragment>
  </Router>
  );
}

export default App;
