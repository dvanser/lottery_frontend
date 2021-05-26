import React, { useState } from 'react';
import { authActions, userActions } from '../../_actions'
import { connect } from 'react-redux';
import config from '../../config';
import { FormattedMessage, useIntl } from 'react-intl';
import {Footer, Form, Text} from '../../components/';
import * as Yup from 'yup';
import { postRequest, history } from '../../_library';
import loginPageStyle from './LoginPageStyle.module.scss';
import { Col, Row } from 'reactstrap';
import { ToyReview } from '../../components/ToyReview';
import {NavBar} from '../../components/NavBar';
import styles from "./LoginPageStyle.module.scss";


const Login = props => {

    const [errorMessage,setErrorMessage] = useState('');

    const intl = useIntl();

    const validationSchema = Yup.object().shape({
        password: Yup.string()
          .min(8, intl.formatMessage({id:'pols.login.validation.password_min'}))
          .max(70, intl.formatMessage({id:'pols.login.validation.password_max'}))
          .required(intl.formatMessage({id:'pols.login.validation.password_required'})),
        email: Yup.string()
          .email(intl.formatMessage({id:'pols.login.validation.email_invalid'}))
          .required(intl.formatMessage({id:'pols.login.validation.email_required'})),
      });

    const onSubmit = value => postRequest('/login', value).then(response => {
        localStorage.setItem(config.accessTokenName, response.accessToken);
        props.login('/profile/welcome');
    }).catch(response => {
        response.error ? setErrorMessage(<FormattedMessage id={`pols.login.error.${response.error}`}/>)  : setErrorMessage(<FormattedMessage id="pols.login.error.something"/>);
     });

    return(
        <>
            <NavBar/>
            <div className={styles.wrapper}>
                <Row>
                    <Col md={{size:6, order: 1}} xs={{size:12, order: 2}}  className="pr-md-5">
                        <ToyReview />
                    </Col>
                    <Col md={{size:6, order: 2}} xs={{size:12, order: 1}} className="mb-5">
                        <Text left h1 label="pols.login.title" />
                        {errorMessage && <Text error className={loginPageStyle.errorMessage}>{errorMessage}</Text>}
                        <Form initialValues={{email: '', password: ''}}
                              inputFields={[{name:'email', type:'email', label:intl.formatMessage({id:'pols.login.email'})},
                                            {name:'password', type:'password', label:intl.formatMessage({id:'pols.login.password'})}]}
                              handleSubmit={value => onSubmit(value)}
                              validationSchema={validationSchema}
                              buttonText={<FormattedMessage id="pols.login.btn.submit"/>}
                              formFooter={
                                <Text small className="mt-3 cursor-pointer" label="pols.login.reset_password" onClick={() => history.push("/reset/password/request")}/>
                              }
                        />
                    </Col>
                </Row>
            </div>
            <Footer background="blue" />
        </>
    );
};


function mapStateToProps(state) {

    return {
    };
}

function mapDispatchToProps(dispatch) {
    return({
        login: (email) => {
            dispatch(authActions.login(email))
        }
    })
}

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export { connectedLogin as Login };
