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
        <Row noGutters={true} className={"pt-3 pb-3 text-center footer " + FooterStyles[(props.background ? props.background : "white")]}>
            <Col>
                <Text extraSmall className={FooterStyles['footerDelimiter']} label="pols.footer.term" />
                <Text onClick={() => openFile(PrivacyFile)} extraSmall className={"cursor-pointer " + FooterStyles['footerDelimiter']} label="pols.footer.privacy" />
                <Text extraSmall label="pols.footer.prize_count" />
            </Col>
        </Row>
    );
};
