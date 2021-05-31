import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { history } from './_library';
import {LoadingWithSuspense} from './components';
import { connect } from 'react-redux';
import { PrivateRoute } from './components';
import { userActions } from './_actions/';
import config from './config';
import CookieConsent from "react-cookie-consent";
import {FormattedMessage} from "react-intl";
import PrivacyFile from "./privacy.pdf";


const Login = React.lazy(() => import(/* webpackChunkName: "login" */ './screens/Login/Login').then(module => ({default: module.Login})));
const Test = React.lazy(() => import(/* webpackChunkName: "test" */ './screens/Test/Test').then(module => ({default: module.TestScreen})));
const Home = React.lazy(() => import(/* webpackChunkName: "home" */ './screens/Home/Home').then(module => ({default: module.Home})));
const Signup = React.lazy(() => import(/* webpackChunkName: "signup" */ './screens/Signup/Signup').then(module => ({default: module.Signup})));
const Profile = React.lazy(() => import(/* webpackChunkName: "profile" */ './screens/Profile/Profile').then(module => ({default: module.Profile})));
const RegisterCode = React.lazy(() => import(/* webpackChunkName: "register_code" */ './screens/Profile/RegisterCode').then(module => ({default: module.RegisterCode})));
const PasswordChange = React.lazy(() => import(/* webpackChunkName: "password_change" */ './screens/PasswordChange/PasswordChange').then(module => ({default: module.PasswordChange})));
const PageNotFound = React.lazy(() => import(/* webpackChunkName: "page_not_found" */ './screens/PageNotFound/PageNotFound').then(module => ({default: module.PageNotFound})));
const FAQ = React.lazy(() => import(/* webpackChunkName: "faq" */ './screens/FAQ/FAQ').then(module => ({default: module.FAQ})));
const ConfirmEmail = React.lazy(() => import(/* webpackChunkName: "confirm_email" */ './screens/ConfirmEmail/ConfirmEmail').then(module => ({default: module.ConfirmEmail})));
const ProfileStep1 = React.lazy(() => import(/* webpackChunkName: "profile_step_1" */ './screens/Profile/ProfileStep1').then(module => ({default: module.ProfileStep1})));
const ProfileEdit = React.lazy(() => import(/* webpackChunkName: "profile_edit" */ './screens/Profile/ProfileEdit').then(module => ({default: module.ProfileEdit})));
const ProfileCodes = React.lazy(() => import(/* webpackChunkName: "profile_codes" */ './screens/Profile/ProfileCodes').then(module => ({default: module.ProfileCodes})));
const RequestPrize = React.lazy(() => import(/* webpackChunkName: "request_prize" */ './screens/Profile/RequestPrize').then(module => ({default: module.RequestPrize})));
const Contacts = React.lazy(() => import(/* webpackChunkName: "contacts" */ './screens/Contacts/Contacts').then(module => ({default: module.Contacts})));
const Rules = React.lazy(() => import(/* webpackChunkName: "rules" */ './screens/Rules/Rules').then(module => ({default: module.Rules})));
const PasswordResetRequest = React.lazy(() => import(/* webpackChunkName: "password_reset_request" */ './screens/PasswordResetRequest/PasswordResetRequest').then(module => ({default: module.PasswordResetRequest})));
const PasswordReset = React.lazy(() => import(/* webpackChunkName: "password_reset" */ './screens/PasswordReset/PasswordReset').then(module => ({default: module.PasswordReset})));

function openFile(file) {
    window.open(file, '_blank');
}

class App extends Component {

    componentDidMount() {
        if (!this.props.user.synchronized) {
            this.props.loadSettings();
        }
    }



    render() {
        return (
            <>
                <CookieConsent
                    location="bottom"
                    buttonClasses="pols-cookie-button"
                    buttonText={
                    <FormattedMessage id="pols.cookie.btn"/>
                    }
                    cookieName="polsCookie"
                    style={{ background: "#ffffff" }}
                    buttonStyle={{
                        color: "№199DDF"}}
                    expires={150}
                >
                    <FormattedMessage id="pols.cookie.text1"/>
                    <span className="cursor-pointer pols-cookie-link" onClick={() => openFile(PrivacyFile)}>
                    <FormattedMessage onClick={() => window.open("/facebook.com")} id="pols.cookie.text2" values={{link: "/facebook.com"}} />
                    </span>
                </CookieConsent>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/test" render={(props) => LoadingWithSuspense(Test, props)} />
                        <Route exact path="/login/:token?" render={(props) => LoadingWithSuspense(Login, props)} />
                        <Route exact path="/404" render={(props) => LoadingWithSuspense(PageNotFound, props)} />
                        <Route exact path="/signup" render={(props) => LoadingWithSuspense(Signup, props)} />
                        <Route exact path="/" render={(props) => LoadingWithSuspense(Home, props)} />
                        <Route exact path="/faq" render={(props) => LoadingWithSuspense(FAQ, props)} />
                        <Route exact path="/profile" render={(props) => LoadingWithSuspense(Profile, props)} />
                        <Route exact path="/users/email/confirm/:token" render={(props) => LoadingWithSuspense(ConfirmEmail, props)} />
                        <Route exact path="/contacts" render={(props) => LoadingWithSuspense(Contacts, props)} />
                        <Route exact path="/rules" render={(props) => LoadingWithSuspense(Rules, props)} />
                        <Route exact path="/rules" render={(props) => LoadingWithSuspense(Rules, props)} />
                        <Route exact path="/reset/password/request" render={(props) => LoadingWithSuspense(PasswordResetRequest, props)} />
                        <Route exact path="/reset/password/new/:token" render={(props) => LoadingWithSuspense(PasswordReset, props)} />
                        <PrivateRoute exact path="/profile/welcome" render={(props) => LoadingWithSuspense(ProfileStep1, props)}
                                      exactRole={config.userRoles['user']} />
                        <PrivateRoute exact path="/profile/edit" render={(props) => LoadingWithSuspense(ProfileEdit, props)}
                                      exactRole={config.userRoles['user']} />
                        <Route exact path="/register/code" render={(props) => LoadingWithSuspense(RegisterCode, props)}
                               exactRole={config.userRoles['user']} />
                        <PrivateRoute exact path="/password/change" render={(props) => LoadingWithSuspense(PasswordChange, props)}
                                      exactRole={config.userRoles['user']} />
                        <PrivateRoute exact path="/profile/codes" render={(props) => LoadingWithSuspense(ProfileCodes, props)}
                                      exactRole={config.userRoles['user']} />
                        <PrivateRoute exact path="/request/prize" render={(props) => LoadingWithSuspense(RequestPrize, props)}
                                      exactRole={config.userRoles['user']} />
                        <Route render={(props) => LoadingWithSuspense(PageNotFound, props)} />
                    </Switch>
                </Router>
            </>
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
