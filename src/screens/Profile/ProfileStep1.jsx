import React, { useEffect } from 'react';
import { Text, Button} from '../../components';
import { Col, Container, Row } from 'reactstrap';
import {history, postRequest} from '../../_library';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {NavBar} from "../../components/NavBar";
import {ToyReview} from "../../components/ToyReview";
import config from "../../config";


const ProfileStep1 = props => {

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col md={6}>
                        <ToyReview />
                    </Col>
                    <Col md={6}>
                        <Text left h1 label="pols.profile.title" />
                        <Text><FormattedMessage id={'pols.profile.welcome'} values={{name: props.user.name}}/></Text>
                        <Text><FormattedMessage id={'pols.profile.code_count'} values={{count: props.user.sticksCount}}/></Text>
                        <Button className="mt-5" onClick={() => history.push('/register/code')} >
                            <Text label="pols.profile.btn.register_codes" />
                        </Button>
                        <Button blue className="mt-2" onClick={() => history.push('/profile/edit')}>
                            <Text label="pols.profile.btn.edit" />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

function mapStateToProps(state) {

    const { user } = state;

    return {
        user
    };
}

const connectedProfileStep1 = connect(mapStateToProps)(ProfileStep1);
export {connectedProfileStep1 as ProfileStep1};