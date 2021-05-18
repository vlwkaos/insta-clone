import React, { ChangeEventHandler, ReactElement } from 'react'
import './StyledInput.css'

interface Props {
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    type?: string;
}

function StyledInput({ placeholder, value, type = 'text', onChange }: Props): ReactElement {
    return (
        <input className='styledInput' placeholder={placeholder} type={type} value={value} onChange={onChange}></input>
    )
}

export default StyledInput
