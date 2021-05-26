import React, { useEffect, useState } from 'react';
import { history, postRequest } from '../../_library';
import {Button, Footer, Text} from '../../components';
import config from '../../config';
import { authActions } from '../../_actions';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
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
                        <Text className="mb-2" left label="pols.contacts.company" />
                        <Text className="mb-2" left label="pols.contacts.address" />
                        <Text className="mb-2" left label="pols.contacts.phone" />
                        <Text className="mb-2" left label="pols.contacts.email" />
                        <Text className="mb-2" left label="pols.contacts.time" />
                    </Col>
                </Row>
            </div>
            <Footer background="blue" />
        </>
    );
};
