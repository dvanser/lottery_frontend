import React from 'react';
import { i18nActions } from '../../_actions'
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
import polsClassic from '../../assets/polsClassic.svg'
import polsChoco from '../../assets/polsChoco.svg'
import polsGlazura from '../../assets/polsGlazura.svg'
import polsCips from '../../assets/polsCips.svg'
import polsRaspberry from '../../assets/polsRaspberry.svg'
import polsBlackcurrants from '../../assets/polsBlackcurrants.svg'
import polsMango from '../../assets/polsMango.svg'
import polsPopcorn from '../../assets/polsPopcorn.svg'
import polsPlumju from '../../assets/pols_plumju.png'
import polsDzervene from '../../assets/pols_dzervene.png'
import polsDonut from '../../assets/pols_donut.png'
import polsCookie from '../../assets/pols_cookie.png'

import { Sticks } from '../../components/Sticks';
import { Row, Col } from 'reactstrap';
import { history } from '../../_library';


export const Home = () => {

    const intl = useIntl();

    return (
        <>
            <NavBar className={HomePageStyle['navBar']}/>
            <img src={headerIceCream} alt='Ice Cream' className={HomePageStyle['headerIceCream']} />
            <div className={HomePageStyle['wrapper']}>
                <Row>
                    <Col lg={4}>
                        <ToyReview button={
                            <Button className={'d-inline-block d-xl-none ' + HomePageStyle['registerBtn'] + ' ' +
                            HomePageStyle.registerBtnMobile}
                                    onClick={() => history.push('/profile')}>
                                <Text label="pols.register.button" />
                            </Button>
                        } />
                    </Col>
                    <Col lg={{ size: 8 }} className={'d-none d-xl-inline-block ' + HomePageStyle.registreCodeBtn}>
                        <Button className={HomePageStyle['registerBtn']} onClick={() => history.push('/profile')}>
                            <Text label="pols.register.button" />
                        </Button>
                    </Col>
                </Row>
            </div>


            <Row className={HomePageStyle.stepsBlock}>
                <Col md={6}>
                    <div className={HomePageStyle['step1']} >
                        <div className={'d-flex align-items-center justify-content-center ' + HomePageStyle['stepNo']}>1</div>
                        <div className={HomePageStyle['stepDesc']}>Krāj pols saldējuma<br/>kociņus, saglabājot čeku</div>
                    </div>
                    <div className={HomePageStyle['step2']} >
                        <div className={'d-flex align-items-center justify-content-center ' + HomePageStyle['stepNo']}>2</div>
                        <div className={HomePageStyle['stepDesc']}>Reģistrējies pols.lv</div>
                    </div>
                    <div className={HomePageStyle['step3']} >
                        <div className={'d-flex align-items-center justify-content-center ' + HomePageStyle['stepNo']}>3</div>
                        <div className={HomePageStyle['stepDesc']}>Reģistrē kociņus un<br/>apmaini tos pret balvām</div>
                    </div>
                </Col>
                <Col md={6}>
                    <Sticks />
                </Col>
            </Row>
            <div className="position-relative">
                <div className={HomePageStyle['products']}>
                    <div className={"mb-4 " + HomePageStyle['productsHeader']}>Produkti, kas piedalās loterijā</div>
                    <div className={HomePageStyle['productsIMGs']}>
                        <div>
                            <img src={polsClassic} alt='polsClassic' className={HomePageStyle['lotteryProd']} />
                            <img src={polsChoco} alt='polsChoco' className={HomePageStyle['lotteryProd']} />
                        </div>
                        <div>
                            <img src={polsGlazura} alt='polsGlazura' className={HomePageStyle['lotteryProd']} />
                            <img src={polsCips} alt='polsCips' className={HomePageStyle['lotteryProd']} />
                        </div>
                        <div>
                            <img src={polsRaspberry} alt='polsRaspberry' className={HomePageStyle['lotteryProd']} />
                            <img src={polsBlackcurrants} alt='polsBlackcurrants' className={HomePageStyle['lotteryProd']} />
                        </div>
                        <div>
                            <img src={polsMango} alt='polsMango' className={HomePageStyle['lotteryProd']} />
                            <img src={polsPopcorn} alt='polsPopcorn' className={HomePageStyle['lotteryProd']} />
                       </div>
                    </div>
                    <div className={HomePageStyle.productsTextBlue}>
                        <Text>#50vasaras</Text>
                    </div>
                    <div className={'text-center ' + HomePageStyle.productsTextBlue + ' ' + HomePageStyle.otherNewProductsWrapper}>
                        <Text>Pagaršo arī citus Pols jaunumus!</Text>
                    </div>
                    <div>
                        <div className="d-flex justify-content-center">
                            <div>
                                <img src={polsDzervene} className={HomePageStyle.otherNewProductsImg} />
                            </div>
                            <div className="d-flex flex-column">
                                <img src={polsCookie} className={HomePageStyle.otherNewProductsImg} />
                                <img src={polsDonut} className={HomePageStyle.otherNewProductsImg} />
                            </div>
                            <div>
                                <img src={polsPlumju} className={HomePageStyle.otherNewProductsImg} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={HomePageStyle.footerWhiteAreaWrapper}>
                <img src={footerWhiteArea} alt='footerWhiteArea' className={HomePageStyle['footerWhiteArea']} />
            </div>
            <div className={HomePageStyle.footer}>
                <Footer background="white" />
            </div>
    </>
    );
}
