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
import navBarStyle from './NavBarStyles.module.scss'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={navBarStyle['wrapper']}>
        <div className={navBarStyle['navBarContainer']}>
        <Navbar fixed="top" expand="md">
            <div className={navBarStyle['navBarLogo']}>
            <Link className="navbar-brand" to="/">
                <PolsLogo />
            </Link>
            </div>
            <div className={navBarStyle['navBarItem']} >
               <Link className="navbar-brand" to="/BUJ">
                <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.maq'/></div>
            </Link> 
            </div>
            <div className={navBarStyle['navBarItem']} >
               <Link className="navbar-brand" to="/rules">
                <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.rules'/></div>
            </Link> 
            </div>
            <div className={navBarStyle['navBarItem']} >
               <Link className="navbar-brand" to="/profile">
                <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.myProfile' /></div>
            </Link> 
            </div>
            <div className={navBarStyle['navBarItem']} >
               <Link className="navbar-brand" to="/contacts">
                <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.contacts' /></div>
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