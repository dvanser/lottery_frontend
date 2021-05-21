import React, { useEffect } from 'react';
import { Text, Button} from '../../components';
import { Col, Container, Row } from 'reactstrap';
import { history } from '../../_library';


export const ProfileStep0 = props => {

    useEffect(() => {

    }, []);

    return (
        <Container>
            <Text left primary caps h1 label="pols.profile.title" className="mt-3 ml-2" />
            <Row>
                <Col md={6}></Col>
                <Col md={6}>
                    <Button onClick={() => history.push('/login')}><Text label="pols.profile.login" /> </Button>
                    <Button onClick={() => history.push('/signup')} white><Text label="pols.profile.signup" /> </Button>
                </Col>
            </Row>
        </Container>
    );
};
