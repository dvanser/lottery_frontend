import React, { useState, useEffect } from 'react';
import radioStyle from './RadioButtonStyle.module.scss';

export const RadioButton = ({ items, checked, onChange }) => {
    const [selected, setSelected] = useState(1);


    const handleSelected = (evt) => {
        setSelected(evt.target.value)
        if (onChange) {
            onChange(evt.target.value)
        }
    }

    const makeName = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    useEffect(() => {
        if (checked !== undefined && checked < items.length) {
            setSelected(checked.toString())
        }
    }, [checked, items])

    return (
        <>
            {items.map((value, idx) => (
                <div key = {idx}>
                    <label className={radioStyle.container}>
                        {value}
                        <input
                            type = "radio"
                            name = {makeName(items.length)}
                            value = {idx}
                            checked = {selected === idx.toString()}
                            onChange = {handleSelected}
                        />
                        <span className={radioStyle.checkmark}/>
                    </label>
                </div>
            ))}
        </>
    )
}