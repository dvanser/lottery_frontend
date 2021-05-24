import React from 'react';
import  SmallToy  from '../../assets/smallToy.svg'
import  MediumToy  from '../../assets/mediumToy.svg'
import  BigToy  from '../../assets/bigToy.svg'
import { FormattedMessage } from 'react-intl';
import toyReviewStyle from './ToyReview.module.scss'
import { connect } from 'react-redux';


const ToyReview = props => {

    return (
        <div className={toyReviewStyle['wrapper']}>
            {/*Toys Descriptions */}
            <div className={toyReviewStyle['smallSticks']}><div className={toyReviewStyle['PolsBold']}><FormattedMessage id='pols.small.kocini' /></div><div className={toyReviewStyle['PolsBody']} ><FormattedMessage id='pols.small.description' /></div></div>
            <div className={toyReviewStyle['mediumSticks']}><div className={toyReviewStyle['PolsBold']}><FormattedMessage id='pols.medium.kocini' /></div><div className={toyReviewStyle['PolsBody']} ><FormattedMessage id='pols.medium.description' /></div></div>
            <div className={toyReviewStyle['bigSticks']}><div className={toyReviewStyle['PolsBold']}><FormattedMessage id='pols.big.kocini' /></div><div className={toyReviewStyle['PolsBody']} ><FormattedMessage id='pols.big.description' /></div></div>

            {/* Toys Counter info */}
            <div className={toyReviewStyle['bigCounter']}><div className={toyReviewStyle['ToyCounterLeft']}><FormattedMessage id='pols.toy.left' /><div className={toyReviewStyle['ToyCounter']} >{props.prize.big.prizesCount}</div></div></div>
            <div className={toyReviewStyle['mediumCounter']}><div className={toyReviewStyle['ToyCounterLeft']}><FormattedMessage id='pols.toy.left' /><div className={toyReviewStyle['ToyCounter']} >{props.prize.medium.prizesCount}</div></div></div>
            <div className={toyReviewStyle['smallCounter']}><div className={toyReviewStyle['ToyCounterLeft']}><FormattedMessage id='pols.toy.left' /><div className={toyReviewStyle['ToyCounter']} >{props.prize.small.prizesCount}</div></div></div>

            {/*Toys images and borders */}
            <div className={toyReviewStyle['smallToy']}><img className={toyReviewStyle['hidden']} src={SmallToy} alt='' /></div><img className={toyReviewStyle['smallToyImg']} src={SmallToy} alt='' />
            <div className={toyReviewStyle['mediumToy']}><img className={toyReviewStyle['hidden']} src={MediumToy} alt='' /></div><img className={toyReviewStyle['mediumToyImg']} src={MediumToy} alt='' />
            <div className={toyReviewStyle['bigToy']}><img className={toyReviewStyle['invisible']} src={BigToy} alt='' /></div><img className={toyReviewStyle['bigToyImg']} src={BigToy} alt='' />
        </div>
    );
}

function mapStateToProps(state) {

    const { prize } = state;

    return {
        prize
    };
}

const connectedToyReview = connect(mapStateToProps)(ToyReview);
export {connectedToyReview as ToyReview};
