import React from 'react';
import  SmallToy  from '../../assets/smallToy.png'
import  MediumToy  from '../../assets/mediumToy.png'
import  BigToy  from '../../assets/bigToy.png'
import toyReviewStyle from './ToyReview.module.scss'
import { connect } from 'react-redux';
import {Text} from "../Text";
import { Row, Col } from "reactstrap";
import SmallToyImg  from '../../assets/small_toy.png'
import MediumToyImg  from '../../assets/medium_toy.png'
import ToysImg  from '../../assets/toys.png'


const ToyReview = props => {

    return (
        // <>
        //     <Text left h1 label="pols.toy.title" />
        //     <Text left className="mt-3" label="pols.toy.text" />
        //     <div className={"mt-5 " + toyReviewStyle['wrapper']}>
        //         <Row>
        //             <Col>
        //                 <div className={toyReviewStyle['smallSticks']}><div className={toyReviewStyle['PolsBold']}>{props.prize.small.sticksNeeded} <FormattedMessage id='pols.toy.kocini' /></div><div className={toyReviewStyle['PolsBody']} ><FormattedMessage id='pols.small.description' /></div></div>
        //                 <div className={toyReviewStyle['bigCounter']}><div className={toyReviewStyle['ToyCounterLeft']}><FormattedMessage id='pols.toy.left' /><div className={toyReviewStyle['ToyCounter']} >{props.prize.big.prizesCount}</div></div></div>
        //                 <div className={toyReviewStyle['smallToy']}>
        //                     {/*<img className={toyReviewStyle['smallToyImg']} src={SmallToy} alt='' />*/}
        //                 </div>
        //             </Col>
        //             <Col>
        //                 <div className={toyReviewStyle['mediumSticks']}><div className={toyReviewStyle['PolsBold']}>{props.prize.medium.sticksNeeded} <FormattedMessage id='pols.toy.kocini' /></div><div className={toyReviewStyle['PolsBody']} ><FormattedMessage id='pols.medium.description' /></div></div>
        //                 <div className={toyReviewStyle['mediumToy']}>
        //                     <img className={toyReviewStyle['hidden']} src={MediumToy} alt='' />
        //                 </div>
        //                 <img className={toyReviewStyle['mediumToyImg']} src={MediumToy} alt='' />
        //                 <div className={toyReviewStyle['mediumCounter']}><div className={toyReviewStyle['ToyCounterLeft']}><FormattedMessage id='pols.toy.left' /><div className={toyReviewStyle['ToyCounter']} >{props.prize.medium.prizesCount}</div></div></div>
        //             </Col>
        //         </Row>
        //         <Row>
        //             <Col>
        //                 <div className={toyReviewStyle['bigSticks']}><div className={toyReviewStyle['PolsBold']}>{props.prize.big.sticksNeeded} <FormattedMessage id='pols.toy.kocini' /></div><div className={toyReviewStyle['PolsBody']} ><FormattedMessage id='pols.big.description' /></div></div>
        //                 <div className={toyReviewStyle['bigToy']}>
        //                     <img className={toyReviewStyle['invisible']} src={BigToy} alt='' />
        //                 </div>
        //                 <img className={toyReviewStyle['bigToyImg']} src={BigToy} alt='' />
        //                 <div className={toyReviewStyle['smallCounter']}><div className={toyReviewStyle['ToyCounterLeft']}><FormattedMessage id='pols.toy.left' /><div className={toyReviewStyle['ToyCounter']} >{props.prize.small.prizesCount}</div></div></div>
        //             </Col>
        //         </Row>
        //     </div>
        // </>
        // <>
        //     <Row>
        //         <Col>
        //             <div className={toyReviewStyle['wrapper']}>
        //                 <div className={toyReviewStyle['smallToy']}>
        //                     <div className={toyReviewStyle['topText']}>
        //                         {props.prize.small.prizesCount} <Text id='pols.toy.sticks' />
        //                         <Text center id='pols.toy.name.small' />
        //                     </div>
        //                     <div className={toyReviewStyle['rightBottomText']}>
        //                         <Text left id='pols.toy.left' />
        //                         {props.prize.small.prizesCount}
        //                     </div>
        //                 </div>
        //             </div>
        //         </Col>
        //         <Col></Col>
        //     </Row>
        //     <Row>
        //         <Col>
        //
        //         </Col>
        //     </Row>
        // </>

    <div className="mb-5">
        <Text left h1 label="pols.toy.title" />
        <Text left className="mt-3" label="pols.toy.text" />
        <div className="mt-4 mb-5">
            {props.button &&
                <>
                    {props.button}
                </>
            }
        </div>

        {/*<Row>*/}
        {/*    <Col xs={6} className={toyReviewStyle.smallToyWrapper}>*/}
        {/*        <img src={SmallToyImg} />*/}
        {/*    </Col>*/}
        {/*    <Col xs={6} className={toyReviewStyle.mediumToyWrapper}>*/}
        {/*        <img src={MediumToyImg} />*/}
        {/*    </Col>*/}
        {/*</Row>*/}

        {/*<Row className={toyReviewStyle.toysWrapper}>*/}
        {/*    <Col>*/}
        {/*        ss*/}
        {/*    </Col>*/}
        {/*    <Col>*/}
        {/*        s*/}
        {/*    </Col>*/}
        {/*</Row>*/}

        {/*<div className={toyReviewStyle.toysWrapper}>*/}
        {/*    <img src={ToysImg} />*/}
        {/*    <div className={toyReviewStyle.smallToyTopText}>*/}
        {/*        <Text small>{props.prize.small.sticksNeeded} <Text label='pols.toy.sticks' /></Text>*/}
        {/*        <Text center  className={toyReviewStyle.extraSmallText} label='pols.small.description' />*/}
        {/*    </div>*/}
        {/*    <div className={toyReviewStyle.smallToyAmount}>*/}
        {/*        <Text left label='pols.toy.left' />*/}
        {/*        {props.prize.small.prizesCount}*/}
        {/*    </div>*/}
        {/*</div>*/}

        {/*<div></div>*/}
        <Row>
            <Col xs={6} className={toyReviewStyle['wrapper']}>
                <img className={toyReviewStyle['smallToyImg']} src={SmallToy} />
                <div className={toyReviewStyle['smallToyTopText']}>
                    <Text small className={toyReviewStyle.amountText}>{props.prize.small.sticksNeeded} <Text label='pols.toy.sticks' /></Text>
                    <Text center  className={toyReviewStyle['extraSmallText']} label='pols.small.description' />
                </div>
                <div className={toyReviewStyle.rightSmallBottomText + ' ' + toyReviewStyle.smallToyRightSmallBottomText}>
                    <Text left label='pols.toy.left' />
                    {props.prize.small.prizesCount}
                </div>
            </Col>
            <Col xs={6}>
                <div>
                <img  className={toyReviewStyle['mediumToyImg']} src={MediumToy} />
                </div>
                <div className={toyReviewStyle['mediumToyTopText']}>
                    <Text small className={toyReviewStyle.amountText}>{props.prize.medium.sticksNeeded} <Text label='pols.toy.sticks' /></Text>
                    <Text center  className={toyReviewStyle['extraSmallText']} label='pols.medium.description' />
                </div>
                <div className={toyReviewStyle.rightSmallBottomText + ' ' + toyReviewStyle.mediumToyRightSmallBottomText}>
                    <Text left label='pols.toy.left' />
                    {props.prize.medium.prizesCount}
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <img  className={toyReviewStyle['bigToyImg']} src={BigToy} />
                <div className={toyReviewStyle['bigToyTopText']}>
                    <Text small className={toyReviewStyle.amountText}>{props.prize.big.sticksNeeded} <Text label='pols.toy.sticks' /></Text>
                    <Text center  className={toyReviewStyle['extraSmallText']} label='pols.medium.description' />
                </div>
                <div className={toyReviewStyle.rightBigBottomText + ' ' + toyReviewStyle.bigToyRightSmallBottomText}>
                    <Text left label='pols.toy.left' />
                    {props.prize.big.prizesCount}
                </div>
            </Col>
        </Row>
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
