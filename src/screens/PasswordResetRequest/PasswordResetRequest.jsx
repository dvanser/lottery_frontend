import React, { useState } from 'react';
import './index.scss';
import {Alert, Col, Container, Row} from 'reactstrap';
import {Text, Button, Form, NavBar, Footer} from '../../components';
import { history } from '../../_library';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { postRequest } from '../../_library';
import styles from "../Contacts/ContactsStyle.module.scss";
import {ToyReview} from "../../components/ToyReview";


export const PasswordResetRequest = props => {

    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const handleSubmit = (values, actions) => {

        setError('');
        postRequest(`/users/password/reset/request`, {email: values.email})
            .then(response => {
                actions.resetForm();
                setStep(2);
            }).catch(response => {
                actions.setSubmitting(false);
                if (response.error) {
                    setError(response.error);
                }
            });
    };

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
                        {step === 1 &&
                            <>
                                {error && error === 'email_not_confirmed' &&
                                    <Text error label="pols.password_reset_request.error.email_not_confirmed" />
                                }
                                {error && error === 'wrong_email' &&
                                    <Text error label="pols.password_reset_request.error.wrong_email" />
                                }
                                <Form initialValues={{email: ''}}
                                      validationSchema={
                                          Yup.object().shape({
                                              email: Yup.string()
                                                  .email(<FormattedMessage id="pols.signup.validation.invalid_email" />)
                                                  .max(255, <FormattedMessage id="pols.signup.validation.max_length_255" />)
                                                  .required(<FormattedMessage id="pols.signup.validation.email_required" />),
                                          })
                                      }
                                      inputFields={
                                          [{name: 'email', type: 'text', label: 'pols.signup.email', autoComplete: 'nope'}]
                                      }
                                      handleSubmit={handleSubmit}
                                      buttonText={<FormattedMessage id="pols.password_reset_request.btn.reset"/>}
                                />
                            </>
                        }
                        {step === 2 &&
                            <>
                                <Text left label="pols.password_reset_request.success"  />
                            </>
                        }
                    </Col>
                </Row>
            </div>
            <Footer background="blue" />
        </>
    );
}
