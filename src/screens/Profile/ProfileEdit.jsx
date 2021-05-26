import React, { useEffect, useState } from 'react';
import {Text, Form, Button, Footer} from '../../components';
import { Col, Container, Row } from 'reactstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';
import { getRequest, patchRequest } from '../../_library';
import profilePageStyle from './ProfilePageStyle.module.scss';
import { history } from '../../_library';
import {NavBar} from "../../components/NavBar";
import {ToyReview} from "../../components/ToyReview";
import styles from "./ProfilePageStyle.module.scss";


export const ProfileEdit = props => {

    const intl = useIntl();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [initValues, setInitValues] = useState({name: '', surname: '', email: '', age: '', phone: ''});
    const inputFields = [
        {name: 'name', type: 'text', label: 'pols.signup.name'},
        {name: 'surname', type: 'text', label: 'pols.signup.surname'},
        {name: 'age', type: 'text', label: 'pols.signup.age'},
        {name: 'phone', type: 'text', label: 'pols.signup.phone'},
        {name: 'email', type: 'text', label: 'pols.signup.email', disabled: true},
    ];
    const validationSchema = Yup.object().shape({
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
            .min(18, <FormattedMessage id="pols.signup.validation.age_min" />)
            .max(120, <FormattedMessage id="pols.signup.validation.age_max" />)
            .typeError(<FormattedMessage id="pols.signup.validation.number" />),
    });

    const handleSubmit = (values, actions) => {
        setError('');
        setSuccess(false);

        const data = {
            name: values.name,
            surname: values.surname,
            age: values.age,
            phone: values.phone
        }

        patchRequest(`/users/profile`, data)
            .then(() => {
                actions.setSubmitting(false);
                setSuccess(true);
                history.push('/profile/codes');
            }).catch(response => {
            actions.setSubmitting(false);
            if (response.error) {
                setError(response.error);
            }
        });
    };

    useEffect(() => {
        getRequest('/users/profile')
            .then(data => {
                setInitValues(Object.assign({}, initValues, data));
            }).catch(() => {});
    }, []);

    return (
        <>
            <NavBar/>
            <div className={styles.wrapper}>
                <Row>
                    <Col md={{size:6, order: 1}} xs={{size:12, order: 2}}  className="pr-md-5">
                        <ToyReview />
                    </Col>
                    <Col md={{size:6, order: 2}} xs={{size:12, order: 1}} className="mb-5">
                        <Text left h1 label="pols.profile.title" />
                        {initValues.email !== '' &&
                            <Form
                                formEnableReinitialize={true}
                                initialValues={initValues}
                                validationSchema={validationSchema}
                                inputFields={inputFields}
                                handleSubmit={handleSubmit}
                                buttonText={<FormattedMessage id="pols.profile.btn.submit"/>}
                                formFooter={<Text small label="pols.signup.required_fields"/>}
                            />
                        }
                        <Button blue className="mt-3" onClick={() => history.push('/password/change')}>
                            <FormattedMessage id="pols.profile.btn.reset_password"/>
                        </Button>
                    </Col>
                </Row>
            </div>
            <Footer background="whiteWave" />
        </>
    );
};
