import React from 'react';
import textModuleStyle from './Text.module.scss';
import { useIntl } from 'react-intl';

export const Text = ({children, className, type, label, onClick, ...classes}) => {

    const textClass = Object.entries(classes).map(([key]) =>
    textModuleStyle[key] !== undefined ? textModuleStyle[key] : '').join(' ') + ' ' + (className ? className : '');

    const ComponentType = (['justify', 'right', 'left', 'center'].some(substring => textClass.includes(substring))) ? 'div' : 'span';
    const intl = useIntl();

    if (label) {
        let newLabel = intl.formatMessage({id: label});
        newLabel = newLabel.replace("!", "<span class=\"exclamation-mark\">!</span>")
        newLabel = newLabel.replace("?", "<span class=\"exclamation-mark\">?</span>")

        return <ComponentType dangerouslySetInnerHTML={{__html: newLabel}} {...(onClick ? {onClick: onClick} : undefined)} className={textClass}/>
    }

    return (
        <ComponentType className = {textClass}>
            {children}
        </ComponentType>
    );
}
