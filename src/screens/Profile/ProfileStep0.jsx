import React, { useEffect } from 'react';
import { Text, Button} from '../../components';
import { Col, Container, Row } from 'reactstrap';
import { history } from '../../_library';
import {ToyReview} from "../../components/ToyReview";
import {NavBar} from "../../components/NavBar";


export const ProfileStep0 = props => {

    useEffect(() => {

    }, []);

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col md={6}><ToyReview /></Col>
                    <Col md={6}>
                        <Text left  h1 label="pols.profile.title" />
                        <Button onClick={() => history.push('/login')}><Text label="pols.profile.login" /> </Button>
                        <Button blue className="mt-3" onClick={() => history.push('/signup')}><Text label="pols.profile.signup" /> </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
