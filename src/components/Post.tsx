import React, { ReactElement } from 'react'
import './Post.css';
import { Avatar } from '@material-ui/core';

interface PostProps {
    imageSrc: string;
    userName: string;
    caption: string;
}

function Post({ imageSrc, userName, caption }: PostProps): ReactElement {


    return (
        <div className='post'>
            {/* header -> avatar + username */}
            <h3 className='post__header'>
                <Avatar
                    className='post__avatar'
                    alt='Name'
                    src='' />
                Username</h3>
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