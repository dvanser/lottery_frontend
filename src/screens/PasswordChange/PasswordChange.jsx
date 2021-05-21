import React, { useEffect, useState } from 'react';
import passwordChangePageStyle from './PasswordChangeStyle.module.scss';
import { Row, Col, Alert, Container } from 'reactstrap';
import { Text, Form } from '../../components';
import { history, postRequest } from '../../_library';
import * as Yup from 'yup';
import { FormattedMessage, useIntl } from 'react-intl';


export const PasswordChange = props => {

    const intl = useIntl();

    const [error, setError] = useState('');
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordError = intl.formatMessage({ 'id': 'pols.profile.validation.wrong_password' });

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .matches(passwordRegex, passwordError)
            .required(<FormattedMessage id={'pols.profile.validation.current_password_required'}/>),
        newPassword: Yup.string().matches(passwordRegex, passwordError)
            .max(32, <FormattedMessage id="pols.common.validation.password_max_length" />)
            .required(<FormattedMessage id={'pols.profile.validation.password_required'}/>).test(
                "match", <FormattedMessage id={'pols.profile.validation.new_password_equal_to_old'}/>,
                function () {
                    return this.parent.password !== this.parent.newPassword;
                }
            ),
        passwordRepeat: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], <FormattedMessage
                id={'pols.profile.validation.password_dont_much'}/>)
            .required(<FormattedMessage id={'pols.profile.validation.password_retype_required'}/>)
    })

    const handleSubmit = (values, actions) => {

        setError('');
        postRequest(`/users/password/change`, {
            password: values.password,
            newPassword: values.newPassword,
        }).then(() => {
                actions.resetForm();
            }).catch(response => {
                actions.setSubmitting(false);
                setError(response.error);
        });
    };

    return(
        <div>
            <Container className="pt-3">
                <Text left caps h1 label="pols.password_change.title" className="mt-5" />
                <Row>
                    <Col xs={12} lg={12} className="text-center">
                        {error && error === 'wrong_data_supplied' &&
                            <>
                                <Text className="mt-4" label="pols.password_change.error.wrong_data_supplied" />
                            </>
                        }
                        {error && error === 'previously_used_password' &&
                            <>
                                <Text className="mt-4" label="pols.password_change.error.previously_used_password"/>
                            </>
                        }
                        <Form initValues={{password: '', passwordRepeat: ''}}
                              validationSchema={validationSchema}
                              inputFields={
                                  [
                                      {name: 'password', type: 'password', label: 'pols.profile.placeholder.password'},
                                      {name: 'newPassword', type: 'password',
                                          label: 'pols.profile.placeholder.newPassword', hide: true},
                                      {name: 'passwordRepeat', type: 'password',
                                          label: 'pols.profile.placeholder.passwordRepeat', hide: true}
                                  ]
                              }
                              handleSubmit={handleSubmit}
                              formButton="pols.password_change.btn.change"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
