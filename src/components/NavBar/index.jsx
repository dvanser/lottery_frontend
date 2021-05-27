import React, {useMemo, useState} from 'react';
import { Collapse, Navbar, Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ReactComponent as PolsLogo } from '../../assets/PolsLogo.svg'
import { Link } from '../';
import {authActions, i18nActions} from '../../_actions';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import navBarStyle from './NavBarStyles.module.scss'
import config from '../../config';
import { ReactComponent as InstagramIcon } from '../../assets/instagram.svg'
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg'
import { ReactComponent as NavIcon } from '../../assets/nav.svg'
import { ReactComponent as CloseNavIcon } from '../../assets/close.svg'


const NavBar = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const toggleLangDropdown = () => setLangDropdownOpen(!langDropdownOpen);

    const toggle = () => setIsOpen(!isOpen);

    const renderLangItem = (lang) => (
        <span>
            {lang === props.lang ? <h4>{lang.toUpperCase()}</h4> : <>{lang.toUpperCase()}</>}
        </span>
    );

    const renderLangs = (inNavbar = false) => (
        <Dropdown inNavbar={inNavbar} isOpen={langDropdownOpen} toggle={toggleLangDropdown} className={navBarStyle.langDropdown}>
            <DropdownToggle caret tag="div" className={navBarStyle.langDropdownBtn}>
                {props.i18n.lang.toUpperCase()}
            </DropdownToggle>
            <DropdownMenu className={navBarStyle.langDropdownMenu}>
                {config.supportedLangs.map((lang, idx) => {

                        if (props.i18n.lang === lang) {
                            return null;
                        }

                        return (
                            <DropdownItem key={idx} className={navBarStyle.langDropdownItem + ' ' +
                            (config.supportedLangs.length === 2 || idx === 0 ? navBarStyle.langDropdownItemFirst : '') + ' ' +
                            (config.supportedLangs.length === 2 || config.supportedLangs.length === idx + 1 ? navBarStyle.langDropdownItemLast : '')}
                                onClick={() => props.changeLanguage(lang)}
                            >
                                {renderLangItem(lang)}
                            </DropdownItem>
                        );
                    }
                )}
            </DropdownMenu>
        </Dropdown>
    );

    return (
        <>
        <div className={navBarStyle.wrapper}>
            <Link className={'navbar-brand d-inline-block ' + navBarStyle.navBarLogo} to="/">
                <PolsLogo />
            </Link>
            <div className={'flex-grow-1 align-self-start ' + navBarStyle.navBar}>
                <div className="d-none d-xl-inline-block w-100">
                    <div className="d-flex w-100">
                        <div className={'flex-grow-1 ' + navBarStyle.navBarMenu }>
                            <Link className={'navbar-brand ' + navBarStyle.navBarItem + ' ' + navBarStyle.navBarItemMarginNoMargin} to="/faq">
                                <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.maq'/></div>
                            </Link>
                            <Link className={'navbar-brand ' + navBarStyle.navBarItem + ' ' + navBarStyle.navBarItemMargin} to="/rules">
                                <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.rules'/></div>
                            </Link>
                            <Link className={'navbar-brand ' + navBarStyle.navBarItem + ' ' + navBarStyle.navBarItemMargin} to="/profile">
                                <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.myProfile' /></div>
                            </Link>
                            <Link className={'navbar-brand ' + navBarStyle.navBarItem + ' ' + navBarStyle.navBarItemMargin} to="/contacts">
                                <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.contacts' /></div>
                            </Link>
                        </div>
                        <span className="ml-4 d-none d-xl-inline-block">
                            {renderLangs(true)}
                        </span>
                        <a href="https://instagram.com/polssaldejums" target="_blank"><InstagramIcon className={navBarStyle.icon +  ' '  + navBarStyle.iconInst} /></a>
                        <a href="https://lv-lv.facebook.com/PolsIceCream" target="_blank"><FacebookIcon className={navBarStyle.icon + ' '  + navBarStyle.iconFb} /></a>
                    </div>
                </div>
            </div>
            <span className={'d-inline-block d-xl-none ' + navBarStyle.langDropdownWrapper}>
                {renderLangs()}
            </span>
            {!isOpen &&
                <NavIcon className={'d-inline-block d-xl-none ' + navBarStyle.navBarToggleIcon} onClick={toggle} />
            }
            {isOpen &&
                <div className={'d-inline-block d-xl-none ' + navBarStyle.navBarToggleIconOpenWrapper}>
                    <CloseNavIcon className={'d-inline-block d-xl-none ' + navBarStyle.navBarToggleIcon + ' ' +
                    navBarStyle.navBarToggleIconOpen} onClick={toggle} />
                </div>
            }
        </div>
        {isOpen &&
            <div className={'d-block d-xl-none ' + navBarStyle.mobileNav}>
                <div className={navBarStyle.mobileNavNoBorderBlock} />
                <div className={'align-items-center justify-content-center w-100 ' + navBarStyle.mobileNavContent}>
                    <div className="text-center">
                        <Link
                            className={'navbar-brand ' + navBarStyle.navBarItem + ' ' + navBarStyle.navBarItemMarginNoMargin}
                            to="/faq">
                            <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.maq'/></div>
                        </Link>
                        <Link className={'navbar-brand ' + navBarStyle.navBarItem + ' ' + navBarStyle.navBarItemMarginMobile}
                              to="/rules">
                            <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.rules'/></div>
                        </Link>
                        <Link className={'navbar-brand ' + navBarStyle.navBarItem + ' ' + navBarStyle.navBarItemMarginMobile}
                              to="/profile">
                            <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.myProfile'/>
                            </div>
                        </Link>
                        <Link className={'navbar-brand ' + navBarStyle.navBarItem + ' ' + navBarStyle.navBarItemMarginMobile}
                              to="/contacts">
                            <div className={navBarStyle['navBarText']}><FormattedMessage id='pols.navbar.contacts'/>
                            </div>
                        </Link>
                    </div>
                    <span className={navBarStyle.mobileNavIconsBlock}>
                        <a href="https://instagram.com/polssaldejums" target="_blank"><InstagramIcon className={navBarStyle.icon +  ' '  + navBarStyle.iconInst}/></a>
                        <a href="https://lv-lv.facebook.com/PolsIceCream" target="_blank"><FacebookIcon className={navBarStyle.icon + ' '  + navBarStyle.iconFb}/></a>
                    </span>
                </div>
            </div>
        }
        </>
    );
};

function mapStateToProps(state) {
    const { user, i18n } = state;
    return {
        user,
        i18n
    };
}

function mapDispatchToProps(dispatch) {

    return({
        logout: () => {
            dispatch(authActions.logout())
        },
        changeLanguage: lang => {
            dispatch(i18nActions.changeLanguage(lang))
        }
    });
}


const connectedNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export { connectedNavBar as NavBar };
