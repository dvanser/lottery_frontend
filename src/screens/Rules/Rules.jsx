import React from 'react';
import { Footer, Text } from '../../components';
import { Col, Container, Row } from 'reactstrap';
import { NavBar } from '../../components/NavBar';
import { ToyReview } from '../../components/ToyReview';
import RulesStyles from './RulesStyle.module.scss'
import styles from "../Profile/RegisterCode.module.scss";
import TermsFile from '../../terms.pdf'


export const Rules = () => {

    const openFile = (file) => {
        window.open(file, '_blank');
    }

    return (
        <>
            <NavBar/>
            <div className={styles.wrapper}>
                <Row>
                    <Col md={{size:6, order: 1}} xs={{size:12, order: 2}}  className="pr-md-5">
                        <ToyReview />
                    </Col>
                    <Col md={{size:6, order: 2}} xs={{size:12, order: 1}} className="mb-5">
                        <Text className="mb-4" left h1 label="pols.rules.title" />
                        <div className="mt-3">
                            <div className={"d-inline-block mr-2 " + RulesStyles["numberCircle"]}>1</div><Text small className="mb-2" label="pols.rules.1" />
                        </div>
                        <div className="mt-3">
                            <div className={"d-inline-block mr-2 " + RulesStyles["numberCircle"]}>2</div><Text small className="mb-2" label="pols.rules.2" />
                        </div>
                        <div className="mt-3">
                            <div className={"d-inline-block mr-2 " + RulesStyles["numberCircle"]}>3</div><Text onClick={() => openFile(TermsFile)} small className="mb-2 cursor-pointer" label="pols.rules.3" />
                        </div>
                    </Col>
                </Row>
            </div>
            <Footer background="whiteWave" />
        </>
    );
};
