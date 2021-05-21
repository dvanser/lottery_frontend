import React, { useEffect } from 'react';
import { Text, Button} from '../../components';
import { Col, Container, Row } from 'reactstrap';
import { history } from '../../_library';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


const ProfileStep1 = props => {

    useEffect(() => {

    }, []);

    return (
        <Container>
            <Row>
                <Col md={6}></Col>
                <Col md={6}>
                    <Text left primary caps h1 label="pols.profile.title" className="mt-3 ml-2" />
                    <Text><FormattedMessage id={'pols.profile.welcome'} values={{name: props.user.name}}/></Text>
                    <Text><FormattedMessage id={'pols.profile.code_count'} values={{count: props.user.codesCount}}/></Text>
                    <Button onClick={() => history.push('/register/code')} >
                        <Text label="pols.profile.btn.register_codes" />
                    </Button>
                    <Button onClick={() => history.push('/profile/edit')}>
                        <Text label="pols.profile.btn.edit" />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

function mapStateToProps(state) {

    const { user } = state.authentication;

    return {
        user
    };
}

const connectedProfileStep1 = connect(mapStateToProps)(ProfileStep1);
export {connectedProfileStep1 as ProfileStep1};