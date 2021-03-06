import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Announcement from './components/layout/Announcement';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
// import NotFound from './components/layout/NotFound';
// import Alert from './components/layout/Alert';
// import Login from './components/auth/Login';
// import Dashboard from './components/dashboard/Dashboard';
// import CreateProfile from './components/profile-forms/CreateProfile';
// import EditProfile from './components/profile-forms/EditProfile';
// import AddExperience from './components/profile-forms/AddExperience';
// import AddEducation from './components/profile-forms/AddEducation';
// import Profiles from './components/profiles/Profiles';
// import Profile from './components/profile/Profile';
// import Posts from './components/posts/Posts';
// import Post from './components/post/Post';
// import PrivateRoute from './components/routing/PrivateRoute';
// import Register from './components/auth/Register';
import { loadUser } from './actions/auth';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Announcement />
        </Fragment>
        <Fragment className="App">
          <Navbar />
          {/* <Landing /> */}
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;

// Git Quick Commands to Deploy/Push Changes
// …or create a new repository on the command line
// echo "# zDevConnector" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git remote add origin https://github.com/zayidu/zDevConnector.git
// git push -u origin master

// …or push an existing repository from the command line
// git remote add origin https://github.com/zayidu/zDevConnector.git
// git push -u origin master
// …or import code from another repository
// You can initialize this repository with code from a Subversion, Mercurial, or TFS project.

// Heroku Commands:
// heroku login

// Clone the repository
// Use Git to clone powerful-brook-38361's source code to your local machine.

// heroku git:clone -a powerful-brook-38361
// cd powerful-brook-38361

// Deploy your changes
// Make some changes to the code you just cloned and deploy them to Heroku using Git.

// git add .
// git commit -am "make it better"
// git push heroku master
