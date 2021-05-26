import React, { useEffect, useState } from 'react';
import './index.scss';
import { Row, Col } from 'reactstrap';
import {Text, Button, Form, Link, NavBar, Footer} from '../../components';
import { history, postRequest } from '../../_library';
import * as Yup from 'yup';
import { FormattedMessage, useIntl } from 'react-intl';
import styles from "../Contacts/ContactsStyle.module.scss";
import {ToyReview} from "../../components/ToyReview";


export const PasswordReset = props => {
        
    if (props.match === undefined || props.match.params === undefined || props.match.params.token === undefined) {
        history.push('/404');
    }

    const intl = useIntl();

    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [tokenValidationError, setTokenValidationError] = useState('');
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordError = intl.formatMessage({ 'id': 'pols.signup.validation.invalid_password' });

    const validationSchema = Yup.object().shape(
        {
            password: Yup.string()
                .matches(passwordRegex, passwordError)
                .required(<FormattedMessage id={'pols.profile.validation.current_password_required'}/>),
            passwordRepeat: Yup.string().matches(passwordRegex, passwordError)
                .max(32, <FormattedMessage id="pols.signup.validation.password_max_length" />)
                .required(<FormattedMessage id={'pols.signup.validation.password_required'}/>).test(
                    "match", <FormattedMessage id={'pols.profile.validation.new_password_equal_to_old'}/>,
                    function () {
                        return this.parent.password !== this.parent.newPassword;
                    }
                ),
        }
    );

    const handleSubmit = (values, actions) => {

        setError('');
        postRequest(`/users/password/reset`, {
            password: values.password,
            token: props.match.params.token
        })
            .then(() => {
                actions.resetForm();
                setStep(2);
            }).catch(response => {
                actions.setSubmitting(false);
                setError(response.error);
        });
    };

    useEffect(() => {

        postRequest(`/users/password/reset/validate`,
            {token:  props.match.params.token})
            .then(() => {
            }).catch(response => {
                if (response.error) {
                    setTokenValidationError(response.error);
                }
            });
    }, []);

    return(
        <>
            <NavBar/>
            <div className={styles.wrapper}>
                <Row>
                    <Col md={{size:6, order: 1}} xs={{size:12, order: 2}}  className="pr-md-5">
                        <ToyReview />
                    </Col>
                    <Col md={{size:6, order: 2}} xs={{size:12, order: 1}} className="mb-5">
                        <Text className="mb-3" left h1 label="pols.reset_password.title" />
                        {tokenValidationError === '' &&
                            <>
                                {error && error === 'wrong_data_supplied' &&
                                    <>
                                        <Text error className="mt-4" label="pols.error.wrong_data_supplied" />
                                    </>
                                }
                                {error && error === 'token_expired' &&
                                    <>
                                        <Text className="mt-4" label="pols.error.token_expired" />
                                        <Link to="/reset/password/request"
                                              label="pols.login.reset_password" />
                                    </>
                                }
                                {error && error === 'previously_used_password' &&
                                    <>
                                        <Text error className="mt-4" label="pols.error.previously_used_password"/>
                                    </>
                                }
                                {step === 1 &&
                                    <>
                                        <Form initialValues={{password: '', passwordRepeat: ''}}
                                              validationSchema={validationSchema}
                                              inputFields={
                                                  [
                                                      {name: 'password', type: 'password',
                                                          label: 'pols.profile.new_password', autoComplete: 'nope'},
                                                      {name: 'passwordRepeat', type: 'password',
                                                          label: 'pols.profile.password_repeat', autoComplete: 'nope'}
                                                  ]
                                              }
                                              handleSubmit={handleSubmit}
                                              buttonText={<FormattedMessage id="pols.password_reset.btn.reset"/>}
                                        />
                                    </>
                                }
                                {step === 2 &&
                                    <>
                                        <Text label="pols.password_reset.success.title"/>
                                        <Button className="mt-5" onClick={() => history.push('/login')}>
                                            <Text label="pols.profile.login" />
                                        </Button>
                                    </>
                                }
                            </>
                        }
                        {tokenValidationError && tokenValidationError === 'token_not_valid' &&
                            <>
                                <Text error label="pols.password_reset.not_valid_token" />
                                <Button label="pols.password_reset.reset_password_link" className="mt-5" onClick={() => history.push('/reset/password/request')}>
                                    <Text label="pols.password_reset.reset_password_link" />
                                </Button>
                            </>
                        }
                        {tokenValidationError && tokenValidationError === 'wrong_data_supplied' &&
                            <>
                                <Text error label="pols.password_reset.wrong_data" />
                                <Button label="pols.password_reset.reset_password_link" className="mt-5" onClick={() => history.push('/reset/password/request')}>
                                    <Text label="pols.password_reset.reset_password_link" />
                                </Button>
                            </>
                        }
                        </Col>
                    </Row>
            </div>
            <Footer background="blue" />
        </>
    );
};
