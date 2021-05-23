import React from 'react';
import { i18nActions } from '../../_actions'
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import { ToyReview } from '../../components/ToyReview';
import config from '../../config';
import HomePageStyle from './HomePageStyle.module.scss'
import { Button, Text } from '../../components';
import headerIceCream from '../../assets/headerIceCream.svg'
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
import { Sticks } from '../../components/Sticks';
import { Row, Col } from 'reactstrap';


export const Home = () => {

    const intl = useIntl();

    return (
        <>
        <NavBar className={HomePageStyle['navBar']}/>
        <div className={HomePageStyle['wrapper']}>
            <Row>
                <Col xs={5}>
                    <Text h3 className={HomePageStyle['h3']}>Kod salčukam, sakrāj lāčukam</Text>
                </Col>
            </Row>
            <Text h4 className={HomePageStyle['h4']}>Krāj Pols saldējuma kociņus, reģistrējies pols.lv un apmaini tos pret lieliskām balvām! </Text>
            <Button className={HomePageStyle['registerBtn']}>
                <Text label="pols.register.button" />
            </Button>
            <div className={HomePageStyle['toyReview']}>
                <ToyReview />
            </div>
            <div className={HomePageStyle['steps']}>
            <div className={HomePageStyle['step1']} >
                <div className={HomePageStyle['stepNo']}>1</div> 
                <div className={HomePageStyle['stepDesc']}>Krāj pols saldējuma kociņus, saglabājot čeku</div>
            </div>
            <div className={HomePageStyle['step2']} >
                <Sticks />
                <div className={HomePageStyle['stepNo']}>2</div> 
                <div className={HomePageStyle['stepDesc']}>Reģistrējies pols.lv</div>
            </div>
            <div className={HomePageStyle['step3']} >
                <div className={HomePageStyle['stepNo']}>3</div> 
                <div className={HomePageStyle['stepDesc']}>Reģistrē kociņus un apmaini tos pret balvām</div>
            </div>
            </div>


            <div className={HomePageStyle['products']}>
                <div className={HomePageStyle['productsHeader']}>Produkti, kas piedalās loterijā</div>
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
            </div>
            {/* Block with all images with absolute position */}
            <img src={headerIceCream} alt='Ice Cream' className={HomePageStyle['headerIceCream']} />
            <img src={footerWhiteArea} alt='footerWhiteArea' className={HomePageStyle['footerWhiteArea']} />
         </div>
    </>
    );
}
