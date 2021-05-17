import { Avatar } from '@material-ui/core';
import React, { ReactElement } from 'react'
import './Comment.css';

export interface ICommentProps {
    userName: string;
    text: string;
    timestamp: any;
}

function Comment({ userName, text, timestamp }: ICommentProps): ReactElement {
    return (
        <div className='comment'>
            <Avatar className='comment__avatar' alt={userName} src='' />
            <div className='comment__text'><strong>{userName} </strong>  {text}</div>
        </div>
    )
}

export default Comment
