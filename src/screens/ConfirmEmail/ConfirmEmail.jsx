import React, { useEffect, useState } from 'react';
import { history, postRequest } from '../../_library';
import {Button, Footer, Text} from '../../components';
import config from '../../config';
import { authActions } from '../../_actions';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { NavBar } from '../../components/NavBar';
import { ToyReview } from '../../components/ToyReview';
import styles from "./ConfirmEmailStyle.module.scss";


const ConfirmEmail = props => {

    if (props.match === undefined || props.match.params === undefined || props.match.params.token === undefined) {
        history.push('/404');
    }

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {

        setIsSubmitting(true);

        postRequest('/users/email/confirm', {token: props.match.params.token})
            .then(data => {
                localStorage.setItem(config.accessTokenName, data.accessToken);
                setIsSubmitting(false);
                setSuccess(true);
            }).catch(response => {
            setIsSubmitting(false);
            setError(response.error);
        });
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
                        <Text left  h1 label="pols.profile.title" />
                        {isSubmitting &&
                            <Text left label="pols.loading" />
                        }
                        {!isSubmitting && success &&
                            <>
                                <Text left h2 label="pols.confirm_email.success" className="mt-5"/>
                                <Button className="mt-5" onClick={() => history.push('/register/code')}><Text label="pols.profile.register_code" /> </Button>
                            </>
                        }
                        {!isSubmitting && error &&
                            <>
                                <Text left h2 error label="pols.confirm_email.title_error" className="mt-5"/>
                                <Button className="mt-5" onClick={() => history.push('/signup')}><Text label="pols.profile.signup" /> </Button>
                            </>
                        }
                    </Col>
                </Row>
            </div>
            <Footer background="whiteWave" />
        </>

    );
};

function mapDispatchToProps(dispatch) {
    return({
        login: () => {
            dispatch(authActions.login(''))
        }
    })
}

const connectedConfirmEmail = connect(null, mapDispatchToProps)(ConfirmEmail);
export { connectedConfirmEmail as ConfirmEmail };
