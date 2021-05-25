import React, { useState } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Text, Form } from '../../components';
import { history, postRequest } from '../../_library';
import * as Yup from 'yup';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavBar } from '../../components/NavBar';
import { ToyReview } from '../../components/ToyReview';


export const PasswordChange = props => {

    const intl = useIntl();

    const [error, setError] = useState('');
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordError = intl.formatMessage({ 'id': 'pols.signup.validation.invalid_password' });

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .matches(passwordRegex, passwordError)
            .required(<FormattedMessage id={'pols.profile.validation.current_password_required'}/>),
        newPassword: Yup.string().matches(passwordRegex, passwordError)
            .max(32, <FormattedMessage id="pols.signup.validation.password_max_length" />)
            .required(<FormattedMessage id={'pols.signup.validation.password_required'}/>).test(
                "match", <FormattedMessage id={'pols.profile.validation.new_password_equal_to_old'}/>,
                function () {
                    return this.parent.password !== this.parent.newPassword;
                }
            ),
        passwordRepeat: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], <FormattedMessage
                id={'pols.signup.validation.passwords_dont_match'}/>)
            .required(<FormattedMessage id={'pols.signup.validation.password_retype_required'}/>)
    })

    const handleSubmit = (values, actions) => {

        setError('');
        postRequest(`/users/password/change`, {
            password: values.password,
            newPassword: values.newPassword,
        }).then(() => {
                actions.resetForm();
                history.push('/profile/codes');
            }).catch(response => {
                actions.setSubmitting(false);
                setError(response.error);
        });
    };

    return(
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col md={6}>
                        <ToyReview />
                    </Col>
                    <Col md={6}>
                        <Text left h1 label="pols.password_change.title" />
                        {error && error === 'wrong_data_supplied' &&
                            <>
                                <Text error small label="pols.password_change.error.wrong_data_supplied" />
                            </>
                        }
                        {error && error === 'previously_used_password' &&
                            <>
                                <Text error small className="mt-4" label="pols.password_change.error.previously_used_password"/>
                            </>
                        }
                        {error && error === 'incorrect_password' &&
                            <>
                                <Text error small className="mt-4" label="pols.password_change.error.incorrect_password"/>
                            </>
                        }
                        <Form initialValues={{password: '', passwordRepeat: ''}}
                              validationSchema={validationSchema}
                              inputFields={
                                  [
                                      {name: 'password', type: 'password', label: 'pols.profile.password'},
                                      {name: 'newPassword', type: 'password',
                                          label: 'pols.profile.new_password', hide: true},
                                      {name: 'passwordRepeat', type: 'password',
                                          label: 'pols.profile.password_repeat', hide: true}
                                  ]
                              }
                              handleSubmit={handleSubmit}
                              buttonText={<FormattedMessage id="pols.password_change.btn.change"/>}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
