import React, { ReactElement } from 'react'
import './Post.css';
import { Avatar } from '@material-ui/core';

export interface PostProps {
    imageSrc: string;
    userName: string;
    caption: string;
    timestamp: string;
}

function Post({ imageSrc, userName, caption, timestamp }: PostProps): ReactElement {

    return (
        <div className='post'>
            {/* header -> avatar + username */}
            <h3 className='post__header'>
                <Avatar
                    className='post__avatar'
                    alt='Name'
                    src='' />
                {userName}</h3>
            {/* image */}
            <img className='post__image'
                src={imageSrc}
                alt=''
            ></img>
            {/* username + caption */}
            <div className='post__caption'>
                <strong>{userName} </strong> {caption}
            </div>
            {/* replies */}
        </div>
    )
}

export default Post;