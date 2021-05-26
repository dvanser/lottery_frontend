import React from 'react';
import { Text } from '../../components/Text';
import { Collapse } from '../../components/Collapse';
import { ToyReview } from '../../components/ToyReview';
import {Col, Container, Row} from 'reactstrap';
import {NavBar} from "../../components/NavBar";
import styles from "./FAQStyle.module.scss";


export const FAQ = props => {

    const faqItems = [
        {heading: 'pols.faq.heading.how_long', text: 'pols.faq.text.how_long'},
        {heading: 'pols.faq.heading.who_participate', text: 'pols.faq.text.who_participate'},
        {heading: 'pols.faq.heading.when_participate', text: 'pols.faq.text.when_participate'},
        {heading: 'pols.faq.heading.where_code', text: 'pols.faq.text.where_code'},
        {heading: 'pols.faq.heading.what_products', text: 'pols.faq.text.what_products'},
        {heading: 'pols.faq.heading.how_much_prizes', text: 'pols.faq.text.how_much_prizes'},
        {heading: 'pols.faq.heading.how_receive', text: 'pols.faq.text.how_receive'},
        {heading: 'pols.faq.heading.prize_abroad', text: 'pols.faq.text.prize_abroad'},
        {heading: 'pols.faq.heading.how_to_know', text: 'pols.faq.text.how_to_know'},
        {heading: 'pols.faq.heading.how_long_can_receive', text: 'pols.faq.text.how_long_can_receive'},
        {heading: 'pols.faq.heading.do_need_pay', text: 'pols.faq.text.do_need_pay'},
        {heading: 'pols.faq.heading.when_receive', text: 'pols.faq.text.when_receive'},
        {heading: 'pols.faq.heading.how_much_sticks', text: 'pols.faq.text.how_much_sticks'},
        {heading: 'pols.faq.heading.can_register_after', text: 'pols.faq.text.can_register_after'},
        {heading: 'pols.faq.heading.one_person_can_receive', text: 'pols.faq.text.one_person_can_receive'},
        {heading: 'pols.faq.heading.cant_enter', text: 'pols.faq.text.cant_enter'},
        {heading: 'pols.faq.heading.cant_take_prize', text: 'pols.faq.text.cant_take_prize'},
        {heading: 'pols.faq.heading.cant_find_stick', text: 'pols.faq.text.cant_find_stick'},
        {heading: 'pols.faq.heading.accept_terms', text: 'pols.faq.text.accept_terms'},
        {heading: 'pols.faq.heading.how_to_understand', text: 'pols.faq.text.how_to_understand'},
        {heading: 'pols.faq.heading.how_to_understand_is_accepted', text: 'pols.faq.text.how_to_understand_is_accepted'},
        {heading: 'pols.faq.heading.know_terms', text: 'pols.faq.text.know_terms'},
        {heading: 'pols.faq.heading.cant_create_profile', text: 'pols.faq.text.cant_create_profile'}
    ];

    return (
        <>
            <NavBar/>
            <div className={styles.wrapper}>
                <Row>
                    <Col md={{size:6, order: 1}} xs={{size:12, order: 2}}  className="pr-md-5">
                        <ToyReview />
                    </Col>
                    <Col md={{size:6, order: 2}} xs={{size:12, order: 1}} className="mb-5">
                        <Text h1 left label="pols.faq.title" />
                        <Collapse items={faqItems} />
                    </Col>
                </Row>
            </div>
        </>
    );
}