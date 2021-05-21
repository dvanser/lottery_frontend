import React, { useState } from 'react';
import './index.scss';
import { Text } from '../Text';
import { Icon } from '../Icon';
import { Col, Row } from 'reactstrap';
import { useIntl } from 'react-intl';


export const Collapse = props => {

    const [collapsedElementId, setCollapsedElementId] = useState(null);
    const intl = useIntl();

    return <>
        {props.items && props.items.map((item, idx) => (
            <div key={idx} className="tribe-collapse-block mt-8">
                <Row className={"tribe-collapse-heading pb-18 pt-18 pr-38 pl-38 tribe-cursor-pointer no-gutters" + (collapsedElementId === idx ? " active" : "")}
                     onClick={() => setCollapsedElementId(collapsedElementId !== null ? null : idx)}>
                    <Col xs={10}>
                        <Text left label={item.heading} />
                    </Col>
                    <Col xs={2} className="tribe-text-right">
                        <Icon type={collapsedElementId === idx ? "minus" : "plus"} />
                    </Col>
                </Row>
                <Row className={"pt-38 pb-38 mt-8 no-gutters pr-38 pl-38 tribe-collapsed" + (collapsedElementId === idx ? " collapse show" : " collapse")}>
                    <Col>
                        <Text left light >
                            <div dangerouslySetInnerHTML={{__html: intl.formatMessage({ id: item.text})}} />
                        </Text>
                    </Col>
                </Row>
            </div>
        ))}
    </>
};
