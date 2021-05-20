import React from 'react';
import { i18nActions } from '../../_actions'
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import { ToyReview } from '../../components/ToyReview';
import config from '../../config';

const Home = props => {
    const renderLangItem = (lang, reverse = false, onClick = false) => (
        <span {...(onClick ? {onClick} : undefined)}>
            {lang === props.lang ? <h4>{lang}</h4> : <>{lang}</>}
        </span>
    );

    const intl = useIntl();

    return (
        <BrowserRouter>
        <div class='bg-1AA0E1'>
          <NavBar />  
        <div class ='absolute top-6 right-12'>
            {config.supportedLangs.map((lang, idx) =>
                <div key={idx}>
                    {renderLangItem(lang, true, () => props.changeLanguage(lang))}
                </div>
                )
            }
        </div>
            <div class='absolute left-32 top-720 z-10'>
                <ToyReview />
            </div>
         </div>
        </BrowserRouter>
    );
}

function mapStateToProps(state) {

    const { lang } = state.i18n;

    return {
        lang
    };
}

function mapDispatchToProps(dispatch) {
    return({
        changeLanguage: lang => {
            dispatch(i18nActions.changeLanguage(lang))
        }
    })
}
const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export { connectedHome as Home };