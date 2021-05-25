import React from 'react';
import { ReactComponent as Minus } from '../../assets/icons/minus.svg';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';


export const Icon = ({ type, className }) => {
    switch (type) {
        case 'minus':
            return <Minus className={className}/>
        case 'plus':
            return <Plus className={className}/>
        default:
            return '';
    }
};