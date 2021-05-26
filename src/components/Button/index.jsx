import React from 'react';
import buttonStyles from './ButtonStyle.module.scss';


export const Button = ({children, onClick, className, disabled, ...classes}) => {

    const buttonClass = Object.entries(classes).map(([key, value]) =>
        buttonStyles[key] !== undefined ? buttonStyles[key] : '').join(' ') + ' ' + (className ? className : '')

    return (
        <button className={buttonClass} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );

}