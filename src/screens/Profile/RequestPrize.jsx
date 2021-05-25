import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavBar } from '../../components/NavBar';
import { Col, Container, Row  } from 'reactstrap';
import { ToyReview } from '../../components/ToyReview';
import { Text } from '../../components/Text';
import profileCodesStyle from './ProfileCodesStyle.module.scss';
import { Button } from '../../components/Button';
import { getRequest, history, postRequest } from '../../_library';
import Select from 'react-select';
import { useIntl } from 'react-intl';
import { Footer } from '../../components/Footer';
import { Input } from '../../components/Input';


const RequestPrize = props => {
    const intl = useIntl();
    const [smallPrizeAvailableCount, setSmallPrizeAvailableCount] = useState(0);
    const [mediumPrizeAvailableCount, setMediumPrizeAvailableCount] = useState(0);
    const [bigPrizeAvailableCount, setBigPrizeAvailableCount] = useState(0);
    const [prizes, setPrizes] = useState({});
    const [userSticks, setUserSticks] = useState(0);
    const [selectedPrizes, setSelectedPrizes] = useState([]);
    const [showParcelsShops, setShowParcelsShops] = useState(false);
    const [parcelsShops, setParcelShops] = useState([]);
    const [selectedParcelsShop, setSelectedParcelShop] = useState({});
    const [showContacts, setShowContacts] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handlePrizeCountChange = (type, count) => {
        let newPrizes = Object.assign({}, prizes);
        let newUserSticks = userSticks;

        if (selectedPrizes.findIndex(p => p.type === type) > -1) {
            newPrizes[type] = props.prize[type];
            newUserSticks += prizes[type].sticksNeeded * selectedPrizes.find(p => p.type === type).count;
            selectedPrizes[selectedPrizes.findIndex(p => p.type === type)].count = count;
        } else {
            selectedPrizes.push({'type': type, 'count': count});
        }

        newPrizes[type].prizesCount -= count;
        setUserSticks(newUserSticks - prizes[type].sticksNeeded * count);
        setPrizes(newPrizes);
    };

    const handleSmallPrizeCountChange = count => {
        handlePrizeCountChange('small', count.value);
    };

    const handleMediumPrizeCountChange = count => {
        handlePrizeCountChange('medium', count.value);
    };

    const handleBigPrizeCountChange = count => {
        handlePrizeCountChange('big', count.value);
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
    };

    const handleSubmit = () => {

        const data = {
            "name": props.user.name,
            "surname": props.user.surname,
            "city": selectedParcelsShop.city,
            "pcode": selectedParcelsShop.pcode,
            "street": selectedParcelsShop.street,
            "phone": props.user.phone,
            "prizes": selectedPrizes,
            "parcelshopId": selectedParcelsShop.parcelshop_id
        }

        postRequest('/prizes/request', data)
            .then(response => {
                setShowSuccessMessage(true);
                setShowParcelsShops(false);
                setShowContacts(false);
            }).catch(response => {

            if (response.error) {
            }
        });
    };

    const calculateAvailablePrizes = prizeType => {
        if (Object.keys(prizes).length > 0) {
            const prize = prizes[prizeType];

            return Math.min(Math.floor(userSticks / prize.sticksNeeded), prize.prizesCount);
        } else {
            return 0;
        }
    }

    const handleShowDpdBlock = () => {
        getRequest('/prizes/parcelshops')
            .then(response => {
                setParcelShops(response);
                setShowParcelsShops(true);
            }).catch(response => {
            if (response.error) {
            }
        });
    }

    useEffect(() => {
        setSmallPrizeAvailableCount(calculateAvailablePrizes("small"));
        setMediumPrizeAvailableCount(calculateAvailablePrizes("medium"));
        setBigPrizeAvailableCount(calculateAvailablePrizes("big"));
    }, [prizes, userSticks]);

    useEffect(() => {
        setPrizes(props.prize);
    }, []);

    useEffect(() => {
        setUserSticks(props.user.sticksCount);
    }, []);

    return (
        <>
            <NavBar />

                <Container>
                    <Row>
                        <Col md={6}>
                            <ToyReview/>
                        </Col>
                        <Col md={6}>
                            <Text left h1 label="pols.request_prize.title"/>
                            {!showParcelsShops && !showContacts && !showSuccessMessage &&
                                <>
                                    <div className={profileCodesStyle['codesCountContainers'] + " mt-2 w-100 text-center"}>
                                        <Text huge>{userSticks}</Text>
                                    </div>
                                    <Text center className="mt-2 mb-4" label="pols.request_prize.text"/>
                                    {Object.keys(prizes).length > 0 &&
                                    <>
                                        {renderPrizeList('pols.request_prize.title.small_prize', 'pols.request_prize.choose_count', smallPrizeAvailableCount, handleSmallPrizeCountChange)}
                                        {renderPrizeList('pols.request_prize.title.medium_prize', 'pols.request_prize.choose_count', mediumPrizeAvailableCount, handleMediumPrizeCountChange)}
                                        {renderPrizeList('pols.request_prize.title.big_prize', 'pols.request_prize.choose_count', bigPrizeAvailableCount, handleBigPrizeCountChange)}
                                        <Button blue className="mt-2" onClick={handleShowDpdBlock}>
                                            <Text label="pols.profile.btn.request"/>
                                        </Button>
                                    </>
                                    }
                                </>
                            }
                            {showParcelsShops && !showContacts &&
                                <>
                                    <Text center className="mt-2 mb-4" label="pols.request_prize.parcels_select"/>
                                    <Select
                                        placeholder={intl.formatMessage({id: 'pols.request_prize.select_pcode'})}
                                        classNamePrefix="pols-select"
                                        isSearchable={true}
                                        name="company"
                                        onChange={(val) => {setSelectedParcelShop(parcelsShops.find(p => p.parcelshop_id === val.value))}}
                                        options={parcelsShops.map((shop, idx) => ({value: shop.parcelshop_id, label:shop.company + ' LV' + shop.pcode}))}
                                    />
                                    <Button blue className="mt-2" onClick={() => {setShowContacts(true); setShowParcelsShops(false)}}>
                                        <Text label="pols.profile.btn.request"/>
                                    </Button>
                                </>
                            }
                            {showContacts && !showParcelsShops &&
                                <>
                                    <Input disabled={true} label="pols.profile.request_prize.name" placeholder={props.user.name + ' ' + props.user.surname} />
                                    <Input className="mt-2" disabled={true} label="pols.profile.request_prize.phone" placeholder={props.user.phone} />
                                    <Input className="mt-2" disabled={true} label="pols.profile.request_prize.parcels" placeholder={selectedParcelsShop.street + ' ' + selectedParcelsShop.city} />
                                    <Button blue className="mt-3" onClick={handleSubmit}>
                                        <Text label="pols.profile.btn.approve"/>
                                    </Button>
                                </>
                            }
                            {showSuccessMessage &&
                                <>
                                    <Text h1 center className="mt-5 mb-5" label="pols.request_prize.success"/>
                                    <Button white onClick={() => history.push('/')}>
                                        <Text label="pols.profile.btn.main"/>
                                    </Button>
                                </>
                            }
                        </Col>
                    </Row>
                </Container>
            <Footer />
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