import React, { useState } from 'react';
import { Alert, Col, Container, Row } from 'reactstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { postRequest } from '../../_library';
import { Form, Footer, Text, CheckBox, SocialLinks } from '../../components';
import * as Yup from 'yup';


export const Signup = props => {

    const intl = useIntl();
    const [error, setError] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const initValues = {name: '', surname: '', email: '', password: ''};

    const inputFields = [
        {name: 'email', type: 'text', label: 'pols.signup.email', placeholderWithoutLabel: 'epasts@epasts.lv', noTopMargin: true, autoComplete: 'nope'},
        {name: 'name', type: 'text', label: 'pols.signup.name', placeholder: 'pols.signup.placeholder.name', autoComplete: 'nope'},
        {name: 'surname', type: 'text', label: 'pols.signup.surname', placeholder: 'pols.signup.buyer_signup.placeholder.surname', autoComplete: 'nope'},
        {name: 'phone', type: 'text', label: 'pols.signup.phone', placeholder: 'pols.signup.placeholder.phone', autoComplete: 'nope'},
        {name: 'age', type: 'text', label: 'pols.signup.age', placeholder: 'pols.signup.placeholder.age', autoComplete: 'nope'},
        {name: 'password', type: 'password', label: 'pols.signup.password', placeholderWithoutLabel: '*********', autoComplete: 'nope'},
        {name: 'repeatPassword', type: 'password', label: 'pols.signup.repeat_password', placeholderWithoutLabel: '*********', autoComplete: 'nope'}
    ];

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(<FormattedMessage id="pols.common.validation.invalid_email" />)
            .max(255, <FormattedMessage id="pols.common.validation.max_length_255" />)
            .required(<FormattedMessage id="pols.signup.validation.email_required" />),
        name: Yup.string()
            .min(2, <FormattedMessage id={'pols.common.validation.min_length_2'} />)
            .required(<FormattedMessage id={'pols.signup.validation.name_required'} />)
            // .matches(/^[\p{L}- ]+$/u, intl.formatMessage({'id': 'pols.signup.validation.name'}))
            .max(50, <FormattedMessage id="pols.common.validation.max_length_50" />),
        surname: Yup.string()
            .min(2, <FormattedMessage id={'pols.common.validation.min_length_2'} />)
            .required(<FormattedMessage id={'pols.signup.validation.surname_required'} />)
            // .matches(/^[\p{L}- ]+$/u, intl.formatMessage({'id': 'pols.signup.validation.surname'}))
            .max(50, <FormattedMessage id="pols.common.validation.max_length_50" />),
        phone: Yup.string()
            .required(<FormattedMessage id="pols.validation.phone_required" />)
            .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                intl.formatMessage({'id': 'pols.validation.phone_invalid'}))
            .max(50, <FormattedMessage id="pols.signup.validation.phone_max" />),
        age: Yup.number()
            .required(<FormattedMessage
                id={'pols.validation.expected_investment_amount_required'}
                defaultMessage={'pols.validation.expected_investment_amount_required'}/>)
            .min(1, <FormattedMessage id="pols.validation.min_zero" />)
            .max(120, <FormattedMessage id="pols.validation.age.max" />)
            .typeError(<FormattedMessage id="pols.validation.number" />),
        password: Yup.string()
            .max(32, <FormattedMessage id="pols.signup.validation.password_max_length" />)
            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                intl.formatMessage({'id': 'pols.signup.validation.invalid_password'}))
            .required(<FormattedMessage id={ 'pols.signup.validation.password_required' } />),
        repeatPassword: Yup.string()
            .max(32, <FormattedMessage id="pols.common.validation.password_max_length" />)
            .oneOf([Yup.ref('password'), null], <FormattedMessage id={ 'pols.validation.passwords_dont_match' } />)
            .required(<FormattedMessage id={ 'pols.validation.password_retype_required' } />)
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
                actions.resetForm();
            }).catch(response => {
            actions.setSubmitting(false);
            if (response.error) {
                setError(response.error);
            }
        });
    };

    return(
        <Row>
            <Col xs={6}></Col>
            <Col xs={6}>
                <Text center h1 label="infir.signup.title" className="mt-2 mb-5" />
                <Form
                    formEnableReinitialize={true}
                    initValues={initValues}
                    validationSchema={validationSchema}
                    inputFields={inputFields}
                    handleSubmit={handleSubmit}
                    formButton="pols.signup.btn.signup"
                    nonFullWidthSubmitBtn={true}
                    formFooter={
                        <>
                            <CheckBox className="mt-3"
                                      text={<FormattedMessage id="pols.singup.checkbox.terms"  values={{link: '/terms'}} />}
                                      onClickCheckboxOnly={true}
                                      onChange={setTermsAccepted}
                            />
                            <div>
                                {error && error === 'terms_not_accepted' &&
                                    <Alert className="mt-4" color="danger">
                                        <Text label="pols.signup.error.accept_terms" />
                                    </Alert>
                                }
                            </div>
                        </>
                    }
                />
                <SocialLinks />
            </Col>
        </Row>
    );
};
