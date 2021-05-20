import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
} from 'reactstrap';
import { ReactComponent as PolsLogo } from '../../assets/PolsLogo.svg'
import { Link } from '../';
import { authActions } from '../../_actions';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div class='bg-white'>
        <div class='inline-flex'>
        <Navbar fixed="top" expand="md">
            <div class='pl-32 pr-96 flex-1 inline-block align-middle'>
            <Link className="navbar-brand" to="/">
                <PolsLogo />
            </Link>
            </div>
            <div class='inline-block pl-14 flex-1 inline-block align-middle' >
               <Link className="navbar-brand" to="/BUJ">
                <div class='NavBarText'><FormattedMessage id='pols.navbar.maq'/></div>
            </Link> 
            </div>
            <div class='inline-block pl-14 flex-1 inline-block align-middle' >
               <Link className="navbar-brand" to="/rules">
                <div class='NavBarText'><FormattedMessage id='pols.navbar.rules'/></div>
            </Link> 
            </div>
            <div class='inline-block pl-14 flex-1 inline-block align-middle' >
               <Link className="navbar-brand" to="/profile">
                <div class='NavBarText'><FormattedMessage id='pols.navbar.myProfile' /></div>
            </Link> 
            </div>
            <div class='inline-block pl-14 flex-1 inline-block align-middle' >
               <Link className="navbar-brand" to="/contacts">
                <div class='NavBarText'><FormattedMessage id='pols.navbar.contacts' /></div>
            </Link> 
            </div>
            
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav navbar>
                </Nav>
            </Collapse>
        </Navbar>
        </div>
        </div>
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
        }
    });
}


const connectedNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export { connectedNavBar as NavBar };