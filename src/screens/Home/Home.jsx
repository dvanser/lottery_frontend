import React from 'react';
import {authActions, i18nActions, userActions} from '../../_actions'
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import { ToyReview } from '../../components/ToyReview';
import config from '../../config';
import HomePageStyle from './HomePageStyle.module.scss'
import {Button, Footer, Text} from '../../components';
// import headerIceCream from '../../assets/headerIceCream.svg'
import headerIceCream from '../../assets/header_ice_cream.png'
import splitHomeScreen from '../../assets/splitHomeScreen.svg'
import footerWhiteArea from '../../assets/footerWhiteArea.svg'
// import polsClassic from '../../assets/polsClassic.svg'
// import polsChoco from '../../assets/polsChoco.svg'
// import polsGlazura from '../../assets/polsGlazura.svg'
// import polsCips from '../../assets/polsCips.svg'
// import polsRaspberry from '../../assets/polsRaspberry.svg'
// import polsBlackcurrants from '../../assets/polsBlackcurrants.svg'
// import polsMango from '../../assets/polsMango.svg'
// import polsPopcorn from '../../assets/polsPopcorn.svg'




import polsPlumju from '../../assets/pols_plumju.png';
import polsDzervene from '../../assets/pols_dzervene.png';
import polsDonut from '../../assets/pols_donut.png';
import polsCookie from '../../assets/pols_cookie.png';
import polsClassic from '../../assets/pols_classic.png';
import polsChocolate from '../../assets/pols_chocolate.png';
import polsChocolateMobile from '../../assets/pols_chocolate_mobile.png';
import polsUpenu from '../../assets/pols_upenu.png';
import polsAvenu from '../../assets/pols_avenu.png';
import polsAvenuMobile from '../../assets/pols_avenu_mobile.png';
import polsCrisps from '../../assets/pols_crisps.png';
import polsCrispsRu from '../../assets/pols_crisps_ru.png';
import polsCrispsMobile from '../../assets/pols_crisps_mobile.png';
import polsCrispsMobileRu from '../../assets/pols_crisps_mobile_ru.png';
import polsMango from '../../assets/pols_mango.png';
import polsMangoRu from '../../assets/pols_mango_ru.png';
import polsMangoMobile from '../../assets/pols_mango_mobile.png';
import polsMangoMobileRu from '../../assets/pols_mango_mobile_ru.png';
import polsPopcornMobile from '../../assets/pols_popcorn_mobile.png';
import polsPopcorn from '../../assets/pols_popcorn.png';
import polsPopcornMobileRu from '../../assets/pols_popcorn_mobile_ru.png';
import polsPopcornRu from '../../assets/pols_popcorn_ru.png';
import polsPlombirs from '../../assets/pols_plombirs.png';
import polsMorozhko from '../../assets/morozhko.png';
import polsMorozhkoMobile from '../../assets/morozhko_mobile.png';
import vasras50 from '../../assets/50vasaras.png';

import { Sticks } from '../../components/Sticks';
import { Row, Col } from 'reactstrap';
import { history } from '../../_library';


const Home = props => {

    const intl = useIntl();

    return (
        <>
            <NavBar className={HomePageStyle['navBar']}/>
            <img src={headerIceCream} alt='Ice Cream' className={HomePageStyle['headerIceCream']} />
            <div className={HomePageStyle['wrapper']}>
                <Row>
                    <Col lg={5}>
                        <ToyReview button={
                            <Button className={'d-inline-block d-lg-none ' + HomePageStyle['registerBtn'] + ' ' +
                            HomePageStyle.registerBtnMobile}
                                    onClick={() => history.push('/profile')}>
                                <Text label="pols.register.button" />
                            </Button>
                        } />
                    </Col>
                    <Col lg={{ size: 7 }} className={'d-none d-lg-inline-block ' + HomePageStyle.registreCodeBtn}>
                        <Button className={HomePageStyle['registerBtn']} onClick={() => history.push('/profile')}>
                            <Text label="pols.register.button" />
                        </Button>
                    </Col>
                </Row>
            </div>


            <Row noGutters={true} className={HomePageStyle.stepsBlock}>
                <Col lg={6}>
                    <div className={HomePageStyle['step1']} >
                        <div className={'d-flex align-items-center justify-content-center ' + HomePageStyle['stepNo']}>1</div>
                        <div className={HomePageStyle['stepDesc']}><Text label="pols.home.steps.1" /></div>
                    </div>
                    <div className={HomePageStyle['step2']} >
                        <div className={'d-flex align-items-center justify-content-center ' + HomePageStyle['stepNo']}>2</div>
                        <div className={HomePageStyle['stepDesc']}><Text label="pols.home.steps.2" /></div>
                    </div>
                    <div className={HomePageStyle['step3']} >
                        <div className={'d-flex align-items-center justify-content-center ' + HomePageStyle['stepNo']}>3</div>
                        <div className={HomePageStyle['stepDesc']}><Text label="pols.home.steps.3" /></div>
                    </div>
                </Col>
                <Col lg={6}>
                    <Sticks />
                </Col>
            </Row>
            <div className="position-relative">
                <div className={HomePageStyle['products']}>
                    <div className={"mb-4 " + HomePageStyle['productsHeader']}>
                        <Text label="pols.home.products.title" />
                    </div>
                    {/*<div className={HomePageStyle['productsIMGs']}>*/}
                    <div className="position-relative w-100">
                        <Row>
                            <Col lg={3} className="text-center">
                                <img src={polsClassic} alt='polsClassic' className={HomePageStyle.lotteryProdClassic} />
                            </Col>
                            <Col lg={3} className="text-center">
                                <img src={polsChocolate} alt='polsChocolate' className={'d-none d-lg-block ml-1 ' + HomePageStyle.lotteryProdChocolate} />
                                <img src={polsChocolateMobile} alt='polsChocolate' className={'d-block d-lg-none ' + HomePageStyle.lotteryProdChocolate} />
                            </Col>
                            <Col lg={3} className="text-center">
                                <img src={polsPlombirs} alt='polsPlombirs' className={HomePageStyle.lotteryProdPlombirs} />
                            </Col>
                            <Col lg={3}>
                                {props.i18n.lang === 'lv' &&
                                    <>
                                        <img src={polsCrisps} alt='polsCrisps' className={'d-none d-lg-block ' + HomePageStyle.lotteryProdCrisps} />
                                        <img src={polsCrispsMobile} alt='polsCrisps' className={'d-block d-lg-none ' + HomePageStyle.lotteryProdCrisps} />
                                    </>

                                }
                                {props.i18n.lang === 'ru' &&
                                    <>
                                        <img src={polsCrispsRu} alt='polsCrisps' className={'d-none d-lg-block ' + HomePageStyle.lotteryProdCrisps} />
                                        <img src={polsCrispsMobileRu} alt='polsCrisps' className={'d-block d-lg-none ' + HomePageStyle.lotteryProdCrisps} />
                                    </>
                                }
                            </Col>
                        </Row>
                        <Row className={HomePageStyle.lotteryProdSecondRow}>
                            <Col lg={3} className={'d-block d-lg-none'}>
                                {props.i18n.lang === 'lv' &&
                                    <img src={polsPopcornMobile} alt='polsPopcorn' className={'d-block d-lg-none ' + HomePageStyle.lotteryProdPopcorn} />
                                }
                                {props.i18n.lang === 'ru' &&
                                    <img src={polsPopcornMobileRu} alt='polsPopcorn' className={'d-block d-lg-none ' + HomePageStyle.lotteryProdPopcorn} />
                                }
                            </Col>
                            <Col lg={3} className="text-center">
                                <img src={polsAvenu} alt='polsAvenu' className={'d-none d-lg-block ' + HomePageStyle.lotteryProdAvenu} />
                                <img src={polsAvenuMobile} alt='polsAvenu' className={'d-block d-lg-none ' + HomePageStyle.lotteryProdAvenu} />
                            </Col>
                            <Col lg={3} className="text-center">
                                <img src={polsUpenu} alt='polsUpenu' className={HomePageStyle.lotteryProdUpenu} />
                            </Col>
                            <Col lg={3} className="text-center">
                                {props.i18n.lang === 'lv' &&
                                <>
                                    <img src={polsMango} alt='polsMango' className={'d-none d-lg-block ' + HomePageStyle.lotteryProdMango} />
                                    <img src={polsMangoMobile} alt='polsMango' className={'d-block d-lg-none ' + HomePageStyle.lotteryProdMango} />
                                </>

                                }
                                {props.i18n.lang === 'ru' &&
                                <>
                                    <img src={polsMangoRu} alt='polsMango' className={'d-none d-lg-block ' + HomePageStyle.lotteryProdMango} />
                                    <img src={polsMangoMobileRu} alt='polsMango' className={'d-block d-lg-none ' + HomePageStyle.lotteryProdMango} />
                                </>
                                }
                            </Col>
                            <Col lg={3} className={'d-none d-lg-block'}>
                                {props.i18n.lang === 'lv' &&
                                    <img src={polsPopcorn} alt='polsPopcorn' className={'d-none d-lg-block ' + HomePageStyle.lotteryProdPopcorn} />
                                }
                                {props.i18n.lang === 'ru' &&
                                    <img src={polsPopcornRu} alt='polsPopcorn' className={'d-none d-lg-block ' + HomePageStyle.lotteryProdPopcorn} />
                                }
                            </Col>
                        </Row>
                    </div>
                    <div className={'d-none d-lg-block ' + HomePageStyle.productsTextBlue}>
                        <img src={vasras50} />
                        {/*<div>#50vasaras</div>*/}
                    </div>
                    <div className={'d-none d-lg-block text-center ' + HomePageStyle.productsTextBlue + ' ' + HomePageStyle.otherNewProductsWrapper}>
                        <Text label="pols.home.other.title" />
                    </div>
                    <div className="d-none d-lg-block">
                        <div className="d-flex justify-content-center">
                            <div>
                                <img src={polsMorozhko} className={HomePageStyle.otherNewProductsImg} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'d-block d-lg-none ' + HomePageStyle.newProductsMobile}>
                <div className={HomePageStyle.productsTextBlue}>
                    <img src={vasras50} />
                    {/*<div>#50vasaras</div>*/}
                </div>
                <div className={'text-center ' + HomePageStyle.otherNewProductsWrapper + ' ' + HomePageStyle.productsTextBlue}>
                    <Text label="pols.home.other.title"/>
                </div>
                <div>
                    <div className="d-flex justify-content-center">
                        <div>
                            <img src={polsMorozhkoMobile} className={HomePageStyle.otherNewProductsImg} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={'d-none d-lg-block ' + HomePageStyle.footerWhiteAreaWrapper}>
                <img src={footerWhiteArea} alt='footerWhiteArea' className={HomePageStyle['footerWhiteArea']} />
            </div>
            <div className={HomePageStyle.footer}>
                <Footer background="white" />
            </div>
    </>
    );
}

function mapStateToProps(state) {

    const { i18n } = state;

    return {
        i18n
    };
}

const connectedHome = connect(mapStateToProps)(Home);
export {connectedHome as Home};
