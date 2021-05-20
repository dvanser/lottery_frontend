import React, { useEffect, useState } from 'react';
import  SmallToy  from '../../assets/smallToy.svg'
import  MediumToy  from '../../assets/mediumToy.svg'
import  BigToy  from '../../assets/bigToy.svg'
import { FormattedMessage } from 'react-intl';
import { getRequest } from '../../_library/request';

export const ToyReview = () => {

    const [synchronized,setSynchronized] = useState(false);
    const [data,setData] = useState([]);
    const [error,setError] = useState('error_something_went_wrong');

    const loadData = () => {
        getRequest('/counter').then(response => { 
            console.log(response)
           setData(response); setSynchronized(true)}).catch(error => {  
            setSynchronized(true);
            if(error.error){ 
                setError(error.error)
            }})
        }

        useEffect(loadData, []);

    return (
        !synchronized ? <div> Loading. Please wait</div> : data === undefined ? <div>{error}</div> :
        <div class='grid grid-cols-2 gap-4 grid-rows-2 w-max relative'>
                {/*Toys Descriptions */}
                <div class='absolute bg-1AA0E1 text-white left-6 -top-4'><div class='PolsBold'><FormattedMessage id='pols.small.kocini' /></div><div class='Polsbody' ><FormattedMessage id='pols.small.description' /></div></div>
                <div class='absolute bg-1AA0E1 text-white right-12 -top-4'><div class='PolsBold'><FormattedMessage id='pols.medium.kocini' /></div><div class='Polsbody' ><FormattedMessage id='pols.medium.description' /></div></div>
                <div class='absolute bg-1AA0E1 text-white -left-8 bottom-36'><div class='PolsBold'><FormattedMessage id='pols.big.kocini' /></div><div class='Polsbody' ><FormattedMessage id='pols.big.description' /></div></div>

                {/* Toys Counter info */}
                <div class='absolute bg-white text-black right-0 bottom-0 z-40'><div class='font-sans ToyCounterLeft p-1.5'><FormattedMessage id='pols.toy.left' /><div class='font-sans-Roboto ToyCounter' >{data.smallToysCount}</div></div></div>
                <div class='absolute bg-white text-black right-0 bottom-53 z-40'><div class='font-sans ToyCounterLeft p-1.5'><FormattedMessage id='pols.toy.left' /><div class='font-sans-Roboto ToyCounter' >{data.mediumToysCount}</div></div></div>
                <div class='absolute bg-white text-black left-33 bottom-53 z-40'><div class='font-sans ToyCounterLeft p-1.5'><FormattedMessage id='pols.toy.left' /><div class='font-sans-Roboto ToyCounter' >{data.bigToysCount}</div></div></div>

                {/*Toys images and borders */}
                <div class='col-start-1 border-4 border-white'><img class='hidden' src={SmallToy} alt='small toy' /></div><img class='absolute origin-center bottom-38 -left-16 transform rotate-225' src={SmallToy} alt='small toy' />
                <div class='col-start-2 border-4 border-white'><img class='hidden' src={MediumToy} alt='medium toy' /></div><img class='absolute left-52' src={MediumToy} alt='small toy' />
                <div class='col-start-1 col-span-2 border-4 border-white'><img class='invisible' src={BigToy} alt='big toy' /></div><img class='absolute -bottom-12 -left-8' src={BigToy} alt='big toy' />
        </div>
    );
}