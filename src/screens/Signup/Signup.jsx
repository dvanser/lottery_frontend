import React, { useState } from 'react';
import { Alert, Col, Container, Row } from 'reactstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { postRequest } from '../../_library';
import { Form, Footer, Text, CheckBox } from '../../components';
import * as Yup from 'yup';
import { NavBar}  from '../../components/NavBar';
import { ToyReview } from '../../components/ToyReview';


export const Signup = props => {

    const intl = useIntl();
    const [error, setError] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [signedUp, setSignedUp] = useState(false);

    const initValues = {name: '', surname: '', email: '', password: '', age: '', phone: ''};

    const inputFields = [
        {name: 'name', type: 'text', label: 'pols.signup.name'},
        {name: 'surname', type: 'text', label: 'pols.signup.surname'},
        {name: 'age', type: 'text', label: 'pols.signup.age'},
        {name: 'phone', type: 'text', label: 'pols.signup.phone'},
        {name: 'email', type: 'text', label: 'pols.signup.email'},
        {name: 'password', type: 'password', label: 'pols.signup.password'},
        {name: 'repeatPassword', type: 'password', label: 'pols.signup.repeat_password'}
    ];

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(<FormattedMessage id="pols.signup.validation.invalid_email" />)
            .max(255, <FormattedMessage id="pols.signup.validation.max_length_255" />)
            .required(<FormattedMessage id="pols.signup.validation.email_required" />),
        name: Yup.string()
            .min(2, <FormattedMessage id={'pols.signup.validation.min_length_2'} />)
            .required(<FormattedMessage id={'pols.signup.validation.name_required'} />)
            .max(50, <FormattedMessage id="pols.signup.validation.max_length_50" />),
        surname: Yup.string()
            .min(2, <FormattedMessage id={'pols.signup.validation.min_length_2'} />)
            .required(<FormattedMessage id={'pols.signup.validation.surname_required'} />)
            .max(50, <FormattedMessage id="pols.signup.validation.max_length_50" />),
        phone: Yup.string()
            .required(<FormattedMessage id="pols.signup.validation.phone_required" />)
            .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                intl.formatMessage({'id': 'pols.signup.validation.phone_invalid'}))
            .max(50, <FormattedMessage id="pols.signup.validation.max_length_50" />),
        age: Yup.number()
            .required(<FormattedMessage
                id={'pols.signup.validation.age_required'}/>)
            .min(1, <FormattedMessage id="pols.signup.validation.age_min" />)
            .max(120, <FormattedMessage id="pols.signup.validation.age_max" />)
            .typeError(<FormattedMessage id="pols.signup.validation.number" />),
        password: Yup.string()
            .max(32, <FormattedMessage id="pols.signup.validation.password_max_length" />)
            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                intl.formatMessage({'id': 'pols.signup.validation.invalid_password'}))
            .required(<FormattedMessage id={ 'pols.signup.validation.password_required' } />),
        repeatPassword: Yup.string()
            .max(32, <FormattedMessage id="pols.signup.validation.password_max_length" />)
            .oneOf([Yup.ref('password'), null], <FormattedMessage id={ 'pols.signup.validation.passwords_dont_match' } />)
            .required(<FormattedMessage id={ 'pols.signup.validation.password_retype_required' } />)
    });

    const handleSubmit = (values, actions) => {

        if (!termsAccepted) {
            setError('terms_not_accepted');
            actions.setSubmitting(false);
            return;
        }

        setError('');

        postRequest(`/signup`, values)
            .then(() => {
                setSignedUp(true);
                actions.resetForm();
            }).catch(response => {
            actions.setSubmitting(false);
            if (response.error) {
                setError(response.error);
            }
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
                    <Col xs={6}>
                        {!signedUp &&
                            <>
                                <Text left h1 label="pols.signup.title" />
                                <Form
                                    formEnableReinitialize={true}
                                    initialValues={initValues}
                                    validationSchema={validationSchema}
                                    inputFields={inputFields}
                                    handleSubmit={handleSubmit}
                                    buttonText=<Text label="pols.signup.btn.signup" />
                                    nonFullWidthSubmitBtn={true}
                                    formFooter={
                                        <>
                                            <Text small label="pols.signup.required_fields"/>
                                            <div className="mt-3">
                                                <CheckBox text={<Text left small><FormattedMessage id="pols.singup.checkbox.terms" values={{link: '/terms'}} /></Text>}
                                                    onClickCheckboxOnly={true}
                                                    onChange={setTermsAccepted}
                                                />
                                                <div>
                                                    {error && error === 'terms_not_accepted' &&
                                                        <Text left small error label="pols.signup.error.accept_terms" />
                                                    }
                                                    {error && error === 'email_in_use' &&
                                                        <Text left small error label="pols.signup.error.email_in_use" />
                                                    }
                                                </div>
                                            </div>
                                        </>

                                     }
                                />
                            </>
                        }
                        {signedUp &&
                            <>
                                <Text left h1 label="pols.profile.title" />
                                <Text left label="pols.signup.success_text" />
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};
