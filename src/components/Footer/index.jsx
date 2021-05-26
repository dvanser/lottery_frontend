import React from 'react';
import { Text } from '../Text';
import { Row, Col } from 'reactstrap';
import FooterStyles from './FooterStyles.module.scss'
import PrivacyFile from '../../privacy.pdf'


export const Footer = props => {

    const openFile = (file) => {
        window.open(file, '_blank');
    }

    return (
        <>
        <Row className={"pb-md-3 pb-2 text-center " + FooterStyles["footer"] + ' ' +  FooterStyles[ (props.background ? props.background : "whiteWave")]}>
            <Col className={FooterStyles["desktopFooter"]}>
                <Text extraSmall className={FooterStyles['footerDelimiter']} label="pols.footer.copyright" />
                <Text extraSmall className={FooterStyles['footerDelimiter']} label="pols.footer.term" />
                <Text onClick={() => openFile(PrivacyFile)} extraSmall className={"text-underline cursor-pointer " + FooterStyles['footerDelimiter']} label="pols.footer.privacy" />
                <Text extraSmall label="pols.footer.prize_count" />
            </Col>
            <Col className={FooterStyles["mobileFooter"]}>
                <Text extraSmall label="pols.footer.copyright" />
                <Text center extraSmall label="pols.footer.term" />
                <Text center onClick={() => openFile(PrivacyFile)} extraSmall className={"text-underline cursor-pointer "} label="pols.footer.privacy" />
                <Text center extraSmall label="pols.footer.prize_count" />
            </Col>
        </Row>
        </>
    );
};
