import React, { useState } from 'react';
import { authActions, userActions } from '../../_actions'
import { connect } from 'react-redux';
import config from '../../config';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form, Text } from '../../components/';
import * as Yup from 'yup';
import { postRequest, store } from '../../_library';
import loginPageStyle from './LoginPageStyle.module.scss';
import  {Col, Container, Row } from 'reactstrap';
import { ToyReview } from '../../components/ToyReview';
import {NavBar} from '../../components/NavBar';


const Login = props => {

    const [errorMessage,setErrorMessage] = useState('');

    const intl = useIntl();

    const validationSchema = Yup.object().shape({
        password: Yup.string()
          .min(2, intl.formatMessage({id:'pols.login.validation.password_min'}))
          .max(70, intl.formatMessage({id:'pols.login.validation.password_max'}))
          .required(intl.formatMessage({id:'pols.login.validation.password_required'})),
        email: Yup.string()
          .email(intl.formatMessage({id:'pols.login.validation.email_invalid'}))
          .required(intl.formatMessage({id:'pols.login.validation.email_required'})),
      });

    const onSubmit = value => postRequest('/login', value).then(response => {
        localStorage.setItem(config.accessTokenName, response.accessToken);
        props.login('/profile/welcome');
    }).catch(error => {
         error.error ? setErrorMessage(<FormattedMessage id={`pols.login.error.${error.error}`}/>)  : setErrorMessage(<FormattedMessage id="pols.login.error.something"/>);
     }) 

    return(
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col md={6}>
                        <ToyReview />
                    </Col>
                    <Col md={6}>
                        <Text left h1 label="pols.login.title" />
                        {errorMessage && <Text error className={loginPageStyle.errorMessage}>{errorMessage}</Text>}
                        <Form initialValues={{email: '', password: ''}}
                              inputFields={[{name:'email', type:'email', label:intl.formatMessage({id:'pols.login.email'})},
                                            {name:'password', type:'password', label:intl.formatMessage({id:'pols.login.password'})}]}
                              handleSubmit={value => onSubmit(value)}
                              validationSchema={validationSchema}
                              buttonText={<FormattedMessage id="pols.login.btn.submit"/>}
                        />
                    </Col>
                </Row>
            </Container>
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
