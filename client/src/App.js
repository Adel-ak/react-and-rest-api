import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import NewCourse from './components/NewCourse';
import UpdateCourse from './components/UpdateCourse';
import UsersCourse from './components/UsersCourse';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import withContext from './Context';

const HeaderWithContext = withContext(Header)
const CoursesWithContext = withContext(Courses)
const NewCourseWithContext = withContext(NewCourse)
const UpdateCourseWithContext = withContext(UpdateCourse)
const UsersCourseWithContext = withContext(UsersCourse)
const SignUpWithContext = withContext(SignUp)
const SignInWithContext = withContext(SignIn)


function App() {
  return (
    <Router>
    <div>
      <HeaderWithContext />

      <Switch>
      <Route exact path="/" component={CoursesWithContext} />
      <Route path="/courses/create" component={NewCourseWithContext} />
      <Route path="/courses/:id/update" component={UpdateCourseWithContext} />
      <Route path="/courses/:id" component={UsersCourseWithContext} />
      <Route path="/signup" component={SignUpWithContext} />
      <Route path="/signin" component={SignInWithContext} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
