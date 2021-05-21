import React, { useEffect } from 'react';
import { Text, Button} from '../../components';
import { Col, Container, Row } from 'reactstrap';
import { history } from '../../_library';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import config from '../../config';


const ProfileCodes = props => {

    useEffect(() => {

    }, []);

    return (
        <Container>
            <Row>
                <Col md={6}></Col>
                <Col md={6}>
                    <Text left primary caps h1 label="pols.profile_codes.title" className="mt-3 ml-2" />
                    <Text>{props.user.codesCount}</Text>
                    {props.user.codesCount >= config.codesRequiredForPrize.small && props.user.codesCount < config.codesRequiredForPrize.medium &&
                        <Text label="pols.profile_codes.text_small_prize" />
                    }
                    {props.user.codesCount >= config.codesRequiredForPrize.medium && props.user.codesCount < config.codesRequiredForPrize.big &&
                        <Text label="pols.profile_codes.text_medium_prize" />
                    }
                    {props.user.codesCount >= config.codesRequiredForPrize.big &&
                        <Text label="pols.profile_codes.text_big_prize" />
                    }
                    <Button onClick={() => history.push('/profile/register/code')} >
                        <Text label="pols.profile_codes.btn.continue" />
                    </Button>
                    {props.user.codesCount >= config.codesRequiredForPrize.small &&
                        <Button onClick={() => history.push('/profile/request')}>
                            <Text label="pols.profile.btn.request"/>
                        </Button>
                    }
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

const connectedProfileCodes = connect(mapStateToProps)(ProfileCodes);
export {connectedProfileCodes as ProfileCodes};