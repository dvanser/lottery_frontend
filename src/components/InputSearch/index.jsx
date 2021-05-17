import React, { useState } from 'react'
import inputSearchStyle from './InputSearchStyle.module.scss'


export const InputSearch = ({type,className,onChange,placeholder,...classes}) => {

    const inputSearchClass = Object.entries(classes).map(([key]) => 
    inputSearchStyle[key] !== undefined ? inputSearchStyle[key] : '').join(' ') + ' ' + (className ? className : '');

    const [text,setText] = useState('');

    const handleChange = (event) => {
            setText(event.target.value)
            if(onChange !== undefined) {
                onChange(event.target.value)
            }
    };

    const clearButton = () => {
        setText('');
        if(onChange !== undefined) {
            onChange('')
        }
    }

    return (
        <div className={`${inputSearchClass} ${inputSearchStyle['container']}`} >
            <input type="text" placeholder={placeholder ? placeholder : 'Search for anything'}
                className={inputSearchStyle['search']} value={text}
                onChange={handleChange} />
            <button className={inputSearchStyle['button']} onClick={ clearButton } />
        </div>
    );
}
