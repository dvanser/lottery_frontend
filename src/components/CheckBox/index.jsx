import React, { useState } from 'react';
import checkBoxStyle from './CheckBoxStyle.module.scss';


export const CheckBox = (props) => {

    const [check, setCheck] = useState(props.checked)

    const handleChange = () => {
        setCheck(!check)
        if (props.onChange) {
            props.onChange(!check);
        }
    }

    return (
        <label className={checkBoxStyle.container}>
            <input type="checkbox" checked={check} onChange={handleChange}/>
            <span className={checkBoxStyle.checkmark} />
        </label>
    )

}