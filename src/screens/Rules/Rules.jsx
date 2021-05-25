import React, { useEffect, useState } from 'react';
import { history, postRequest } from '../../_library';
import {Button, Footer, Text} from '../../components';
import config from '../../config';
import { authActions } from '../../_actions';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { NavBar } from '../../components/NavBar';
import { ToyReview } from '../../components/ToyReview';


export const Rules = () => {

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col md={6}>
                        <ToyReview />
                    </Col>
                    <Col xs={6}>
                        <Text className="mb-3" left h1 label="pols.rules.title" />
                        <Text small className="mb-2" left label="pols.rules.1" />
                        <Text small className="mb-2" left label="pols.rules.2" />
                        <Text small className="mb-2" left label="pols.rules.3" />
                    </Col>
                </Row>
            </Container>
            <Footer background="blue" />
        </>
    );
};
