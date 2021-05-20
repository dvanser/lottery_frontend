import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { history } from './_library';
import { LoadingWithSuspense } from './components';
import { connect } from 'react-redux';
import { PrivateRoute } from './components';
import { userActions } from './_actions/';
import config from './config';


const Login = React.lazy(() => import(/* webpackChunkName: "login" */ './screens/Login/Login').then(module => ({default: module.Login})));
const Test = React.lazy(() => import(/* webpackChunkName: "test" */ './screens/Test/Test').then(module => ({default: module.TestScreen})));
const Home = React.lazy(() => import(/* webpackChunkName: "home" */ './screens/Home/Home').then(module => ({default: module.Home})));
const Signup = React.lazy(() => import(/* webpackChunkName: "signup" */ './screens/Signup/Signup').then(module => ({default: module.Signup})));
const Profile = React.lazy(() => import(/* webpackChunkName: "profile" */ './screens/Profile/Profile').then(module => ({default: module.Profile})));
const PasswordChange = React.lazy(() => import(/* webpackChunkName: "password_change" */ './screens/PasswordChange/PasswordChange').then(module => ({default: module.PasswordChange})));
const PageNotFound = React.lazy(() => import(/* webpackChunkName: "page_not_found" */ './screens/PageNotFound/PageNotFound').then(module => ({default: module.PageNotFound})));


class App extends Component {

    componentDidMount() {
        if (!this.props.user.synchronized) {
            this.props.loadSettings();
        }
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/test" render={(props) => LoadingWithSuspense(Test, props)} />
                    <Route exact path="/login/:token?" render={(props) => LoadingWithSuspense(Login, props)} />
                    <Route exact path="/404" render={(props) => LoadingWithSuspense(PageNotFound, props)} />
                    <Route exact path="/signup" render={(props) => LoadingWithSuspense(Signup, props)} />
                    <Route exact path="/" render={(props) => LoadingWithSuspense(Home, props)} />
                    <Route exact path="/profile" render={(props) => LoadingWithSuspense(Profile, props)} />
                    <PrivateRoute exact path="/profile" render={(props) => LoadingWithSuspense(Profile, props)}
                                  exactRole={config.userRoles['user']} />
                    <PrivateRoute exact path="/password/change" render={(props) => LoadingWithSuspense(PasswordChange, props)}
                                  exactRole={config.userRoles['user']} />
                    <Route render={(props) => LoadingWithSuspense(PageNotFound, props)} />
                </Switch>
            </Router>
        );
    }
}


function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

function mapDispatchToProps(dispatch) {
    return({
        loadSettings: () => {
            dispatch(userActions.loadSettings())
        }
    })
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };