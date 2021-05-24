import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { ProfileStep0 } from './ProfileStep0';
import { ProfileStep1 } from './ProfileStep1';
import config from '../../config';
import {ProfileCodes} from "./ProfileCodes";
import {NavBar} from "../../components/NavBar";
import {Col, Container, Row} from "reactstrap";
import {ToyReview} from "../../components/ToyReview";
import {Text} from "../../components/Text";
import profileCodesStyle from "./ProfileCodesStyle.module.scss";
import {Button} from "../../components/Button";
import {getRequest, history, postFileRequest, postRequest} from "../../_library";
import Select from "react-select";
import {useIntl} from "react-intl";


const RequestPrize = props => {
    const intl = useIntl();
    const [smallPrizeAvailableCount, setSmallPrizeAvailableCount] = useState(null);
    const [mediumPrizeAvailableCount, setMediumPrizeAvailableCount] = useState(null);
    const [bigPrizeAvailableCount, setBigPrizeAvailableCount] = useState(null);
    const [prizes, setPrizes] = useState({});
    const [userSticks, setUserSticks] = useState(0);

    const handlePrizeCountChange = (type, count) => {
        let newPrizes = Object.assign({}, prizes);
        newPrizes[type].prizesCount -= count;
        setUserSticks(userSticks - prizes[type].sticksNeeded);
        setPrizes(newPrizes);
    };

    const handleSmallPrizeCountChange = count => {
        handlePrizeCountChange('small', count);
    };

    const handleMediumPrizeCountChange = count => {
        handlePrizeCountChange('medium', count);
    };

    const handleBigPrizeCountChange = count => {
        handlePrizeCountChange('big', count);
    };

    const renderPrizeList = (label, placeholderLabelId, count, onChange) => {
        return (
            <>
                <Text label={label} />
                <Select className={'mt-2 mb-3 ' } classNamePrefix="pols-select" placeholder={intl.formatMessage({id: placeholderLabelId})} isSearchable={false}
                        options={[...[...Array(count)].map((_, idx) => ({value: idx + 1, label: idx + 1}))]}
                        onChange={onChange} />
            </>
        )
    }

    const handleSubmit = () => {
        postRequest('/prizes/request', )
            .then(response => {

            }).catch(response => {

            if (response.error) {
            }
        });
    };

    const calculateAvailablePrizes = prizeType => {
        if (Object.keys(prizes) > 0) {
            const prize = prizes[prizeType];

            return Math.min(Math.floor(userSticks / prize.sticksNeeded), prize.prizesCount);
        } else {
            return 0;
        }
    }

    useEffect(() => {
        console.log(prizes);
        setSmallPrizeAvailableCount(calculateAvailablePrizes("small"));
        setMediumPrizeAvailableCount(calculateAvailablePrizes("medium"));
        setBigPrizeAvailableCount(calculateAvailablePrizes("big"));
        console.log(prizes);
    }, [prizes]);

    useEffect(() => {
        setPrizes(props.prize);
    }, []);

    useEffect(() => {
        setUserSticks(props.user.sticksCount);
    }, []);

    if (Object.keys(prizes).length === 0 || smallPrizeAvailableCount === null) {
        return null;
    }

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col md={6}>
                        <ToyReview />
                    </Col>
                    <Col md={6}>
                        <Text left h1 label="pols.request_prize.title" />
                        <div className={profileCodesStyle['codesCountContainers'] + " mt-2 w-100 text-center"}>
                            <Text huge>{props.user.sticksCount}</Text>
                        </div>
                        <Text center className="mt-2 mb-4" label="pols.request_prize.text" />
                        {Object.keys(prizes).length > 0 &&
                            <>
                                {renderPrizeList('pols.request_prize.title.small_prize', 'pols.request_prize.choose_count', smallPrizeAvailableCount, handleSmallPrizeCountChange)}
                                {renderPrizeList('pols.request_prize.title.medium_prize', 'pols.request_prize.choose_count', mediumPrizeAvailableCount, handleMediumPrizeCountChange)}
                                {renderPrizeList('pols.request_prize.title.big_prize', 'pols.request_prize.choose_count', bigPrizeAvailableCount, handleBigPrizeCountChange)}
                                <Button className="mt-2" onClick={handleSubmit}>
                                    <Text label="pols.profile.btn.request"/>
                                </Button>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

function mapStateToProps(state) {

    const { user, prize } = state;

    return {
        user,
        prize
    };
}

const connectedRequestPrize = connect(mapStateToProps)(RequestPrize);
export {connectedRequestPrize as RequestPrize};