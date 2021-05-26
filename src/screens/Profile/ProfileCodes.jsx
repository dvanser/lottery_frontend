import React, { useEffect } from 'react';
import {Text, Button, Footer} from '../../components';
import { Col, Container, Row } from 'reactstrap';
import { history } from '../../_library';
import { connect } from 'react-redux';
import config from '../../config';
import { NavBar } from '../../components/NavBar';
import { ToyReview } from '../../components/ToyReview';
import profileCodesStyle from './ProfileCodesStyle.module.scss';
import styles from "./ProfilePageStyle.module.scss";


const ProfileCodes = props => {

    if (!props.user.synchronized) return;

    return (
        <>
            <NavBar/>
            <div className={styles.wrapper}>
                <Row>
                    <Col md={{size:6, order: 1}} xs={{size:12, order: 2}}  className="pr-md-5">
                        <ToyReview />
                    </Col>
                    <Col md={{size:6, order: 2}} xs={{size:12, order: 1}} className="mb-5">
                        <Text left h1 label="pols.profile_codes.title" />
                        <div className={profileCodesStyle['codesCountContainers'] + " mt-2 w-100 text-center"}>
                            <Text huge>{props.user.sticksCount}</Text>
                        </div>
                        {props.user.sticksCount >= config.codesRequiredForPrize.small && props.user.sticksCount < config.codesRequiredForPrize.medium &&
                            <Text center className="mt-2" small label="pols.profile_codes.text_small_prize" />
                        }
                        {props.user.sticksCount >= config.codesRequiredForPrize.medium && props.user.sticksCount < config.codesRequiredForPrize.big &&
                            <Text center className="mt-2" small label="pols.profile_codes.text_medium_prize" />
                        }
                        {props.user.sticksCount >= config.codesRequiredForPrize.big &&
                            <Text center className="mt-2" small label="pols.profile_codes.text_big_prize" />
                        }
                        <Button className="mt-3" small onClick={() => history.push('/register/code')} >
                            <Text label="pols.profile_codes.btn.continue" />
                        </Button>
                        {props.user.sticksCount >= config.codesRequiredForPrize.small &&
                            <Button blue className="mt-2" onClick={() => history.push('/request/prize')}>
                                <Text label="pols.profile.btn.request"/>
                            </Button>
                        }
                        <Text cursorPointer className="mt-2" center underline onClick={() => {history.push('/profile/edit')}} label="pols.profile.btn.edit" />
                    </Col>
                </Row>
            </div>
            <Footer background="blue" />
        </>
    );
};

function mapStateToProps(state) {

    const { user } = state;

    return {
        user
    };
}

const connectedProfileCodes = connect(mapStateToProps)(ProfileCodes);
export {connectedProfileCodes as ProfileCodes};