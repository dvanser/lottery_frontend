import React from 'react';
import { connect } from 'react-redux';
import { ProfileStep0 } from './ProfileStep0';
import { ProfileStep1 } from './ProfileStep1';


const Profile = props => {
    return (
        <>
            {props.user === undefined && !localStorage.getItem(config.accessTokenName)  && <ProfileStep0 />}
            {props.user !== undefined && localStorage.getItem(config.accessTokenName)  && <ProfileStep1 />}
        </>
    );
};

function mapStateToProps(state) {

    const { user } = state.authentication;

    return {
        user
    };
}

const connectedProfile = connect(mapStateToProps)(Profile);
export {connectedProfile as Profile};