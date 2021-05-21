import React, { useEffect, useState } from 'react';
import { Text, Form, Button} from '../../components';
import { Col, Container, Row } from 'reactstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';
import { getRequest, patchRequest } from '../../_library';
import profilePageStyle from './ProfilePageStyle.module.scss';
import { history } from '../../_library';


export const ProfileEdit = props => {

    const intl = useIntl();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [initValues, setInitValues] = useState({name: '', surname: '', phone: '', email: ''});
    const [inputFields, setInputFields] = useState([
        {name: 'name', type: 'text', label: 'infir.profile.name', autoComplete: 'nope'},
        {name: 'surname', type: 'text', label: 'infir.profile.surname', autoComplete: 'nope'},
        {name: 'phone', type: 'text', label: 'infir.profile.phone', placeholder: 'infir.profile.placeholder.phone', autoComplete: 'nope'},
        {name: 'email', type: 'text', label: 'infir.profile.email', placeholder: 'infir.profile.placeholder.email', autoComplete: 'nope'}
    ]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, <FormattedMessage id={'infir.common.validation.min_length_2'} />)
            .required(<FormattedMessage id={'infir.profile.validation.name_required'} />)
            // .matches(/^[\p{L}- ]+$/u, intl.formatMessage({'id': 'infir.profile.validation.name'}))
            .max(50, <FormattedMessage id="infir.common.validation.max_length_50" />),
        surname: Yup.string()
            .min(2, <FormattedMessage id={'infir.common.validation.min_length_2'} />)
            .required(<FormattedMessage id={'infir.profile.validation.surname_required'} />)
            // .matches(/^[\p{L}- ]+$/u, intl.formatMessage({'id': 'infir.profile.validation.surname'}))
            .max(50, <FormattedMessage id="infir.common.validation.max_length_50" />),
        phone: Yup.string()
            .required(<FormattedMessage id="infir.profile.validation.phone_required" />)
            .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                intl.formatMessage({'id': 'infir.profile.validation.phone_invalid'}))
    });

    const handleSubmit = (values, actions) => {
        setError('');
        setSuccess(false);

        patchRequest(`/users/profile`, values)
            .then(() => {
                actions.setSubmitting(false);
                setSuccess(true);
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
        <Container>
            <Text left primary caps h1 label="pols.profile.title" className="mt-3 ml-2" />
            <Row>
                <Col md={6}>
                    <Form
                        formEnableReinitialize={true}
                        initialValues={initValues}
                        validationSchema={validationSchema}
                        inputFields={inputFields}
                        handleSubmit={handleSubmit}
                        buttonText={<FormattedMessage id="pols.profile.btn.submit"/>}
                        formFooter={
                            <Button className="mt-3" label="pols.profile.btn.reset_password" onClick={() => history.push('/reset/password')} />
                        }
                    />
                </Col>
            </Row>
        </Container>
    );
};
