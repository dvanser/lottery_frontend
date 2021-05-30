import React, {useEffect, useState} from 'react';
import  SmallToy  from '../../assets/smallToy.png'
import  MediumToy  from '../../assets/mediumToy.png'
import  BigToy  from '../../assets/bigToy.png'
import toyReviewStyle from './ToyReview.module.scss'
import { connect } from 'react-redux';
import {Text} from "../Text";
import { Row, Col } from "reactstrap";
import SmallToyImg  from '../../assets/small_toy.png'
import MediumToyImg  from '../../assets/medium_toy.png'
import ToysImg  from '../../assets/toys.png'
import {prizeActions, userActions} from "../../_actions";
import {getFileRequest, getRequest} from "../../_library";


const ToyReview = props => {

    const [toyImage, setToyImage] = useState('');

    useEffect(() => {
        getRequest('/prizes')
            .then(response => {
                setToyImage(response.image)
                console.log(response.image);
            })
            .catch(error => {
        });
    }, [props.i18n.lang]);

    useEffect(() => {
        getRequest('/prizes')
            .then(response => {
                setToyImage(response.image)
                console.log(response.image);
            })
            .catch(error => {
            });
    }, []);

    return (
        <div className="mb-5">
            <Text left h1 label="pols.toy.title" />
            <Text left className="mt-3" label="pols.toy.text" />
            <img className={"w-100" + ' ' + toyReviewStyle["toyImg"]} src={toyImage} />
            <div className="mt-4 mb-5">
                {props.button &&
                    <>
                        {props.button}
                    </>
                }
            </div>
        </div>
    );
}

function mapStateToProps(state) {

    const { prize, i18n } = state;

    return {
        prize,
        i18n
    };
}

function mapDispatchToProps(dispatch) {
    return({
        getPrizes: () => {
            dispatch(prizeActions.getPrizes())
        }
    })
}

const connectedToyReview = connect(mapStateToProps, mapDispatchToProps)(ToyReview);
export {connectedToyReview as ToyReview};
