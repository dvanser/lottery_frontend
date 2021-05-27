import React, { useState } from 'react';
import { Text } from '../Text';
import { Icon } from '../Icons';
import { Col, Row } from 'reactstrap';
import { useIntl } from 'react-intl';
import collapseStyles from './CollapseStyle.module.scss';


export const Collapse = props => {

    const [collapsedElementId, setCollapsedElementId] = useState(null);
    const intl = useIntl();

    return <>
        {props.items && props.items.map((item, idx) => (
            <div key={idx}>
                <Row className={collapseStyles['polsCollapseHeading'] + " no-gutters" + (collapsedElementId === idx ? " active" : "")}
                     onClick={() => setCollapsedElementId(collapsedElementId !== null ? null : idx)}>
                    <Col xs={10}>
                        <Text small blue left label={item.heading} />
                    </Col>
                    <Col xs={2} className="text-right">
                        <Icon type={collapsedElementId === idx ? "minus" : "plus"} />
                    </Col>
                </Row>
                <Row className={collapseStyles['polsCollapsed'] + " no-gutters" + (collapsedElementId === idx ? " collapse show" : " collapse")}>
                    <Col>
                        <Text small left light >
                            <div dangerouslySetInnerHTML={{__html: intl.formatMessage({ id: item.text})}} />
                        </Text>
                    </Col>
                </Row>
            </div>
        ))}
    </>
};
