import React, { useEffect } from 'react';
import {Text, Button, Footer} from '../../components';
import { Col, Container, Row } from 'reactstrap';
import {history, postRequest} from '../../_library';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {NavBar} from "../../components/NavBar";
import {ToyReview} from "../../components/ToyReview";
import styles from "./ProfilePageStyle.module.scss";
import {authActions, userActions} from "../../_actions";


const ProfileStep1 = props => {

    return (
        <>
            <NavBar/>
            <div className={styles.wrapper}>
                <Row>
                    <Col md={{size:6, order: 1}} xs={{size:12, order: 2}}  className="pr-md-5">
                        <ToyReview />
                    </Col>
                    <Col md={{size:6, order: 2}} xs={{size:12, order: 1}} className="mb-5">
                        <Text left h1 label="pols.profile.title" />
                        <Text><FormattedMessage id={'pols.profile.welcome'} values={{name: props.user.name}}/></Text>
                        <Text><FormattedMessage id={'pols.profile.code_count'} values={{count: props.user.sticksCount}}/></Text>
                        <Button className="mt-5" onClick={() => history.push('/register/code')} >
                            <Text label="pols.profile.btn.register_codes" />
                        </Button>
                        <Button blue className="mt-2 mb-2" onClick={() => history.push('/profile/edit')}>
                            <Text label="pols.profile.btn.edit" />
                        </Button>
                        <Text center cursorPointer underline onClick={props.logout} label="pols.profile.btn.logout" />
                    </Col>
                </Row>
            </div>
            <Footer background="whiteWave" />
        </>
    );
};

function mapStateToProps(state) {

    const { user } = state;

    return {
        user
    };
}


function mapDispatchToProps(dispatch) {
    return({
        logout: () => {
            dispatch(authActions.logout())
        },
        loadSettings: () => {
            dispatch(userActions.loadSettings())
        }
    })
}

const connectedProfileStep1 = connect(mapStateToProps, mapDispatchToProps)(ProfileStep1);
export {connectedProfileStep1 as ProfileStep1};