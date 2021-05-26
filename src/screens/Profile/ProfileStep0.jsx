import React, { useEffect } from 'react';
import {Text, Button, Footer} from '../../components';
import { Col, Container, Row } from 'reactstrap';
import { history } from '../../_library';
import {ToyReview} from "../../components/ToyReview";
import {NavBar} from "../../components/NavBar";
import styles from "./ProfilePageStyle.module.scss";


export const ProfileStep0 = props => {

    useEffect(() => {

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
                        <Button onClick={() => history.push('/login')}><Text label="pols.profile.login" /> </Button>
                        <Button blue className="mt-3" onClick={() => history.push('/signup')}><Text label="pols.profile.signup" /> </Button>
                    </Col>
                </Row>
            </div>
            <Footer background="whiteWave" />
        </>
    );
};
