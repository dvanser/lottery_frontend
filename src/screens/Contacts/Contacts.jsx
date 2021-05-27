import React from 'react';
import { Footer, Text } from '../../components';
import { Col, Row } from 'reactstrap';
import { NavBar } from '../../components/NavBar';
import { ToyReview } from '../../components/ToyReview';
import styles from "./ContactsStyle.module.scss";


export const Contacts = () => {

    return (
        <>
            <NavBar/>
            <div className={styles.wrapper}>
                <Row>
                    <Col md={{size:6, order: 1}} xs={{size:12, order: 2}}  className="pr-md-5">
                        <ToyReview />
                    </Col>
                    <Col md={{size:6, order: 2}} xs={{size:12, order: 1}} className="mb-5">
                        <Text className="mb-3" left h1 label="pols.contacts.title" />
                        <Text small className="mb-2" left label="pols.contacts.company" />
                        <Text small className="mb-2" left label="pols.contacts.address" />
                        <Text small className="mb-2" left label="pols.contacts.phone" />
                        <Text small className="mb-2" left label="pols.contacts.email" />
                        <Text small className="mb-2" left label="pols.contacts.time" />
                    </Col>
                </Row>
            </div>
            <Footer background="whiteWave" />
        </>
    );
};
