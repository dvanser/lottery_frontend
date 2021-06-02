import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavBar } from '../../components/NavBar';
import { Col, Container, Row  } from 'reactstrap';
import { ToyReview } from '../../components/ToyReview';
import { Text } from '../../components/Text';
import profileCodesStyle from './ProfileCodesStyle.module.scss';
import { Button } from '../../components/Button';
import { getRequest, history, postRequest } from '../../_library';
import Select, { components } from 'react-select';
import { useIntl } from 'react-intl';
import { Footer } from '../../components/Footer';
import { Input } from '../../components/Input';
import styles from "./RegisterCode.module.scss";


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
    const [errorNotSelectedPrizes, setErrorNotSelectedPrizes] = useState(false);
    const [errorNotSelectedParcel, setErrorNotSelectedParcel] = useState(false);
    const [errorNotSelectedDeliveryType, setErrorNotSelectedDeliveryType] = useState(false);
    const deliveryTypes = [{type: 'DPD', label: 'pols.request_prize.choose_delivery_type_dpd'}, {type:'pick_up', label: 'pols.request_prize.choose_delivery_type_pick_up'}];
    const [selectedDeliveryType, setSelectedDeliveryType] = useState('');
    const [loading, setLoading] = useState(false);

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
        setErrorNotSelectedPrizes(false);
        handlePrizeCountChange('small', count.value);
    };

    const handleMediumPrizeCountChange = count => {
        setErrorNotSelectedPrizes(false);
        handlePrizeCountChange('medium', count.value);
    };

    const handleBigPrizeCountChange = count => {
        setErrorNotSelectedPrizes(false);
        handlePrizeCountChange('big', count.value);
    };

    const handleDeliveryTypeChange = type => {
        setErrorNotSelectedDeliveryType(false);
        setSelectedDeliveryType(type.value);
    };

    const renderPrizeList = (label, placeholderLabelId, count, onChange) => {
        return (
            <>
                <Text label={label} />
                <Select className={'mt-2 mb-3 ' } classNamePrefix="pols-select" placeholder={intl.formatMessage({id: placeholderLabelId})} isSearchable={false}
                        options={[...[...Array(count)].map((_, idx) => ({value: idx + 1, label: idx + 1}))]}
                        onChange={onChange}  components={{ NoOptionsMessage }} />
            </>
        )
    };

    const renderDeliveryType = (label, placeholderLabelId, onChange) => {
        return (
            <>
                <Text label={label} />
                <Select
                    className={'mt-2 mb-3 ' }
                    placeholder={intl.formatMessage({id: placeholderLabelId})}
                    classNamePrefix="pols-select"
                    isSearchable={false}
                    name="deliveryType"
                    onChange={onChange}
                    options={deliveryTypes.map((delivery, idx) => ({value: delivery.type, label: intl.formatMessage({id: delivery.label})}))}
                />
            </>
        )
    };

    const handleSubmit = () => {
        setLoading(true);
        const data = {
            "name": props.user.name,
            "surname": props.user.surname,
            "city": selectedParcelsShop.city,
            "pcode": selectedParcelsShop.pcode,
            "street": selectedParcelsShop.street,
            "phone": props.user.phone,
            "prizes": selectedPrizes,
            "parcelshopId": selectedParcelsShop.parcelshop_id,
            "shippingType": "DPD"
        };

        postRequest('/prizes/request', data)
            .then(response => {
                setShowSuccessMessage(true);
                setShowParcelsShops(false);
                setShowContacts(false);
                setLoading(false);
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
    };

    const NoOptionsMessage = props => {
        return (
            <components.NoOptionsMessage {...props}>
               <Text label="pols.profile.empty" />
            </components.NoOptionsMessage>
        );
    };


    const handleShowDpdBlock = () => {
        if (selectedPrizes.length === 0) {
            setErrorNotSelectedPrizes(true);
            return;
        }

        if (selectedDeliveryType === '') {
            setErrorNotSelectedDeliveryType(true);
            return;
        }

        if (selectedDeliveryType === 'pick_up') {
            setLoading(true);
            const data = {
                "name": props.user.name,
                "surname": props.user.surname,
                "phone": props.user.phone,
                "prizes": selectedPrizes,
                "shippingType": "PICK_UP"
            };

            postRequest('/prizes/request', data)
                .then(response => {
                    setShowSuccessMessage(true);
                    setShowParcelsShops(false);
                    setShowContacts(false);
                    setLoading(false);
                }).catch(response => {

                if (response.error) {
                }
            });
        } else {
            getRequest('/prizes/parcelshops')
                .then(response => {
                    setParcelShops(response);
                    setShowParcelsShops(true);
                }).catch(response => {
                if (response.error) {
                }
            });
        }
    };

    useEffect(() => {
        setSmallPrizeAvailableCount(calculateAvailablePrizes("small"));
        setMediumPrizeAvailableCount(calculateAvailablePrizes("medium"));
        setBigPrizeAvailableCount(calculateAvailablePrizes("big"));
    }, [prizes, userSticks]);

    useEffect(() => {
        getRequest('/prizesCount')
            .then(response => {
                setPrizes(response);
            }).catch(response => {
            if (response.error) {
            }
        });

    }, []);

    useEffect(() => {
        setUserSticks(props.user.sticksCount);
    }, []);

    return (
        <>
            <NavBar/>
            <div className={styles.wrapper}>
                <Row>
                    <Col md={{size:6, order: 1}} xs={{size:12, order: 2}}  className="pr-md-5">
                        <ToyReview />
                    </Col>
                    <Col md={{size:6, order: 2}} xs={{size:12, order: 1}} className="mb-5">
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
                                    {renderDeliveryType('pols.request_prize.delivery_type', 'pols.request_prize.choose_delivery_type', handleDeliveryTypeChange)}
                                    {errorNotSelectedPrizes &&
                                        <Text error label="pols.request_prize.not_selected_prize" />
                                    }
                                    {errorNotSelectedDeliveryType &&
                                        <Text error label="pols.request_prize.not_selected_delivery_type" />
                                    }
                                    <Button blue className="mt-2" onClick={handleShowDpdBlock}>
                                        <Text label="pols.profile.btn.request"/>
                                    </Button>
                                </>
                                }
                            </>
                        }
                        {showParcelsShops && !showContacts &&
                            <>
                                <Text left className="mt-2 mb-2" label="pols.request_prize.parcels_select"/>
                                <Select
                                    placeholder={intl.formatMessage({id: 'pols.request_prize.select_pcode'})}
                                    classNamePrefix="pols-select"
                                    isSearchable={true}
                                    name="company"
                                    onChange={(val) => {setSelectedParcelShop(parcelsShops.find(p => p.parcelshop_id === val.value)); setErrorNotSelectedParcel(false);}}
                                    options={parcelsShops.map((shop, idx) => ({value: shop.parcelshop_id, label:shop.company + ' LV' + shop.pcode}))}
                                />
                                {errorNotSelectedParcel &&
                                    <Text error label="pols.request_prize.not_selected_parcel" />
                                }
                                <Button blue className="mt-2" onClick={() => {
                                    if (Object.keys(selectedParcelsShop).length === 0) {
                                        setErrorNotSelectedParcel(true);
                                        return;
                                    }
                                    setShowContacts(true);
                                    setShowParcelsShops(false);
                                }}>
                                    <Text label="pols.profile.btn.request"/>
                                </Button>
                            </>
                        }
                        {showContacts && !showParcelsShops && !loading &&
                            <>
                                <Input disabled={true} label="pols.profile.request_prize.name" placeholder={props.user.name + ' ' + props.user.surname} />
                                <Input className="mt-2" disabled={true} label="pols.profile.request_prize.phone" placeholder={props.user.phone} />
                                <Input className="mt-2" disabled={true} label="pols.profile.request_prize.parcels" placeholder={selectedParcelsShop.street + ' ' + selectedParcelsShop.city} />
                                <Button blue className="mt-3" disabled={loading} onClick={handleSubmit}>
                                    <Text label="pols.profile.btn.approve"/>
                                </Button>
                            </>
                        }
                        {loading &&
                            <Text className="mt-5" center label="pols.loading"/>
                        }
                        {showSuccessMessage && !loading &&
                            <>
                                <Text left className="mt-5 mb-5" label="pols.request_prize.success"/>
                                <Button white onClick={() => history.push('/')}>
                                    <Text label="pols.profile.btn.main"/>
                                </Button>
                            </>
                        }
                    </Col>
                </Row>
            </div>
            <Footer background="whiteWave" />
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